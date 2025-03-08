import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5173";

function Login(succesToLogin) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // src/pages/LoginPage.jsx

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);

        navigate("/"); // <== ADD
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setError(errorDescription);
      });
  };
}
export default Login;
// ...
