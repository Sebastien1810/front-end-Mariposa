import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

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
    /* mes differentes options de workout */
  ];
  const timeOptions = ["morning", "afternoon", "evening"];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/gymSessions`)
      .then((res) => setSessions(res.data))
      .catch(console.error);
  }, []);

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

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/gymSessions/${id}`)
      .then(() => setSessions(sessions.filter((s) => s._id !== id)))
      .catch(console.error);
  };

  const startEditing = (session) => {
    setEditingSessionId(session._id);
    setEditLocation(session.location);
    setEditTypeOfWorkout(session.typeOfWorkout);
    setEditFavoriteTime(session.favoriteTimeforWorkout);
  };

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
        setSessions(sessions.map((s) => (s._id === id ? res.data : s)));
        setEditingSessionId(null);
      })
      .catch(console.error);
  };

  return (
    <div>
      <h1>Create a New Gym Session</h1>
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
          />
        </Box>

        <FormControl fullWidth variant="outlined" margin="normal" required>
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

        <FormControl fullWidth variant="outlined" margin="normal" required>
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

        <button type="submit">Create Session</button>
      </form>

      <h2>Existing Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            <strong>{session.location}</strong> - {session.typeOfWorkout}
            {isLoggedIn &&
              user?._id === session.creator &&
              (editingSessionId === session._id ? (
                <form onSubmit={(e) => handleEditSubmit(e, session._id)}>
                  <div>
                    <label>Location:</label>
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      required
                    />
                  </div>

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

                  <button type="submit">Save</button>
                  <button
                    type="button"
                    onClick={() => setEditingSessionId(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <button onClick={() => startEditing(session)}>Edit</button>
                  <button onClick={() => handleDelete(session._id)}>
                    Delete
                  </button>
                </>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GymSessionPage;
