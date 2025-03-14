// pages/ProfilPage.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005/api";

function ProfilPage() {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [comments, setComments] = useState([]);
  const [newCommentTexts, setNewCommentTexts] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  // Nouveau state pour les profils MateFinder trouvés
  const [matefinderProfiles, setMatefinderProfiles] = useState([]);

  // Récupération des sessions de l'utilisateur
  useEffect(() => {
    if (user) {
      axios
        .get(`${API_URL}/gymSessions`)
        .then((response) => {
          const userSessions = response.data.filter(
            (session) => session.creator === user._id
          );
          setSessions(userSessions);
        })
        .catch((error) =>
          console.error("Error fetching user sessions:", error)
        );
    }
  }, [user]);

  // Récupération des commentaires
  useEffect(() => {
    axios
      .get(`${API_URL}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handleNewCommentChange = (sessionId, text) => {
    setNewCommentTexts((prev) => ({ ...prev, [sessionId]: text }));
  };

  const handleCreateComment = (e, sessionId) => {
    e.preventDefault();
    const commentData = {
      content: newCommentTexts[sessionId],
      gymSession: sessionId,
      createdBy: user._id,
    };

    axios
      .post(`${API_URL}/Comment`, commentData)
      .then((response) => {
        setComments((prev) => [...prev, response.data]);
        setNewCommentTexts((prev) => ({ ...prev, [sessionId]: "" }));
      })
      .catch((error) => console.error("Error creating comment:", error));
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`${API_URL}/Comment/${commentId}`)
      .then(() => {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
      })
      .catch((error) => console.error("Error deleting comment:", error));
  };

  const startEditingComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditingCommentText(currentContent);
  };

  const handleUpdateComment = (e, commentId) => {
    e.preventDefault();
    axios
      .put(`${API_URL}/Comment/${commentId}`, {
        commentContent: editingCommentText,
      })
      .then((response) => {
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId ? response.data : comment
          )
        );
        setEditingCommentId(null);
        setEditingCommentText("");
      })
      .catch((error) => console.error("Error updating comment:", error));
  };

  // Options pour les menus déroulants MateFinder
  const locationOptions = ["Paris", "Marseille", "Lyon", "Bordeaux", "Nice"];
  // Ici, on simplifie le choix du type de workout avec quelques catégories.
  const workoutTypeOptions = [
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
  const timeOptions = ["Morning", "Afternoon", "Evening"];
  const experienceOptions = ["Beginner", "Intermediate", "Expert"];

  // Modification des noms de variables pour correspondre aux champs de la BDD (firstName, workoutType, availableTime, level)
  const [selectedFirstName, setSelectedFirstName] = useState(
    user.username || ""
  );
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("");
  const [selectedAvailableTime, setSelectedAvailableTime] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  // Handle submission for MateFinder preferences
  const handleMatefinderSubmit = (e) => {
    e.preventDefault();
    const matefinderProfile = {
      firstName: selectedFirstName,
      location: selectedLocation,
      workoutType: selectedWorkoutType,
      availableTime: selectedAvailableTime,
      level: selectedLevel,
    };

    // Envoi du profil vers le back-end
    axios
      .post(`${API_URL}/matefinder/profile`, matefinderProfile)
      .then((response) => {
        console.log("MateFinder profile created:", response.data);
        // Rechercher les profils correspondants avec les mêmes critères
        axios
          .get(`${API_URL}/matefinder`, {
            params: {
              location: selectedLocation,
              workoutType: selectedWorkoutType,
              availableTime: selectedAvailableTime,
              level: selectedLevel,
            },
          })
          .then((res) => {
            setMatefinderProfiles(res.data);
          })
          .catch((err) =>
            console.error("Error fetching matching MateFinder profiles:", err)
          );
      })
      .catch((error) =>
        console.error("Error creating MateFinder profile:", error)
      );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Sessions and Their Comments</h2>
      {sessions.length === 0 && <p>No sessions created by you.</p>}
      {sessions.map((session) => (
        <div
          key={session._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>
            {session.location} - {session.typeOfWorkout}
          </h3>
          <h4>Comments:</h4>
          <ul>
            {comments
              .filter(
                (comment) =>
                  comment.gymSession && comment.gymSession._id === session._id
              )
              .map((comment) => (
                <li key={comment._id}>
                  {editingCommentId === comment._id ? (
                    <form onSubmit={(e) => handleUpdateComment(e, comment._id)}>
                      <input
                        type="text"
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                        required
                      />
                      <button type="submit">Save</button>
                      <button
                        type="button"
                        onClick={() => setEditingCommentId(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <span>{comment.commentContent}</span>
                      {user &&
                        comment.user &&
                        user._id === comment.user._id && (
                          <>
                            <button
                              onClick={() =>
                                startEditingComment(
                                  comment._id,
                                  comment.commentContent
                                )
                              }
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                    </>
                  )}
                </li>
              ))}
          </ul>
          <form onSubmit={(e) => handleCreateComment(e, session._id)}>
            <input
              type="text"
              placeholder="Add a comment"
              value={newCommentTexts[session._id] || ""}
              onChange={(e) =>
                handleNewCommentChange(session._id, e.target.value)
              }
              required
            />
            <button type="submit">Post Comment</button>
          </form>
        </div>
      ))}

      <hr />

      <h2>MateFinder Preferences</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>Your Username (First Name): </label>
        <input
          type="text"
          value={selectedFirstName}
          onChange={(e) => setSelectedFirstName(e.target.value)}
        />
      </div>
      <form onSubmit={handleMatefinderSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Location:{" "}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              required
            >
              <option value="">-- Select Location --</option>
              {locationOptions.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Workout Type:{" "}
            <select
              value={selectedWorkoutType}
              onChange={(e) => setSelectedWorkoutType(e.target.value)}
              required
            >
              <option value="">-- Select Workout Type --</option>
              {workoutTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Available Time:{" "}
            <select
              value={selectedAvailableTime}
              onChange={(e) => setSelectedAvailableTime(e.target.value)}
              required
            >
              <option value="">-- Select Time --</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Experience Level:{" "}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              required
            >
              <option value="">-- Select Experience Level --</option>
              {experienceOptions.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Save Preferences & Find Matches</button>
      </form>

      {/* Affichage des profils MateFinder correspondants */}
      <hr />
      <h3>Matching MateFinder Profiles</h3>
      {matefinderProfiles.length === 0 ? (
        <p>No matching profiles found.</p>
      ) : (
        matefinderProfiles.map((profile) => (
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

export default ProfilPage;
