function formatHtml(source = "") {
  const voidTags = new Set([
    "area","base","br","col","embed","hr","img","input","link","meta",
    "param","source","track","wbr",
  ]);

  const indentStr = (n) => "  ".repeat(Math.max(0, n)); // 2 spaces

  // Normalize newlines and trim edges
  const normalized = source.replace(/\r\n?/g, "\n").trim();

  // Tokenize: keep tags as separate tokens, text as-is
  const tokens = normalized
    .split(/(<[^>]+>)/g)
    .map((t) => t)
    .filter((t) => t && t.length > 0);

  let indent = 0;
  const out = [];

  for (let tok of tokens) {
    const isTag = tok.startsWith("<") && tok.endsWith(">");

    if (isTag) {
      const isClosing = /^<\/[^>]+>$/.test(tok);
      const isSelfClosing = /\/>$/.test(tok);

      // Extract tag name if present
      const openMatch = tok.match(/^<\s*([a-zA-Z0-9-:]+)/);
      const tagName = openMatch ? openMatch[1].toLowerCase() : null;
      const isVoid = tagName ? voidTags.has(tagName) : false;

      if (isClosing) {
        // Outdent before printing closing tag
        indent = Math.max(0, indent - 1);
        out.push(indentStr(indent) + tok);
      } else {
        // Opening or self-closing/void
        out.push(indentStr(indent) + tok);

        // Increase indent only for non-void, non-self-closing pure opening tags
        const pureOpen = !isSelfClosing && !isVoid && !/^\s*<[^/!][^>]*>$/i.test(tok) ? false : true;
        // pureOpen is true for standard openings like <div ...>, but the regex above is permissive;
        // we still only indent when not self-closing & not void.
        if (!isSelfClosing && !isVoid) {
          // If it contains its own close on same token (rare in this tokenizer), don't indent.
          if (!tok.includes("</")) {
            indent += 1;
          }
        }
      }
    } else {
      // Text node: collapse whitespace but preserve non-empty lines
      const text = tok.replace(/\s+/g, " ").trim();
      if (text) {
        out.push(indentStr(indent) + text);
      }
    }
  }

  // Ensure a trailing newline so Prism/<pre> renders the last line cleanly
  return out.join("\n") + "\n";
}

export default formatHtml;
