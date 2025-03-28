import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function GymSessionPage() {
  const [location, setLocation] = useState("");
  const [typeOfWorkout, setTypeOfWorkout] = useState("");
  const [favoriteTime, setFavoriteTime] = useState("");
  const [sessions, setSessions] = useState([]);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editLocation, setEditLocation] = useState("");
  const [editTypeOfWorkout, setEditTypeOfWorkout] = useState("");
  const [editFavoriteTime, setEditFavoriteTime] = useState("");

  const { user, isLoggedIn } = useContext(AuthContext);

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
  const timeOptions = ["morning", "afternoon", "evening"];

  // Charger les sessions existantes
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/gymSessions`)
      .then((res) => setSessions(res.data))
      .catch(console.error);
  }, []);

  // Créer une nouvelle session
  const handleSubmit = (e) => {
    e.preventDefault();
    const newSession = {
      location,
      typeOfWorkout,
      favoriteTimeforWorkout: favoriteTime,
      creator: user?._id,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/gymSessions`, newSession)
      .then(() => {
        setLocation("");
        setTypeOfWorkout("");
        setFavoriteTime("");
        return axios.get(`${import.meta.env.VITE_API_URL}/api/gymSessions`);
      })
      .then((res) => setSessions(res.data))
      .catch(console.error);
  };

  // Supprimer une session
  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/gymSessions/${id}`)
      .then(() => setSessions((prev) => prev.filter((s) => s._id !== id)))
      .catch(console.error);
  };

  // Passer en mode édition
  const startEditing = (session) => {
    setEditingSessionId(session._id);
    setEditLocation(session.location);
    setEditTypeOfWorkout(session.typeOfWorkout);
    setEditFavoriteTime(session.favoriteTimeforWorkout);
  };

  // Sauvegarder la session éditée
  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    const updatedData = {
      location: editLocation,
      typeOfWorkout: editTypeOfWorkout,
      favoriteTimeforWorkout: editFavoriteTime,
    };

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/gymSessions/${id}`, updatedData)
      .then((res) => {
        setSessions((prev) => prev.map((s) => (s._id === id ? res.data : s)));
        setEditingSessionId(null);
      })
      .catch(console.error);
  };

  return (
    <div>
      <h1>Create a New Gym Session</h1>

      {/* FORMULAIRE DE CREATION */}
      <form onSubmit={handleSubmit}>
        <Box sx={{ m: 1, width: "100%" }}>
          <TextField
            fullWidth
            id="location-input"
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
              "& .MuiInputBase-input": { color: "#fff" },
            }}
          />
        </Box>

        <FormControl
          fullWidth
          variant="outlined"
          margin="normal"
          required
          sx={{
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
            "& .MuiSelect-root": { color: "#fff" },
          }}
        >
          <InputLabel id="type-select-label">Type of Workout</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            value={typeOfWorkout}
            onChange={(e) => setTypeOfWorkout(e.target.value)}
            label="Type of Workout"
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

        <FormControl
          fullWidth
          variant="outlined"
          margin="normal"
          required
          sx={{
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
            "& .MuiSelect-root": { color: "#fff" },
          }}
        >
          <InputLabel id="time-select-label">Favorite Time</InputLabel>
          <Select
            labelId="time-select-label"
            id="time-select"
            value={favoriteTime}
            onChange={(e) => setFavoriteTime(e.target.value)}
            label="Favorite Time"
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

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            type="submit"
            sx={{
              color: "#fff",
              borderColor: "#000",
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "#000",
                borderColor: "#000",
              },
            }}
          >
            Create Session
          </Button>
        </Stack>
      </form>

      <h2>Existing Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            <strong>{session.location}</strong> - {session.typeOfWorkout}
            {isLoggedIn && user?._id === session.creator && (
              <>
                {editingSessionId === session._id ? (
                  // --- FORMULAIRE D'EDITION ---
                  <form onSubmit={(e) => handleEditSubmit(e, session._id)}>
                    <Box sx={{ mt: 2 }}>
                      {/* TEXTFIELD POUR LOCATION */}
                      <TextField
                        fullWidth
                        label="Location"
                        variant="outlined"
                        value={editLocation}
                        onChange={(e) => setEditLocation(e.target.value)}
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#fff" },
                            "&:hover fieldset": { borderColor: "#fff" },
                            "&.Mui-focused fieldset": { borderColor: "#fff" },
                          },
                          "& .MuiInputBase-input": { color: "#fff" },
                        }}
                      />
                    </Box>

                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      required
                    >
                      <InputLabel id="edit-type-select-label">
                        Type of Workout
                      </InputLabel>
                      <Select
                        labelId="edit-type-select-label"
                        value={editTypeOfWorkout}
                        onChange={(e) => setEditTypeOfWorkout(e.target.value)}
                        label="Type of Workout"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {workoutOptions.map((o, i) => (
                          <MenuItem key={i} value={o}>
                            {o}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      required
                    >
                      <InputLabel id="edit-time-select-label">
                        Favorite Time
                      </InputLabel>
                      <Select
                        labelId="edit-time-select-label"
                        value={editFavoriteTime}
                        onChange={(e) => setEditFavoriteTime(e.target.value)}
                        label="Favorite Time"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {timeOptions.map((o, i) => (
                          <MenuItem key={i} value={o}>
                            {o}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* BOUTONS SAVE / CANCEL */}
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          bgcolor: "grey.800",
                          color: "#fff",
                          "&:hover": { bgcolor: "grey.700" },
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        sx={{
                          bgcolor: "grey.800",
                          color: "#fff",
                          "&:hover": { bgcolor: "grey.700" },
                        }}
                        onClick={() => setEditingSessionId(null)}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </form>
                ) : (
                  // --- BOUTONS EDIT / DELETE ---
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ display: "inline-flex", ml: 2 }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => startEditing(session)}
                      sx={{
                        bgcolor: "grey.800",
                        color: "#fff",
                        "&:hover": { bgcolor: "grey.700" },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(session._id)}
                      sx={{
                        bgcolor: "grey.800",
                        color: "#fff",
                        "&:hover": { bgcolor: "grey.700" },
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GymSessionPage;
