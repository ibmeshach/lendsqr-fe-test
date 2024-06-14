import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.scss";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
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
