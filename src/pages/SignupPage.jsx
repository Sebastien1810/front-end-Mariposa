import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        // Redirige l'utilisateur vers la page de login après inscription
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
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

        <TextField
          label="Name"
          variant="outlined"
          type="text"
          name="name"
          value={name}
          onChange={handleName}
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
          Sign Up
        </Button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>You probably already have an account?</p>
      <p>Go login!</p>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

export default SignupPage;
