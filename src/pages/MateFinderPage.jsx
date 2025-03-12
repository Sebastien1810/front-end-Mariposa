import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005/api";

function MateFinderPage() {
  const { user } = useContext(AuthContext);

  const [searchCriteria, setSearchCriteria] = useState({
    location: "",
    preferredWorkoutType: "",
    availableTime: "",
    experienceLevel: "",
  });
  const [results, setResults] = useState([]);

  const locationOptions = ["Paris", "Marseille", "Lyon", "Bordeaux", "Nice"];
  const workoutTypeOptions = [
    "Cardio",
    "Strength",
    "Flexibility",
    "Balance",
    "HIIT",
  ];
  const timeOptions = ["Morning", "Afternoon", "Evening"];
  const experienceOptions = ["Beginner", "Intermediate", "Expert"];

  const handleCriteriaChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    axios
      .get(`${API_URL}/matefinder`, { params: searchCriteria })
      .then((response) => {
        setResults(response.data);
      })
      .catch((error) =>
        console.error("Error fetching matefinder results:", error)
      );
  };

  return (
    <div>
      <h2>Search for a Training Partner</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Location: </label>
          <select
            name="location"
            value={searchCriteria.location}
            onChange={handleCriteriaChange}
          >
            <option value="">-- Select Location --</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Workout Type: </label>
          <select
            name="preferredWorkoutType"
            value={searchCriteria.preferredWorkoutType}
            onChange={handleCriteriaChange}
          >
            <option value="">-- Select Workout Type --</option>
            {workoutTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Available Time: </label>
          <select
            name="availableTime"
            value={searchCriteria.availableTime}
            onChange={handleCriteriaChange}
          >
            <option value="">-- Select Time --</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Experience Level: </label>
          <select
            name="experienceLevel"
            value={searchCriteria.experienceLevel}
            onChange={handleCriteriaChange}
          >
            <option value="">-- Select Experience Level --</option>
            {experienceOptions.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Search</button>
      </form>

      <h3>Search Results:</h3>
      {results.length === 0 ? (
        <p>No matching partners found.</p>
      ) : (
        <ul>
          {results.map((profile) => (
            <li key={profile._id}>
              {profile.user?.username || "Anonymous"} - {profile.location} -{" "}
              {profile.preferredWorkoutType}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MateFinderPage;
