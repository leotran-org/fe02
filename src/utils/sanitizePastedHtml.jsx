// utils/sanitizePastedHtml.js
export function sanitizePastedHtml(dirty) {
  const allowed = new Set([
    "p","h1","h2","h3","h4","h5","h6","ul","ol","li",
    "strong","em","b","i","u","blockquote","figure","figcaption",
    "img","code","pre","span","a","br",
  ]);
  const doc = new DOMParser().parseFromString(dirty, "text/html");
  [...doc.querySelectorAll("*")].forEach((el) => {
    const tag = el.tagName.toLowerCase();
    if (!allowed.has(tag)) {
      el.replaceWith(...el.childNodes);
      return;
    }
    [...el.attributes].forEach((a) => {
      const name = a.name.toLowerCase();
      const keep =
        name === "class" ||
        (tag === "a" && name === "href") ||
        (tag === "img" && (name === "src" || name === "alt"));
      if (!keep || name.startsWith("on") || name === "style") {
        el.removeAttribute(a.name);
      }
    });
  });
  return doc.body.innerHTML;
}
