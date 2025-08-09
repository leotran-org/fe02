import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export const ErrorMessage = ({ message, type = "field" }) => {
  if (type === "general") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm"
      >
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        {message}
      </motion.div>
    );
  }

  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-red-400 text-sm flex items-center gap-1"
    >
      <AlertCircle className="w-4 h-4" />
      {message}
    </motion.p>
  );
};
