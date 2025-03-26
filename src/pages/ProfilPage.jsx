import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// Imports Material-UI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../context/auth.context";

function ProfilPage() {
  const [profile, setProfile] = useState(null);

  // Pour savoir si l'utilisateur est loggé
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    // Charger le MateFinder profile (si l'utilisateur est loggé)
    if (isLoggedIn) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/matefinder`)
        .then((res) => {
          // res.data = { user, location, preferredWorkout, preferredTime } ou null
          setProfile(res.data);
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [isLoggedIn]);

  // Si pas loggé soit rediriger, soit afficher un message
  if (!isLoggedIn) {
    return (
      <Box sx={{ color: "#fff", m: 3 }}>
        <Typography variant="h5">
          You must be logged in to see your profile.
        </Typography>
      </Box>
    );
  }

  // Si on n'a pas encore récupéré de profil (ou qu'il n'existe pas)
  if (!profile) {
    return (
      <Box sx={{ color: "#fff", m: 3 }}>
        <Typography variant="h5">
          No MateFinder profile found. Please create one in MateFinderPage.
        </Typography>
      </Box>
    );
  }

  // Sinon, on a un profil -> on l'affiche
  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h3" sx={{ color: "#fff", mb: 3 }}>
        My Profile
      </Typography>

      <Card
        sx={{
          maxWidth: 400,
          bgcolor: "transparent",
          border: "1px solid #666",
          p: 2,
        }}
      >
        <CardContent>
          <Typography sx={{ color: "#fff", mb: 1 }}>
            <strong>Location:</strong> {profile.location}
          </Typography>
          <Typography sx={{ color: "#fff", mb: 1 }}>
            <strong>Preferred Workout:</strong> {profile.preferredWorkout}
          </Typography>
          <Typography sx={{ color: "#fff" }}>
            <strong>Preferred Time:</strong> {profile.preferredTime}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProfilPage;
