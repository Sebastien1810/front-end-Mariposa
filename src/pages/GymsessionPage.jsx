import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function GymsessionPage() {
  const [sessions, setSessions] = useState([]);
  const [location, setLocation] = useState("");
  const [typeOfWorkout, setTypeOfWorkout] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/gymSessions`)
      .then((response) => setSessions(response.data))
      .catch((error) => console.error("Error fetching sessions:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSession = { location, typeOfWorkout };
    axios
      .post(`${API_URL}/api/gymSessions`, newSession)
      .then(() => {
        setLocation("");
        setTypeOfWorkout("");
        return axios.get("/api/gymSessions");
      })
      .then((response) => setSessions(response.data))
      .catch((error) => console.error("Error creating session:", error));
  };

  return (
    <div>
      <h1>Create a New Session</h1>
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
          <label>Workout Type:</label>
          <select
            value={typeOfWorkout}
            onChange={(e) => setTypeOfWorkout(e.target.value)}
            required
          >
            <option value="">--Select a Type--</option>
            <option value="Treadmill (Intervals, Incline Walking, Endurance Run)">
              Treadmill (Intervals, Incline Walking, Endurance Run)
            </option>
            <option value="Elliptical (Steady State, Interval Training)">
              Elliptical (Steady State, Interval Training)
            </option>
          </select>
        </div>
        <button type="submit">Create Session</button>
      </form>
      <h2>Existing Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            <strong>{session.location}</strong> - {session.typeOfWorkout}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GymsessionPage;
