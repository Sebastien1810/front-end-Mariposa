import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
      .then((res) => setSessions(res.data));
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/comments`)
      .then((res) => setComments(res.data));
  }, []);

  const handleNewCommentChange = (id, text) =>
    setNewCommentTexts((prev) => ({ ...prev, [id]: text }));

  const handleCreateComment = async (e, sessionId) => {
    e.preventDefault();
    if (!currentUser) return;
    await axios.post(`${import.meta.env.VITE_API_URL}/api/Comment`, {
      content: newCommentTexts[sessionId],
      gymSession: sessionId,
      createdBy: currentUser._id,
    });
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/comments`
    );
    setComments(data);
    setNewCommentTexts((prev) => ({ ...prev, [sessionId]: "" }));
  };

  const handleDeleteComment = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/Comment/${id}`);
    setComments((prev) => prev.filter((c) => c._id !== id));
  };

  const startEditingComment = (id, content) => {
    setEditingCommentId(id);
    setEditingCommentText(content);
  };

  const handleUpdateComment = async (e, id) => {
    e.preventDefault();
    await axios.put(`${import.meta.env.VITE_API_URL}/api/Comment/${id}`, {
      commentContent: editingCommentText,
    });
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/comments`
    );
    setComments(data);
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ color: "#fff", mb: 3 }}>
        Sessions & Comments
      </Typography>

      {sessions.map((session) => (
        <Box key={session._id} sx={{ border: "1px solid #fff", p: 2, mb: 4 }}>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            {session.location} — {session.typeOfWorkout}
          </Typography>

          <Box component="ul" sx={{ listStyle: "none", p: 0, my: 2 }}>
            {comments
              .filter((c) => c.gymSession?._id === session._id)
              .map((comment) => (
                <Box
                  component="li"
                  key={comment._id}
                  sx={{ mb: 2, color: "#fff" }}
                >
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
                        <Button type="submit" sx={{ color: "#fff" }}>
                          Save
                        </Button>
                        <Button
                          onClick={() => setEditingCommentId(null)}
                          sx={{ color: "#fff" }}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </form>
                  ) : (
                    <>
                      <Typography>{comment.commentContent}</Typography>
                      {currentUser?._id === comment.user && (
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          <Button
                            size="small"
                            onClick={() =>
                              startEditingComment(
                                comment._id,
                                comment.commentContent
                              )
                            }
                            sx={{ color: "#fff" }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            onClick={() => handleDeleteComment(comment._id)}
                            sx={{ color: "#fff" }}
                          >
                            Delete
                          </Button>
                        </Stack>
                      )}
                    </>
                  )}
                </Box>
              ))}
          </Box>

          {currentUser && (
            <Box
              component="form"
              onSubmit={(e) => handleCreateComment(e, session._id)}
            >
              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  placeholder="Add a comment"
                  value={newCommentTexts[session._id] || ""}
                  onChange={(e) =>
                    handleNewCommentChange(session._id, e.target.value)
                  }
                  required
                  sx={{
                    "& .MuiOutlinedInput-root fieldset": {
                      borderColor: "#fff",
                    },
                    "& .MuiInputBase-input": { color: "#fff" },
                  }}
                />
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    color: "#fff",
                    borderColor: "#000",
                    bgcolor: "transparent",
                    "&:hover": { bgcolor: "#000", borderColor: "#000" },
                  }}
                >
                  Post Comment
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default CommentsSection;
