import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function GymSessionPage() {
  // States for the creation form fields
  const [location, setLocation] = useState("");
  const [typeOfWorkout, setTypeOfWorkout] = useState("");
  const [favoriteTime, setFavoriteTime] = useState("");

  // State to store existing sessions
  const [sessions, setSessions] = useState([]);

  // States for editing a session
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editLocation, setEditLocation] = useState("");
  const [editTypeOfWorkout, setEditTypeOfWorkout] = useState("");
  const [editFavoriteTime, setEditFavoriteTime] = useState("");

  // Get the logged in user and login status from the auth context
  const { user, isLoggedIn } = useContext(AuthContext);

  // Options for the type of workout (corresponding to your schema)
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

  // Options for the favorite workout time
  const timeOptions = ["morning", "afternoon", "evening"];

  // Load existing sessions when the component mounts
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/gymSessions`)
      .then((response) => setSessions(response.data))
      .catch((error) => console.error("Error fetching sessions:", error));
  }, []);

  // Handle form submission to create a new session
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the object to send with the form fields and creator id
    const newSession = {
      location,
      typeOfWorkout,
      favoriteTimeforWorkout: favoriteTime,
      creator: user ? user._id : null,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/gymSessions`, newSession)
      .then(() => {
        setLocation("");
        setTypeOfWorkout("");
        setFavoriteTime("");
        // Refresh the sessions list from the backend
        return axios.get(`${API_URL}/api/gymSessions`);
      })
      .then((response) => setSessions(response.data))
      .catch((error) => console.error("Error creating session:", error));
  };

  const handleDelete = (sessionId) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/gymSessions/${sessionId}`)
      .then(() => {
        // Update state by removing the deleted session
        setSessions(sessions.filter((session) => session._id !== sessionId));
      })
      .catch((error) => console.error("Error deleting session:", error));
  };

  const startEditing = (session) => {
    setEditingSessionId(session._id);
    setEditLocation(session.location);
    setEditTypeOfWorkout(session.typeOfWorkout);
    setEditFavoriteTime(session.favoriteTimeforWorkout);
  };

  const handleEditSubmit = (e, sessionId) => {
    e.preventDefault();
    const updatedData = {
      location: editLocation,
      typeOfWorkout: editTypeOfWorkout,
      favoriteTimeforWorkout: editFavoriteTime,
    };

    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/gymSessions/${sessionId}`,
        updatedData
      )
      .then((response) => {
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session._id === sessionId ? response.data : session
          )
        );
        setEditingSessionId(null);
      })
      .catch((error) => console.error("Error updating session:", error));
  };

  return (
    <div>
      <h1>Create a New Gym Session</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Type of Workout:</label>
          <select
            value={typeOfWorkout}
            onChange={(e) => setTypeOfWorkout(e.target.value)}
            required
          >
            <option value="">--Select a type--</option>
            {workoutOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Favorite Time for Workout:</label>
          <select
            value={favoriteTime}
            onChange={(e) => setFavoriteTime(e.target.value)}
            required
          >
            <option value="">--Select a time--</option>
            {timeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Session</button>
      </form>
      <h2>Existing Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            <strong>{session.location}</strong> - {session.typeOfWorkout}
            {isLoggedIn && user && user._id === session.creator && (
              <>
                {editingSessionId === session._id ? (
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
                    <div>
                      <label>Type of Workout:</label>
                      <select
                        value={editTypeOfWorkout}
                        onChange={(e) => setEditTypeOfWorkout(e.target.value)}
                        required
                      >
                        <option value="">--Select a type--</option>
                        {workoutOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label>Favorite Time for Workout:</label>
                      <select
                        value={editFavoriteTime}
                        onChange={(e) => setEditFavoriteTime(e.target.value)}
                        required
                      >
                        <option value="">--Select a time--</option>
                        {timeOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
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
