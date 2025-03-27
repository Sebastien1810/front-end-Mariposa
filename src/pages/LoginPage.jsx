import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        // On stocke le token et on authentifie l'utilisateur
        storeToken(response.data.authToken);
        authenticateUser();

        // Redirection après login
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          fullWidth
          margin="normal"
          sx={{
            // Couleur du texte
            input: { color: "#fff" },
            // Couleur du label
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
            // Couleur et style de la bordure
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#000",
              },
              "&:hover fieldset": {
                borderColor: "#000",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#000",
              },
            },
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          fullWidth
          margin="normal"
          sx={{
            input: { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#000",
              },
              "&:hover fieldset": {
                borderColor: "#000",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#000",
              },
            },
          }}
        />

        <Button
          variant="outlined"
          type="submit"
          sx={{
            color: "#fff",
            borderColor: "#000",
            bgcolor: "transparent",
            "&:hover": { bgcolor: "#000", borderColor: "#000" },
            marginTop: "1rem",
          }}
        >
          Login
        </Button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
