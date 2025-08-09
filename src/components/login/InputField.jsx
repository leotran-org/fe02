import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";

export const InputField = ({ 
  id, 
  name, 
  type, 
  value, 
  onChange, 
  placeholder, 
  label, 
  error,
  showPassword,
  onTogglePassword,
  icon: IconComponent 
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-white/90">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IconComponent className="w-5 h-5 text-white/40" />
        </div>
        <input
          id={id}
          name={name}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          className={`
            w-full pl-10 pr-${type === "password" ? "12" : "4"} py-3 bg-white/5 border rounded-lg text-white placeholder-white/40
            focus:outline-none focus:ring-2 transition-all duration-200
            ${error 
              ? 'border-red-500/50 focus:ring-red-500/20' 
              : 'border-white/20 focus:border-amber-400/50 focus:ring-amber-400/20'
            }
          `}
          placeholder={placeholder}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};

