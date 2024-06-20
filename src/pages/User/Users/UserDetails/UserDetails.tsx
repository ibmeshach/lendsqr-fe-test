import { LuMoveLeft } from "react-icons/lu";
import styles from "./UserDetails.module.scss";
import Header from "../../../../components/User/UserDetails/Header/Header";
import Info from "../../../../components/User/UserDetails/Info/Info";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useGetAllUsers } from "../../../../hooks/useApiMethod";
import Loader from "../../../../components/Shared/Loader/Loader";

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<User>({
    username: "",
    id: "",
    organization: "",
    email: "",
    phoneNumber: "",
    dateJoined: "",
    status: "",
  });

  const onSuccess = (data: any) => {
    const content = data?.data;
    const selectedUser = content.find((user: any) => user.id === id);
    setUser(selectedUser);
  };

  const onError = (error: any) => {
    console.log(error?.response);
  };

  const { isLoading, isError } = useGetAllUsers(onError, onSuccess);

  return (
    <>
      <div className={styles.container}>
        <div
          onClick={() => {
            navigate("/user/users");
          }}
          className={styles.navigation}
        >
          <LuMoveLeft />
          <p>Back to Users</p>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>User Details</h2>
            <div>
              <button className={styles.blacklist}>Blacklist User</button>
              <button className={styles.activate}>Activate User</button>
            </div>
          </div>
          <Header user={user} />
          <div className={styles.information}>
            <div className={styles.card}>
              <h2>Personal Information</h2>
              <div className={styles.items}>
                <Info title="Full Name" value={user.username} />
                <Info title="Phone Number" value={user?.phoneNumber} />
                <Info title="Email Address" value={user?.email} />
                <Info title="Bvn" value="07060780922" />
                <Info title="Gender" value="Female" />
                <Info title="Marital status" value="Single" />
                <Info title="Children" value="None" />
                <Info title="Type of residence" value="Parent’s Apartment" />
              </div>
            </div>

            <div className={styles.card}>
              <h2>Education and Employment</h2>
              <div className={`${styles.items} ${styles.edu}`}>
                <Info title="level of education" value="B.Sc" />
                <Info title="employment status" value="Employed" />
                <Info title="sector of employment" value="FinTech" />
                <Info title="Duration of employment" value="2 years" />
                <Info title="office email" value="grace@lendsqr.com" />
                <Info title="Monthly income" value="₦200,000.00- ₦400,000.00" />
                <Info title="loan repayment" value="40,000" />
              </div>
            </div>

            <div className={styles.card}>
              <h2>Socials</h2>
              <div className={styles.items}>
                <Info title="Twitter" value="@grace_effiom" />
                <Info title="Facebook" value="Grace Effiom" />
                <Info title="Instagram" value="@grace_effiom" />
              </div>
            </div>

            <div className={styles.card}>
              <h2>Guarantor</h2>
              <div className={styles.items}>
                <Info title="full Name" value="Debby Ogana" />
                <Info title="Phone Number" value="07060780922" />
                <Info title="Email Address" value="debby@gmail.com" />
                <Info title="Relationship" value="Sister" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && !isError && <Loader />}
    </>
  );
};

export default UserDetails;
