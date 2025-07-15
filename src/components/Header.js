import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    sessionStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header>
      {/* Optional: add a logo */}
      <img src="/logo512.png" alt="Logo" style={{ height: 32, marginRight: 14, verticalAlign: "middle" }} />
      <h1 style={{
        fontSize: "2rem",
        fontWeight: 700,
        margin: 0,
        flexGrow: 1,
        textAlign: "center",
        letterSpacing: "0.04em"
      }}>
        SmartForm     
      </h1>
      <div className="auth-buttons" style={{ marginLeft: "auto" }}>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;