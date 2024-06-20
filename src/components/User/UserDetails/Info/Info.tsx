import styles from "./Info.module.scss";

const Info = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className={styles.container}>
      <p>{title.toUpperCase()}</p>
      <h4>{value}</h4>
    </div>
  );
};

export default Info;
