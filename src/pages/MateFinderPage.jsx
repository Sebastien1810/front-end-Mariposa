import React, { useState, useEffect } from "react";
import axios from "axios";

// Material‑UI imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Même liste de workouts que dans GymSession
const workoutOptions = [
  "Treadmill (Intervals, Incline Walking, Endurance Run)",
  "Elliptical (Steady State, Interval Training)",
  "Stationary Bike (Spin Class, Steady Pedal)",
  "Rowing Machine (Interval Rowing, Continuous Endurance)",
  "Stair Climber (Consistent Pace, HIIT)",
  "HIIT Classes (Burpees, Jumping Jacks, Sprints)",
  "Free Weight Training (Bench Press, Squats, Deadlifts, Overhead Press)",
  "Machine Workouts (Leg Press, Chest Press, Lat Pulldown)",
  "Kettlebell Workouts (Swings, Cleans, Goblet Squats)",
  "Bodyweight Circuits (Push-ups, Pull-ups, Dips, Lunges, Planks)",
  "TRX Suspension Training (Suspension Exercises, Core Strengthening)",
  "Resistance Band Sessions (Band Rows, Curls, Leg Workouts)",
  "Yoga Classes (Hatha, Vinyasa)",
  "Pilates Classes (Core Strengthening, Stretching)",
  "Dynamic Stretching (Movement-Based Warm-Up)",
  "Static Stretching (Cool-Down Routines, Major Muscle Groups)",
  "Foam Rolling/Mobility (Self-Myofascial Release, Mobility Exercises)",
  "Stability Ball Workouts (Ball Squats, Planks, Core Drills)",
  "BOSU Ball Training (Squats, Push-ups, Lunges)",
  "Balance Board Exercises (Single-Leg Balance, Proprioception Drills)",
  "Single-Leg Drills (Unilateral Strength, Stability Exercises)",
  "Agility Ladder Drills (Quick Feet, Coordination Exercises)",
];

// Même liste de timeOptions que dans GymSession
const timeOptions = ["morning", "afternoon", "evening"];

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
      <Typography variant="h3" sx={{ color: "#fff", mb: 3 }}>
        MateFinder
      </Typography>

      {/* FORMULAIRE MateFinder */}
      <Box component="form" onSubmit={handleSaveProfile} sx={{ maxWidth: 600 }}>
        {/* Champ texte pour Location */}
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#fff" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#fff" },
            },
            "& .MuiInputBase-input": { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#fff" },
          }}
        />

        {/* Sélecteur pour Preferred Workout */}
        <FormControl
          fullWidth
          variant="outlined"
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
            "& .MuiSelect-root": { color: "#fff" },
          }}
        >
          <InputLabel id="workout-select-label" sx={{ color: "#fff" }}>
            Preferred Workout
          </InputLabel>
          <Select
            labelId="workout-select-label"
            value={preferredWorkout}
            onChange={(e) => setPreferredWorkout(e.target.value)}
            label="Preferred Workout"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {workoutOptions.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sélecteur pour Preferred Time */}
        <FormControl
          fullWidth
          variant="outlined"
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
            "& .MuiSelect-root": { color: "#fff" },
          }}
        >
          <InputLabel id="time-select-label" sx={{ color: "#fff" }}>
            Preferred Time
          </InputLabel>
          <Select
            labelId="time-select-label"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            label="Preferred Time"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {timeOptions.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* BOUTON SAVE */}
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
      </Box>

      <hr style={{ margin: "20px 0" }} />

      {/* BOUTON FIND MATCHES */}
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

      {/* AFFICHAGE DES MATCHES */}
      <ul style={{ color: "#fff" }}>
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
