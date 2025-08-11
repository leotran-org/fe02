import { Link } from "react-router-dom";

export default function DescriptionCard({ src }) {
  return (
    <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5">
      <h3 className="text-base font-semibold text-amber-200">Mô tả</h3>
      <p className="text-sm text-amber-100/80 mt-1">
        Bảng màu đồng bộ với Gallery: nền tối, viền mờ, điểm nhấn amber cho CTA & trạng thái.
      </p>

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

      <Link
        to="/gallery"
        className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
      >
        Về Gallery
      </Link>
    </div>
  );
}

