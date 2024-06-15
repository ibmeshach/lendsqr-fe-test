import { authbg, logo } from "../../../assets";
import LoginForm from "../../../components/Authentication/LoginForm/LoginForm";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <div>
            <img className={styles.logo} src={logo} alt="logo" />
            <img className={styles.authBg} src={authbg} alt="authbg" />
          </div>
        </div>
        <div className={styles.form}>
          <img className={styles.form_logo} src={logo} alt="logo" />

          <div className={styles.head}>
            <h2>Welcome!</h2>
            <p>Enter details to login.</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
