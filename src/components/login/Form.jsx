import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";
import { InputField } from "./InputField";
import { LoadingButton } from "./LoadingButton";

export const LoginForm = ({ fadeUp, formData, errors, isLoading, handleSubmit, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <ErrorMessage message={errors.general} type="general" />
      )}

    {/* Username Field */}
    <InputField
      id="username"
      name="username"
      type="text"
      value={formData.username}
      onChange={handleChange}
      placeholder="Enter your username"
      label="Username"
      error={errors.username}
      icon={Mail} // Or replace with a User icon
    />


      {/* Password Field */}
      <InputField
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        label="Password"
        error={errors.password}
        icon={Lock}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
      />

      {/* Submit Button */}
      <LoadingButton isLoading={isLoading}>
        Sign In
      </LoadingButton>
    </motion.form>
  );
};
