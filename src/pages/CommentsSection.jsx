// pages/CommentsSection.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
      .then((res) => setSessions(res.data))
      .catch(console.error);

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/comments`)
      .then((res) => setComments(res.data))
      .catch(console.error);
  }, []);

  const handleNewCommentChange = (sessionId, text) =>
    setNewCommentTexts((prev) => ({ ...prev, [sessionId]: text }));

  const handleCreateComment = (e, sessionId) => {
    e.preventDefault();
    if (!currentUser) return;

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/Comment`, {
        content: newCommentTexts[sessionId],
        gymSession: sessionId,
        createdBy: currentUser._id,
      })
      .then(() => axios.get(`${import.meta.env.VITE_API_URL}/api/comments`))
      .then((res) => {
        setComments(res.data);
        setNewCommentTexts((prev) => ({ ...prev, [sessionId]: "" }));
      })
      .catch(console.error);
  };

  const handleDeleteComment = (commentId) =>
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/Comment/${commentId}`)
      .then(() =>
        setComments((prev) => prev.filter((c) => c._id !== commentId))
      )
      .catch(console.error);

  const startEditingComment = (id, content) => {
    setEditingCommentId(id);
    setEditingCommentText(content);
  };

  const handleUpdateComment = (e, id) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/Comment/${id}`, {
        content: editingCommentText,
      })
      .then((res) => {
        setComments((prev) => prev.map((c) => (c._id === id ? res.data : c)));
        setEditingCommentId(null);
        setEditingCommentText("");
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>All Sessions and Their Comments</h2>
      {sessions.map((session) => (
        <Box key={session._id} sx={{ border: "1px solid #ccc", m: 1, p: 2 }}>
          <h3>
            {session.location} — {session.typeOfWorkout}
          </h3>
          <h4>Comments:</h4>
          <ul>
            {comments
              .filter((c) => c.gymSession?._id === session._id)
              .map((comment) => (
                <li key={comment._id}>
                  {editingCommentId === comment._id ? (
                    <form onSubmit={(e) => handleUpdateComment(e, comment._id)}>
                      <TextField
                        fullWidth
                        value={editingCommentText}
                        onChange={(e) => setEditingCommentText(e.target.value)}
                        required
                        sx={{ mb: 1 }}
                      />
                      <Stack direction="row" spacing={1}>
                        <Button type="submit">Save</Button>
                        <Button onClick={() => setEditingCommentId(null)}>
                          Cancel
                        </Button>
                      </Stack>
                    </form>
                  ) : (
                    <>
                      <span>{comment.commentContent}</span>
                      {currentUser?._id === comment.createdBy?._id && (
                        <Stack direction="row" spacing={1}>
                          <Button
                            onClick={() =>
                              startEditingComment(
                                comment._id,
                                comment.commentContent
                              )
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      )}
                    </>
                  )}
                </li>
              ))}
          </ul>

          {currentUser && (
            <form onSubmit={(e) => handleCreateComment(e, session._id)}>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Add a comment"
                  value={newCommentTexts[session._id] || ""}
                  onChange={(e) =>
                    handleNewCommentChange(session._id, e.target.value)
                  }
                  required
                />
                <Button variant="outlined" type="submit" sx={{ ml: 2 }}>
                  Post Comment
                </Button>
              </Box>
            </form>
          )}
        </Box>
      ))}
    </div>
  );
}

export default CommentsSection;
