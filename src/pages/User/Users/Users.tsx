import { useState } from "react";
import Statistics from "../../../components/User/Statistics/Statistics";
import { statisticsData } from "../../../constants";
import { useGetAllUsers } from "../../../hooks/useApiMethod";
import styles from "./Users.module.scss";
import Loader from "../../../components/Shared/Loader/Loader";
import Table from "../../../components/User/Table/Table";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const onSuccess = (data: any) => {
    const content = data?.data;
    setUsers(content);
    console.log(content);
  };

  const onError = (error: any) => {
    console.log(error?.response);
  };

  const { isLoading, isError } = useGetAllUsers(onError, onSuccess);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Users</h2>

          <Statistics data={statisticsData} />
          <Table data={users} />
        </div>
      </div>
      {isLoading && !isError && <Loader />}
    </>
  );
};

export default Users;
