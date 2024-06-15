import "./App.scss";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Authentication/Login/Login";
import UserDataContext from "./context/UserDataContext";
import NoMatch from "./pages/NoMatch/NoMatch";
import LandingPage from "./pages/LandingPage/LandingPage";
import User from "./pages/User/User";
import Dashboard from "./pages/User/Dashboard/Dashboard";

function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<UserDataContext />}>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<Home />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />

          <Route path="user" element={<User />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default Router;
