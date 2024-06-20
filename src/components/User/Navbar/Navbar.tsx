import React, { useContext, useState } from "react";
import {
  IoIosSearch,
  IoMdArrowDropdown,
  IoMdNotificationsOutline,
} from "react-icons/io";
import styles from "./Navbar.module.scss";
import { close, logo, menu, profile } from "../../../assets";
import { GeneralUserData } from "../../../context/UserDataContext";
import { useNavigate } from "react-router-dom";

interface NavProps {
  setOpen: (open: boolean) => void;
  open: boolean;
}

const Navbar: React.FC<NavProps> = ({ setOpen, open }) => {
  const navigate = useNavigate();
  const { searchKey, setSearchKey } = useContext(GeneralUserData);
  const [searchBarState, setSearchBarState] = useState<boolean>(false);
  const openState = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <img
            onClick={() => {
              navigate("/");
            }}
            src={logo}
            alt=""
          />
          <div className={styles.search}>
            <input
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              type="text"
              placeholder="Search for anything"
            />
            <div>
              <IoIosSearch />
            </div>
          </div>

          <div
            onClick={() => {
              setSearchBarState(!searchBarState);
            }}
            className={styles.searchIcon}
          >
            <IoIosSearch />
          </div>
        </div>

        <div className={styles.right}>
          <p>Docs </p>

          <div className={styles.settings}>
            <IoMdNotificationsOutline className={styles.icon} />

            <div className={styles.profile}>
              <img src={profile} alt="" />
              <div>
                <span> Adedeji</span>
                <IoMdArrowDropdown className={styles.dropdown} />
              </div>
            </div>
            <div onClick={openState} className={styles.menu}>
              {open ? (
                <img src={close} alt="close" />
              ) : (
                <img src={menu} alt="menu" />
              )}
            </div>
          </div>
        </div>
      </div>
      {searchBarState ? (
        <div className={styles.mobileSearch}>
          <input
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            placeholder="Search for anything"
            type="text"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
