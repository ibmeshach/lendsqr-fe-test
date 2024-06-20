import { useState } from "react";
import { avatar, fillStar, unfillStar } from "../../../../assets";
import { UserDetailsNav } from "../../../../constants";
import styles from "./Header.module.scss";

const Header = ({ user }: { user: User }) => {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.profile}>
          <img src={avatar} alt="avatar" />
          <div>
            <h3>{user?.username}</h3>
            <p>LSQFf587g90</p>
          </div>
        </div>
        <div className={styles.rating}>
          <p>User’s Tier</p>
          <div>
            <img src={fillStar} alt="star" />
            <img src={unfillStar} alt="star" />
            <img src={unfillStar} alt="star" />
          </div>
        </div>
        <div className={styles.wallet}>
          <h3>₦200,000.00</h3>
          <p>9912345678/Providus Bank</p>
        </div>
      </div>
      <div className={styles.nav}>
        {UserDetailsNav.map((item, index) => (
          <span
            onClick={() => {
              setActive(index);
            }}
            className={active == index ? styles.active : ""}
            key={index}
          >
            <p>{item}</p>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Header;
