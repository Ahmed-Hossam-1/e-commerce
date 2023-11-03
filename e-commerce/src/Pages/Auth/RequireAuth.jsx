import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import Forbidden from "./403";
import FullLaoding from "../../Components/Loading/FullLaoding";
import { USER } from "../../services/API/Permisions";
import { Axios } from "../../services/API/Axios";

const RequireAuth = ({ allowedRole }) => {
  const navigate = useNavigate();
  // User
  const [user, setUser] = useState();
  // fetch user
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((res) => setUser(res.data))
      .catch(() => {
        navigate("/login", { replace: true });
      });
  }, []);

  // cookies
  const cookie = Cookie();
  const token = cookie.get("Bearer");

  return token ? (
    user === undefined || "" ? (
      <FullLaoding />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Forbidden role={user.role} />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default RequireAuth;
