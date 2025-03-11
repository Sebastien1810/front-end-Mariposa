import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <Button variant="contained">Home</Button>
      </Link>
      {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Logout</button>
          <Link to="/gymsession">
            <Button variant="contained">Gymsession</Button>
          </Link>
          <Link to="/CommentPage">
            <Button variant="contained">Comment Section</Button>
          </Link>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign up page</button>
          </Link>
          <Link to="/login">
            <button>Login page</button>
          </Link>
        </>
      )}
      <Link to="/profil">
        <Button variant="contained">Profil</Button>
      </Link>
    </nav>
  );
}

export default Navbar;
