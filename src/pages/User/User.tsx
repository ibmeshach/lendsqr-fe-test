import { useState } from "react";
import Navbar from "../../components/User/Navbar/Navbar";
import styles from "./User.module.scss";
import Sidebar from "../../components/User/Sidebar/Sidebar";
import { UserSidebarItems } from "../../constants";
import { Outlet } from "react-router-dom";
const User: React.FC = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Navbar setOpen={setToggled} open={toggled} />

          <div className={styles.main}>
            <div className={styles.sidebar}>
              <Sidebar
                toggled={toggled}
                setToggled={(state: boolean) => {
                  setToggled(state);
                }}
                sidebarItems={UserSidebarItems}
              />
            </div>
            <section>
              <main>
                <Outlet />
              </main>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
