import { createContext } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";

interface GeneralUserDataProps {}

export const GeneralUserData = createContext<GeneralUserDataProps>({});

function UserDataContext(): JSX.Element {
  return (
    <GeneralUserData.Provider value={{}}>
      <ScrollToTop />
      <Outlet />
    </GeneralUserData.Provider>
  );
}

export default UserDataContext;
