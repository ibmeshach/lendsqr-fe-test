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

function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<UserDataContext />}>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<Home />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default Router;
