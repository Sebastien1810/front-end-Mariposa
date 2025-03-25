// pages/DetailsGymSession.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

export default function DetailsGymSession() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/gymSessions`)
      .then((res) => setSessions(res.data))
      .catch(console.error);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ color: "#fff", mb: 3 }}>
        All Gym Sessions
      </Typography>

      {sessions.map((session) => (
        <Accordion
          key={session._id}
          sx={{ bgcolor: "transparent", border: "1px solid #555", mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
            sx={{ borderBottom: "1px solid #444" }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 600 }}>
              {session.location}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography
              sx={{
                color: "#C7D9DD",
                whiteSpace: "pre-line",
                fontFamily: "cursive",
              }}
            >
              <strong>Workout:</strong> {session.typeOfWorkout}
              {"\n"}
              <strong>Preferred Time:</strong> {session.favoriteTimeforWorkout}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
