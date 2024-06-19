import styles from "./Statistics.module.scss";

const StatisticsCard = ({ item }: { item: StatisticsCardProps }) => {
  return (
    <div className={styles.card}>
      <div>
        <img src={item.icon} alt="" />
        <p>{item.title}</p>
      </div>

      <h2>{item.value}</h2>
    </div>
  );
};

export default StatisticsCard;
