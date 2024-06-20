import { useForm } from "react-hook-form";
import styles from "./Filter.module.scss";
import { Dispatch, SetStateAction } from "react";
type FilterModalProps = {
  onClose: () => void;
  setFilterData: Dispatch<SetStateAction<FilterProps>>;
};

const Filter: React.FC<FilterModalProps> = ({ setFilterData, onClose }) => {
  const form = useForm<FilterProps>({
    defaultValues: {
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    },
  });

  const { register, handleSubmit, reset } = form;

  const onSubmit = async (data: FilterProps) => {
    setFilterData(data);
    reset();
    onClose();
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.option}>
            <label htmlFor="organization">Organization</label>
            <select {...register("organization")}>
              <option value="">Select</option>
              {["Lendsqr", "Irorun", "Lendstar"].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.option}>
            <label htmlFor="username">Username</label>
            <input type="text" {...register("username")} placeholder="User" />
          </div>

          <div className={styles.option}>
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} placeholder="Email" />
          </div>

          <div className={styles.option}>
            <label htmlFor="date">Date</label>
            <input type="date" {...register("date")} placeholder="Date" />
          </div>

          <div className={styles.option}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="number"
              {...register("phoneNumber")}
              placeholder="Phone Number"
            />
          </div>
          <div className={styles.option}>
            <label htmlFor="status">Status</label>
            <select {...register("status")}>
              <option value="">Select</option>
              {["Inactive", "Pending", "Blacklisted", "Active"].map(
                (item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          <div className={styles.buttons}>
            <button
              onClick={() => {
                reset();
              }}
              className={styles.reset}
            >
              Reset
            </button>
            <button type="submit" className={styles.filter}>
              Filter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Filter;
