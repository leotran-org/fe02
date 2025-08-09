// components/post/HtmlContent.jsx
export const HtmlContent = ({ htmlArray }) => (
  <>
    {htmlArray.map((html, i) => (
      <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
    ))}
  </>
);
