// src/pages/MateFinderPage.jsx
import React, { useState } from "react";
import axios from "axios";

// All comments are in French, code in English
const API_URL = "http://localhost:5005/api";

function MateFinderPage() {
  // State variables for the form
  const [firstName, setFirstName] = useState("");
  const [location, setLocation] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [level, setLevel] = useState("");

  // State for storing matching profiles
  const [matchingProfiles, setMatchingProfiles] = useState([]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new profile via POST
    axios
      .post("/api/matefinder/profile", {
        firstName,
        location,
        workoutType,
        availableTime,
        level,
      })
      .then((response) => {
        console.log("Profile created:", response.data);

        // Once created, fetch matching profiles via GET
        axios
          .get("/api/matefinder", {
            params: { location, workoutType, availableTime, level },
          })
          .then((res) => {
            setMatchingProfiles(res.data);
          })
          .catch((err) => {
            console.error("Error fetching matching profiles:", err);
          });
      })
      .catch((err) => {
        console.error("Error creating profile:", err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>MateFinder Page</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div>
          <label>First Name: </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label>Location: </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="">--Select Location--</option>
            <option value="Paris">Paris</option>
            <option value="Lyon">Lyon</option>
            <option value="Marseille">Marseille</option>
          </select>
        </div>

        {/* Workout Type */}
        <div>
          <label>Workout Type: </label>
          <select
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
            required
          >
            <option value="">--Select Workout Type--</option>
            {/* Cardio */}
            <optgroup label="Cardio">
              <option value="Treadmill (Intervals, Incline Walking, Endurance Run)">
                Treadmill (Intervals, Incline Walking, Endurance Run)
              </option>
              <option value="Elliptical (Steady State, Interval Training)">
                Elliptical (Steady State, Interval Training)
              </option>
              <option value="Stationary Bike (Spin Class, Steady Pedal)">
                Stationary Bike (Spin Class, Steady Pedal)
              </option>
              <option value="Rowing Machine (Interval Rowing, Continuous Endurance)">
                Rowing Machine (Interval Rowing, Continuous Endurance)
              </option>
              <option value="Stair Climber (Consistent Pace, HIIT)">
                Stair Climber (Consistent Pace, HIIT)
              </option>
              <option value="HIIT Classes (Burpees, Jumping Jacks, Sprints)">
                HIIT Classes (Burpees, Jumping Jacks, Sprints)
              </option>
            </optgroup>

            {/* Strength */}
            <optgroup label="Strength">
              <option value="Free Weight Training (Bench Press, Squats, Deadlifts, Overhead Press)">
                Free Weight Training (Bench Press, Squats, Deadlifts, Overhead
                Press)
              </option>
              <option value="Machine Workouts (Leg Press, Chest Press, Lat Pulldown)">
                Machine Workouts (Leg Press, Chest Press, Lat Pulldown)
              </option>
              <option value="Kettlebell Workouts (Swings, Cleans, Goblet Squats)">
                Kettlebell Workouts (Swings, Cleans, Goblet Squats)
              </option>
              <option value="Bodyweight Circuits (Push-ups, Pull-ups, Dips, Lunges, Planks)">
                Bodyweight Circuits (Push-ups, Pull-ups, Dips, Lunges, Planks)
              </option>
              <option value="TRX Suspension Training (Suspension Exercises, Core Strengthening)">
                TRX Suspension Training (Suspension Exercises, Core
                Strengthening)
              </option>
              <option value="Resistance Band Sessions (Band Rows, Curls, Leg Workouts)">
                Resistance Band Sessions (Band Rows, Curls, Leg Workouts)
              </option>
            </optgroup>

            {/* Flexibility */}
            <optgroup label="Flexibility">
              <option value="Yoga Classes (Hatha, Vinyasa)">
                Yoga Classes (Hatha, Vinyasa)
              </option>
              <option value="Pilates Classes (Core Strengthening, Stretching)">
                Pilates Classes (Core Strengthening, Stretching)
              </option>
              <option value="Dynamic Stretching (Movement-Based Warm-Up)">
                Dynamic Stretching (Movement-Based Warm-Up)
              </option>
              <option value="Static Stretching (Cool-Down Routines, Major Muscle Groups)">
                Static Stretching (Cool-Down Routines, Major Muscle Groups)
              </option>
              <option value="Foam Rolling/Mobility (Self-Myofascial Release, Mobility Exercises)">
                Foam Rolling/Mobility (Self-Myofascial Release, Mobility
                Exercises)
              </option>
            </optgroup>

            {/* Balance */}
            <optgroup label="Balance">
              <option value="Stability Ball Workouts (Ball Squats, Planks, Core Drills)">
                Stability Ball Workouts (Ball Squats, Planks, Core Drills)
              </option>
              <option value="BOSU Ball Training (Squats, Push-ups, Lunges)">
                BOSU Ball Training (Squats, Push-ups, Lunges)
              </option>
              <option value="Balance Board Exercises (Single-Leg Balance, Proprioception Drills)">
                Balance Board Exercises (Single-Leg Balance, Proprioception
                Drills)
              </option>
              <option value="Single-Leg Drills (Unilateral Strength, Stability Exercises)">
                Single-Leg Drills (Unilateral Strength, Stability Exercises)
              </option>
              <option value="Agility Ladder Drills (Quick Feet, Coordination Exercises)">
                Agility Ladder Drills (Quick Feet, Coordination Exercises)
              </option>
            </optgroup>
          </select>
        </div>

        {/* Available Time */}
        <div>
          <label>Available Time: </label>
          <select
            value={availableTime}
            onChange={(e) => setAvailableTime(e.target.value)}
            required
          >
            <option value="">--Select Time--</option>
            <option value="Morning">Morning</option>
            <option value="Midday">Midday</option>
            <option value="Evening">Evening</option>
          </select>
        </div>

        {/* Level */}
        <div>
          <label>Level: </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="">--Select Level--</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <button type="submit">Create Profile</button>
      </form>

      <h3>Matching Profiles</h3>
      {matchingProfiles.length === 0 ? (
        <p>No matching profiles found.</p>
      ) : (
        matchingProfiles.map((profile) => (
          <div
            key={profile._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>
              <strong>{profile.firstName}</strong> - {profile.location} -{" "}
              {profile.workoutType} - {profile.availableTime} - {profile.level}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MateFinderPage;
