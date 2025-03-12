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
          <Button onClick={logOutUser} variant="contained">
            Logout
          </Button>
          <Link to="/gymsession">
            <Button variant="contained">Gymsession</Button>
          </Link>
          <Link to="/CommentPage">
            <Button variant="contained">Comment Section</Button>
          </Link>
          <Link to="/matefinder">
            <Button variant="contained">Matefinder</Button>
          </Link>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <Button variant="contained">Sign up page</Button>
          </Link>
          <Link to="/login">
            <Button variant="contained">Login page</Button>
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
