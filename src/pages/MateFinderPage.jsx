import React, { useState, useEffect } from "react";
import axios from "axios";

function MateFinderPage() {
  const [profile, setProfile] = useState(null);
  const [location, setLocation] = useState("");
  const [preferredWorkout, setPreferredWorkout] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const [matches, setMatches] = useState([]); // pour l'option "match"

  //  Charger le profil existant à l'arrivée
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

  //  Créer ou mettre à jour le profil
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
    <div style={{ margin: "20px" }}>
      <h1>MateFinder</h1>

      <form onSubmit={handleSaveProfile}>
        <div>
          <label>Location: </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label>Preferred Workout: </label>
          <input
            type="text"
            value={preferredWorkout}
            onChange={(e) => setPreferredWorkout(e.target.value)}
          />
        </div>

        <div>
          <label>Preferred Time: </label>
          <input
            type="text"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
          />
        </div>

        <button type="submit">Save Profile</button>
      </form>

      <hr />

      <button onClick={handleFindMatches}>Find Matching GymSessions</button>

      <ul>
        {matches.map((session) => (
          <li key={session._id}>
            {session.location} - {session.typeOfWorkout} (
            {session.favoriteTimeforWorkout})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MateFinderPage;
