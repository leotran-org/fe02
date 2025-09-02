import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants/backend";
import formatHtml from "../utils/formatHtml";



function binarySearch(blocks, blockId) {
    let left = 0;
    let right = blocks.length - 1;

    let position = -1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (blocks[mid].block_id === blockId) {
            position = mid;
            break;
        } else if (blocks[mid].block_id < blockId) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if (position === -1) {
        throw new Error(`Block with ID ${blockId} not found`);
    }
    return position;
}

export function usePost(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${BACKEND_URL}/post/get/${slug}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch post: ${res.status}`);
        }
        const json = await res.json();

        if (!json || !json.post_id) {
            throw new Error("Post not found or invalid response format");
        }
        
        // if no first_block_id, throw an error
        if (!json.first_block_id) {
            throw new Error("Post data is incomplete: missing first_block_id");
        }

        // sort block by block_id
        json.blocks.sort((a, b) => a.block_id - b.block_id);
    
        let currentBlockId = json.first_block_id;
        let tmp = [];

        while (currentBlockId !== null) {
          const position = binarySearch(json.blocks, currentBlockId);
          tmp.push(json.blocks[position]);
          currentBlockId = json.blocks[position].next_block_id;
        }
        // html format the content of each block
        for (let block of tmp) {
            block.content = formatHtml(block.content);
                }

        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { data, loading, error };
}

