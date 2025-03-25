import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <Box
      component="nav"
      sx={{
        bgcolor: "black", // Fond noir
        p: 2, // Padding global
      }}
    >
      <Stack
        direction="row"
        spacing={2} // Espace horizontal entre boutons
        sx={{
          justifyContent: "center", // Centre horizontalement
          alignItems: "center", // Centre verticalement
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button sx={{ color: "#fff", bgcolor: "black" }}>Home</Button>
        </Link>

        {isLoggedIn && (
          <>
            <Button
              onClick={logOutUser}
              sx={{ color: "#fff", bgcolor: "black" }}
            >
              Logout
            </Button>

            <Link to="/gymsession" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "#fff", bgcolor: "black" }}>
                Gymsession
              </Button>
            </Link>

            <Link to="/CommentPage" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "#fff", bgcolor: "black" }}>
                Comment Section
              </Button>
            </Link>

            <Link to="/matefinder" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "#fff", bgcolor: "black" }}>
                Matefinder
              </Button>
            </Link>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "#fff", bgcolor: "black" }}>
                Sign up page
              </Button>
            </Link>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "#fff", bgcolor: "black" }}>
                Login page
              </Button>
            </Link>
          </>
        )}

        <Link to="/profil" style={{ textDecoration: "none" }}>
          <Button sx={{ color: "#fff", bgcolor: "black" }}>Profil</Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default Navbar;
