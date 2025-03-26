import React, { useState, useEffect } from "react";
import axios from "axios";

// Ajouts Material-UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function MateFinderPage() {
  const [profile, setProfile] = useState(null);
  const [location, setLocation] = useState("");
  const [preferredWorkout, setPreferredWorkout] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const [matches, setMatches] = useState([]); // pour l'option "match"

  // Charger le profil existant à l'arrivée
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/matefinder`)
      .then((res) => {
        if (res.data) {
          setProfile(res.data);
          setLocation(res.data.location || "");
          setPreferredWorkout(res.data.preferredWorkout || "");
          setPreferredTime(res.data.preferredTime || "");
        }
      })
      .catch((error) =>
        console.error("Error fetching MateFinder profile:", error)
      );
  }, []);

  // Créer ou mettre à jour le profil
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const body = { location, preferredWorkout, preferredTime };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/matefinder`, body)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error) =>
        console.error("Error updating MateFinder profile:", error)
      );
  };

  // Chercher les GymSessions "compatibles"
  const handleFindMatches = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/matefinder/matches`)
      .then((res) => {
        setMatches(res.data);
      })
      .catch((error) => console.error("Error fetching matches:", error));
  };

  return (
    <Box sx={{ m: 3 }}>
      <h1>MateFinder</h1>

      <Box
        component="form"
        onSubmit={handleSaveProfile}
        sx={{ maxWidth: 400, mb: 2 }}
      >
        <Stack spacing={2}>
          <TextField
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiInputLabel-root": { color: "#fff" },
            }}
          />

          <TextField
            label="Preferred Workout"
            variant="outlined"
            value={preferredWorkout}
            onChange={(e) => setPreferredWorkout(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiInputLabel-root": { color: "#fff" },
            }}
          />

          <TextField
            label="Preferred Time"
            variant="outlined"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
              "& .MuiInputBase-input": { color: "#fff" },
              "& .MuiInputLabel-root": { color: "#fff" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "grey.800",
              color: "#fff",
              "&:hover": { bgcolor: "grey.700" },
            }}
          >
            Save Profile
          </Button>
        </Stack>
      </Box>

      <hr />

      <Button
        onClick={handleFindMatches}
        variant="contained"
        sx={{
          bgcolor: "grey.800",
          color: "#fff",
          "&:hover": { bgcolor: "grey.700" },
          mb: 2,
        }}
      >
        Find Matching GymSessions
      </Button>

      <ul>
        {matches.map((session) => (
          <li key={session._id}>
            {session.location} - {session.typeOfWorkout} (
            {session.favoriteTimeforWorkout})
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default MateFinderPage;
