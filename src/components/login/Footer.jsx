import { motion } from "framer-motion";

export const LoginFooter = ({ fadeUp }) => {
  return (
    <motion.div
      variants={fadeUp}
      className="text-center mt-6"
    >
      <p className="text-white/40 text-sm">
        Protected admin area • Unauthorized access prohibited
      </p>
    </motion.div>
  );
};
