import { IoEyeOutline } from "react-icons/io5";
import styles from "./Options.module.scss";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
type OptionModalProps = {
  onClose: () => void;
  data: User;
};

const Options: React.FC<OptionModalProps> = ({ data, onClose }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div
          onClick={() => {
            navigate(`/user/userDetails/${data.id}`);
            onClose();
          }}
        >
          <IoEyeOutline />
          <p>View Details</p>
        </div>
        <div>
          <FiUserX />
          <p>Blacklist User</p>
        </div>
        <div>
          <FiUserCheck /> <p>Activate User</p>
        </div>
      </div>
    </>
  );
};

export default Options;
