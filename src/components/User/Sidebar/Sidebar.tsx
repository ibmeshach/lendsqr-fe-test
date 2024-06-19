import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { briefcase, dropdown } from "../../../assets";
import styles from "./Sidebar.module.scss";

const Sidebar = ({
  toggled,
  setToggled,
  sidebarItems,
}: {
  toggled: boolean;
  setToggled: (state: boolean) => void;
  sidebarItems: SidebarItem[];
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [_, setSelected] = useState<string | number>(0);
  const broken = window.matchMedia("(max-width: 768px)").matches;

  return (
    <>
      <div
        onClick={() => {
          setToggled(false);
        }}
        className={toggled ? styles.overlay : styles.hidden}
      ></div>
      <div
        className={
          broken
            ? toggled
              ? styles.container
              : styles.hidden
            : styles.container
        }
      >
        <div
          onClick={() => {
            navigate("/");
          }}
          className={styles.switch}
        >
          <img src={briefcase} alt="briefcase" />
          <div>
            <p>Switch Organization</p>
            <img src={dropdown} alt="dropdown" />
          </div>
        </div>

        <div className={styles.sidebar}>
          {sidebarItems.map((item) => {
            return (
              <div key={item.id} className={styles.sidebarItemContainer}>
                {item.title ? <p>{item.title}</p> : null}
                {item?.items.map((value) => (
                  <div
                    key={value.id}
                    className={
                      location.pathname == value.path
                        ? styles.activeSidebarItem
                        : styles.sidebarItem
                    }
                    onClick={() => {
                      setSelected(value.id);
                      navigate(value.path);
                      setToggled(false);
                    }}
                  >
                    <img className={styles.icon} src={value.icon} alt="icon" />
                    <span>{value.heading}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
