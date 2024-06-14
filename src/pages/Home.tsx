import { Outlet } from "react-router-dom";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default Home;
