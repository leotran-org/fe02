import { motion } from "framer-motion";
import { useLoginForm } from "../hooks/useLoginForm";
import { BackgroundEffects } from "../components/login/BackgroundEffects";
import { LoginHeader } from "../components/login/Header";
import { DemoCredentials } from "../components/login/DemoCredentials";
import { LoginFooter } from "../components/login/Footer";
import { fadeUp, stagger } from "../animations/variants";
import { LoginForm } from "../components/login/Form";


const Login = () => {
  const { formData, errors, isLoading, handleSubmit, handleChange } = useLoginForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <BackgroundEffects />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative w-full max-w-md"
      >
        {/* Login Card */}
        <motion.div
          variants={fadeUp}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
        >
          <LoginHeader fadeUp={fadeUp} />
          
          <LoginForm 
            fadeUp={fadeUp}
            formData={formData}
            errors={errors}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />

          <DemoCredentials fadeUp={fadeUp} />
        </motion.div>

        <LoginFooter fadeUp={fadeUp} />
      </motion.div>
    </div>
  );
};

export default Login;
