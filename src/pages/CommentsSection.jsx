// pages/CommentsSection.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CommentsSection() {
  const { user: currentUser } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [comments, setComments] = useState([]);
  const [newCommentTexts, setNewCommentTexts] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/gymSessions`)
      .then((res) => setSessions(res.data));
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/comments`)
      .then((res) => setComments(res.data));
  }, []);

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
      });
  };

  const handleDeleteComment = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/Comment/${id}`)
      .then(() => setComments((c) => c.filter((x) => x._id !== id)));
  };

  const startEditing = (id, text) => {
    setNewCommentTexts({ [id]: text });
  };

  const handleUpdateComment = (e, id) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/Comment/${id}`, {
        content: newCommentTexts[id],
      })
      .then((res) => {
        setComments((c) => c.map((x) => (x._id === id ? res.data : x)));
        setNewCommentTexts({});
      });
  };

  return (
    <div>
      <h2>All Sessions and Their Comments</h2>
      {sessions.map((s) => (
        <Box key={s._id} sx={{ border: "1px solid #ccc", m: 1, p: 2 }}>
          <h3>
            {s.location} — {s.typeOfWorkout}
          </h3>
          <ul>
            {comments
              .filter((c) => c.gymSession?._id === s._id)
              .map((c) => (
                <li key={c._id}>
                  {newCommentTexts[c._id] != null ? (
                    <form onSubmit={(e) => handleUpdateComment(e, c._id)}>
                      <TextField
                        value={newCommentTexts[c._id]}
                        onChange={(e) =>
                          setNewCommentTexts({ [c._id]: e.target.value })
                        }
                        size="small"
                      />
                      <Button type="submit">Save</Button>
                    </form>
                  ) : (
                    <>
                      <span>{c.content}</span>
                      {currentUser?._id === c.createdBy?._id && (
                        <>
                          <Button
                            onClick={() => startEditing(c._id, c.content)}
                          >
                            Edit
                          </Button>
                          <Button onClick={() => handleDeleteComment(c._id)}>
                            Delete
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </li>
              ))}
          </ul>
          {currentUser && (
            <form onSubmit={(e) => handleCreateComment(e, s._id)}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  placeholder="Add a comment"
                  value={newCommentTexts[s._id] || ""}
                  onChange={(e) =>
                    setNewCommentTexts((prev) => ({
                      ...prev,
                      [s._id]: e.target.value,
                    }))
                  }
                  size="small"
                />
                <Button variant="outlined" type="submit">
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
