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
      .then((res) => setSessions(res.data))
      .catch(console.error);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/comments`)
      .then((res) => setComments(res.data))
      .catch(console.error);
  }, []);

  const handleNewCommentChange = (id, value) =>
    setNewCommentTexts((prev) => ({ ...prev, [id]: value }));

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
                  sx={{ mb: 1, color: "#fff" }}
                >
                  {comment.commentContent}
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
                  InputLabelProps={{ style: { color: "#fff" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#fff" },
                      "&:hover fieldset": { borderColor: "#fff" },
                      "&.Mui-focused fieldset": { borderColor: "#fff" },
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
