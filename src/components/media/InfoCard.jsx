import { Calendar, Clock } from "lucide-react";

export default function InfoCard({ Icon, type, date, duration }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h2 className="text-lg font-semibold mb-3">Thông tin</h2>
      <ul className="space-y-2 text-white/80 text-sm">
        <li className="flex items-center justify-between border-b border-white/10 pb-2">
          <span>Loại</span>
          <span className="inline-flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {type}
          </span>
        </li>
        <li className="flex items-center justify-between border-b border-white/10 py-2">
          <span>Ngày</span>
          <span className="inline-flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {date}
          </span>
        </li>
        {duration && (
          <li className="flex items-center justify-between pt-2">
            <span>Độ dài</span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {duration}
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

