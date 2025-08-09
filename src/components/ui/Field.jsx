// components/ui/Field.jsx
export default function Field({ label, children, required, hint }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center gap-2 text-sm text-white/70">
        <span>{label}</span>
        {required && <span className="text-amber-300">*</span>}
        {hint && <span className="text-xs text-white/50">{hint}</span>}
      </div>
      {children}
    </label>
  );
}
