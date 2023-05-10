import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedOut = useSelector((state) => state.isLoggedOut);
  const [token, setToken] = React.useState(
    localStorage.getItem("token") || null
  );
  const handleLogout = () => {
    dispatch(logout(true));
    localStorage.clear();
    setToken(null);
    navigate("/login");
  };

  React.useEffect(() => {
    const handleTokenChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("loggedIn", handleTokenChange);
    // setToken(localStorage.getItem("token"));
  }, []);

  console.log("localstirade", localStorage.getItem("token"));

  return (
    <header className="header">
      <h1>Weather-Finder App</h1>
      {token && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
