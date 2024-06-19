import styles from "./Statistics.module.scss";
import StatisticsCard from "./StatisticsCard";

const Statistics = ({ data }: { data: StatisticsCardProps[] }) => {
  return (
    <div className={styles.container}>
      {data.map((item, index) => (
        <StatisticsCard key={index} item={item} />
      ))}
    </div>
  );
};

export default Statistics;
