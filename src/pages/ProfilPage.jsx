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

  // Récupération de tous les commentaires
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

  // Définition des listes d'options pour les menus déroulants
  const levels = ["beginner", "intermediate", "expert"];
  const favoriteTimes = ["morning", "afternoon", "evening"];
  const gymSessionOptions = [
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

  // États pour stocker les sélections de l'utilisateur pour le matefinder
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedGymSession, setSelectedGymSession] = useState("");

  const handleMatefinderSubmit = (e) => {
    e.preventDefault();
    console.log("Matefinder Preferences:", {
      level: selectedLevel,
      time: selectedTime,
      gymSession: selectedGymSession,
    });
    localStorage.setItem("level", selectedLevel);
    localStorage.setItem("favoriteTime", selectedTime);
    localStorage.setItem("gymSessionPreference", selectedGymSession);
    alert("Preferences saved locally!");
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

      {/* Formulaire pour les préférences matefinder */}
      <h2>Matefinder Preferences</h2>
      <form onSubmit={handleMatefinderSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Niveau :{" "}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">-- Choisir un niveau --</option>
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Moment préféré :{" "}
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">-- Choisir un moment --</option>
              {favoriteTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Type de séance :{" "}
            <select
              value={selectedGymSession}
              onChange={(e) => setSelectedGymSession(e.target.value)}
            >
              <option value="">-- Choisir une séance --</option>
              {gymSessionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default ProfilPage;
