// components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <Box sx={{ bgcolor: "transparent", p: 2 }}>
      <Stack
        direction="row"
        spacing={3}
        sx={{ width: "100%", justifyContent: "space-evenly" }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            Home
          </Button>
        </Link>

        {isLoggedIn ? (
          <>
            <Button
              onClick={logOutUser}
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                "&:hover": { bgcolor: "#333" },
              }}
            >
              Logout
            </Button>

            <Link to="/gymsession" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                Gymsession
              </Button>
            </Link>

            <Link to="/CommentPage" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                Comment Section
              </Button>
            </Link>

            <Link to="/matefinder" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                Matefinder
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                Sign Up
              </Button>
            </Link>

            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                Login
              </Button>
            </Link>
          </>
        )}

        <Link to="/profil" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            Profil
          </Button>
        </Link>
        <Link to="/detailsGymsession" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "black",
              color: "white",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            DetailsGymsession
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default Navbar;
