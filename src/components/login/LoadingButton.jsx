import { motion } from "framer-motion";

export const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200
        ${isLoading
          ? 'bg-amber-500/50 cursor-not-allowed'
          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-amber-500/25'
        }
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          Signing In...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

