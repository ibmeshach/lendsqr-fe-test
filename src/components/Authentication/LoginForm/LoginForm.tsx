import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../constants/schemas";
import styles from "./LoginForm.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "onBlur" || "onSubmit" || "onChange",
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = async (data: LoginValues) => {
    console.log(data);
    reset();
    navigate("/user/users");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.input}>
        <div
          style={{
            border: errors.email?.message && "0.125rem solid red",
          }}
          className={styles.default}
        >
          <input type="email" {...register("email")} placeholder="Email" />
        </div>
        <p>{errors.email?.message}</p>
      </div>
      <div className={styles.input}>
        <div
          style={{
            border: errors.password?.message && "0.125rem solid red",
          }}
          className={styles.password}
        >
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
          />
          <p
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </p>
        </div>
        <p>{errors.password?.message}</p>
      </div>
      <p className={styles.forgotPassword}>FORGOT PASSWORD?</p>
      <button type="submit">LOG IN</button>
    </form>
  );
};

export default LoginForm;
