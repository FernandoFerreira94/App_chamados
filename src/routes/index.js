import { Route, Routes } from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Page404 from "../pages/page404";
import Profile from "../pages/Profile";

import Private from "./Private";
import Customers from "../pages/Customers";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      <Route
        path="/profile"
        element={
          <Private>
            <Profile />
          </Private>
        }
      />
      <Route
        path="/customers"
        element={
          <Private>
            <Customers />
          </Private>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
