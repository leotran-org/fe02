import { motion } from "framer-motion";

export const DemoCredentials = ({ fadeUp }) => {
  return (
    <motion.div
      variants={fadeUp}
      className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg"
    >
      <p className="text-white/60 text-xs mb-2">Demo Credentials:</p>
      <p className="text-white/80 text-sm">Email: admin@example.com</p>
      <p className="text-white/80 text-sm">Password: admin123</p>
    </motion.div>
  );
};
