// pages/ProfilPage.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

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
        .get(`${import.meta.env.VITE_API_URL}/gymSessions`)
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
      .get(`${import.meta.env.VITE_API_URL}/comments`)
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
      .post(`${import.meta.env.VITE_API_URL}/Comment`, commentData)
      .then((response) => {
        setComments((prev) => [...prev, response.data]);
        setNewCommentTexts((prev) => ({ ...prev, [sessionId]: "" }));
      })
      .catch((error) => console.error("Error creating comment:", error));
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/Comment/${commentId}`)
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
      .put(`${import.meta.env.VITE_API_URL}/Comment/${commentId}`, {
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

  // Utilisation des mêmes listes d'options que sur MateFinderPage
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

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedWorkoutType, setSelectedWorkoutType] = useState("");
  const [selectedAvailableTime, setSelectedAvailableTime] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  const handleMatefinderSubmit = (e) => {
    e.preventDefault();
    console.log("Matefinder Preferences:", {
      location: selectedLocation,
      preferredWorkoutType: selectedWorkoutType,
      availableTime: selectedAvailableTime,
      experienceLevel: selectedExperience,
    });

    localStorage.setItem("location", selectedLocation);
    localStorage.setItem("preferredWorkoutType", selectedWorkoutType);
    localStorage.setItem("availableTime", selectedAvailableTime);
    localStorage.setItem("experienceLevel", selectedExperience);
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

      <h2>Matefinder Preferences</h2>
      <form onSubmit={handleMatefinderSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Location:{" "}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
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
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
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
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
}

export default ProfilPage;
