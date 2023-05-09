import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  // const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const expiry = +localStorage.getItem("EXPIRED_AT");
  const currentTime = Math.floor(new Date().getTime() / 1000);

  let message = "";

  if (expiry && currentTime > expiry) {
    localStorage.clear();
    localStorage.setItem("message", "Token Expired");
  }

  if (message || !token) {
    return <Navigate to="/" state={{ from: location, message }} replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
