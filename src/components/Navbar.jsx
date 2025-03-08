import React from "react";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { useContext } from "react";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <Button variant="text">Home</Button>
      </Link>
      {isLoggedIn && (
        <>
          <Link to="/GymsessionPage.jsx"></Link>
          <button onClick={logOutUser}>Logout</button>
          <span>{user}</span>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}

      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </nav>
  );
}
export default Navbar;
