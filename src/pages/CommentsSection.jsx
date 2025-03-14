// pages/CommentsSection.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function CommentsSection() {
  const { user: currentUser } = useContext(AuthContext);

  const [sessions, setSessions] = useState([]);
  const [comments, setComments] = useState([]);
  const [newCommentTexts, setNewCommentTexts] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/gymSessions`)
      .then((response) => setSessions(response.data))
      .catch((error) => console.error("Error fetching sessions:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handleNewCommentChange = (sessionId, text) => {
    setNewCommentTexts((prev) => ({ ...prev, [sessionId]: text }));
  };

  const handleCreateComment = (e, sessionId) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("User not authenticated");
      return;
    }

    const commentData = {
      content: newCommentTexts[sessionId],
      gymSession: sessionId,
      createdBy: currentUser._id,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/Comment`, commentData)
      .then((response) => {
        setComments((prev) => [...prev, response.data]);
        setNewCommentTexts((prev) => ({ ...prev, [sessionId]: "" }));
      })
      .catch((error) => console.error("Error creating comment:", error));
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/Comment/${commentId}`)
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
      .put(`${import.meta.env.VITE_API_URL}/api/Comment/${commentId}`, {
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

  return (
    <div>
      <h2>All Sessions and Their Comments</h2>
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
                      {currentUser && currentUser._id === comment.user && (
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
    </div>
  );
}

export default CommentsSection;
