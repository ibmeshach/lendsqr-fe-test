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
import Users from "./pages/User/Users/Users";

function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<UserDataContext />}>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<Home />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />

          <Route path="user" element={<User />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="guarantors" element={<Dashboard />} />
            <Route path="loans" element={<Dashboard />} />
            <Route path="decisionModels" element={<Dashboard />} />
            <Route path="savings" element={<Dashboard />} />
            <Route path="loanRequests" element={<Dashboard />} />
            <Route path="whitelist" element={<Dashboard />} />
            <Route path="karma" element={<Dashboard />} />
            <Route path="organization" element={<Dashboard />} />
            <Route path="loanProducts" element={<Dashboard />} />
            <Route path="savingsProducts" element={<Dashboard />} />
            <Route path="fees&charges" element={<Dashboard />} />
            <Route path="transactions" element={<Dashboard />} />
            <Route path="services" element={<Dashboard />} />
            <Route path="serviceAccount" element={<Dashboard />} />
            <Route path="reports" element={<Dashboard />} />
            <Route path="preferences" element={<Dashboard />} />
            <Route path="fees&pricing" element={<Dashboard />} />
            <Route path="auditLogs" element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default Router;
