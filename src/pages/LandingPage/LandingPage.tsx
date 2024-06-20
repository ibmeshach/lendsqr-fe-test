import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.scss";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>
          Welcome to my Lendsqr frontend assessment, thanks for your
          consideration
        </h2>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
