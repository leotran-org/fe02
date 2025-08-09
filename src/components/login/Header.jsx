import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export const LoginHeader = ({ fadeUp }) => {
  return (
    <motion.div variants={fadeUp} className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-2xl mb-4">
        <Shield className="w-8 h-8 text-amber-400" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
      <p className="text-white/60">Access your admin dashboard</p>
    </motion.div>
  );
};

