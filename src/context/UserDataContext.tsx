import { Dispatch, SetStateAction, createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";

interface GeneralUserDataProps {
  searchKey: string;
  setSearchKey: Dispatch<SetStateAction<string>>;
}

export const GeneralUserData = createContext<GeneralUserDataProps>({
  searchKey: "",
  setSearchKey: () => {},
});

function UserDataContext(): JSX.Element {
  const [searchKey, setSearchKey] = useState("");
  return (
    <GeneralUserData.Provider
      value={{
        searchKey,
        setSearchKey,
      }}
    >
      <ScrollToTop />
      <Outlet />
    </GeneralUserData.Provider>
  );
}

export default UserDataContext;
