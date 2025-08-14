// DescriptionCard.jsx
export default function DescriptionCard({ src, description, tags = [] }) {
  // Loại bỏ phần tử rỗng và trùng (không phân biệt hoa/thường)
  const uniqueTags = Array.from(
    new Map(
      tags
        .map((t) => String(t).trim())
        .filter(Boolean)
        .map((t) => [t.toLowerCase(), t]) // key để so sánh, value để hiển thị
    ).values()
  );

  return (
    <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5">
      <h3 className="text-base font-semibold text-amber-200">Mô tả</h3>
      <p className="text-sm text-amber-100/80 mt-1">
        {description || "Không có mô tả cho media này."}
      </p>

      {/* Tags */}
      {uniqueTags.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-amber-200/90">Thẻ</h4>
          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Thẻ của media">
            {uniqueTags.map((tag) => (
              <li
                key={tag}
                className="px-3 py-1 rounded-xl border border-amber-400/40 bg-amber-400/10 text-amber-100 text-xs max-w-[16rem] truncate"
                title={`#${tag}`}
              >
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {src && (
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-amber-400/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
        >
          Mở nguồn media
        </a>
      )}
    </div>
  );
}

