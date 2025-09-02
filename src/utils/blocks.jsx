// --- keep your existing exports ---
export const newBlock = (template) => ({
  block_id: crypto.randomUUID(),
  type: template.key,
  content: template.html,
});

export const composeHtmlFromBlocks = (blocks) =>
  (Array.isArray(blocks) ? blocks : []).map((b) => b.content || "").join("\n\n");

// --- NEW: parse raw HTML into editor blocks ---
const _id = () => (crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));

/**
 * Convert a raw HTML string into simple blocks: { block_id, type, content }
 * - Preserves markup by storing each block's outerHTML in `content`
 * - Splits on common block-level tags; unwraps container elements (div/section/article/main)
 * - Unrecognized elements fall back to a single "html" block so nothing is lost
 */
export function blocksFromHtml(rawHtml = "") {
  const html = (rawHtml ?? "").trim();
  if (!html) return [];

  // Browser-friendly parse; on server, just return a single block
  if (typeof window === "undefined" || !("DOMParser" in window)) {
    return [{ block_id: _id(), type: "html", content: html }];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<body>${html}</body>`, "text/html");

  const OUTER_BLOCK_TAGS = new Set([
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "blockquote", "ul", "ol",
    "pre", "figure", "table",
    "img", "hr", "iframe",
  ]);

  const CONTAINER_TAGS = new Set(["div", "section", "article", "main"]);

  const blocks = [];

  const pushBlock = (type, contentHtml) => {
    // type is purely informational in your current setup; composeHtmlFromBlocks uses only `content`
    blocks.push({ block_id: _id(), type, content: contentHtml });
  };

  const isWhitespaceText = (n) => n.nodeType === Node.TEXT_NODE && !n.textContent.trim();

  const visit = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text) pushBlock("p", `<p>${text}</p>`);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const tag = node.tagName.toLowerCase();

    // Split on known block-level tags
    if (OUTER_BLOCK_TAGS.has(tag)) {
      // paragraph that only wraps an image → keep as the image block’s outerHTML
      if (tag === "p") {
        const imgs = node.querySelectorAll(":scope > img");
        const onlyImg =
          imgs.length === 1 &&
          Array.from(node.childNodes).every((cn) => cn === imgs[0] || isWhitespaceText(cn));
        if (onlyImg) {
          pushBlock("img", imgs[0].outerHTML);
          return;
        }
      }
      pushBlock(tag, node.outerHTML);
      return;
    }

    // Unwrap common containers by visiting children
    if (CONTAINER_TAGS.has(tag)) {
      Array.from(node.childNodes).forEach(visit);
      return;
    }

    // Default: keep the element intact as one block
    pushBlock(tag || "html", node.outerHTML || "");
  };

  Array.from(doc.body.childNodes).forEach((n) => {
    if (isWhitespaceText(n)) return;
    visit(n);
  });

  // If everything was a container and nothing pushed, keep the original html as one block
  if (blocks.length === 0) {
    return [{ block_id: _id(), type: "html", content: html }];
  }

  return blocks;
}

