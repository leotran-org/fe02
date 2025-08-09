// components/ui/Textarea.jsx
export default function Textarea({ className = "", rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      {...props}
      className={`w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${className}`}
    />
  );
}
