// pages/DetailsGymSession.jsx
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const sessionsData = [
  {
    title: "Treadmill (Intervals, Incline Walking, Endurance Run)",
    details: `⏳ Duration: 60 min
Warm‑up (10 min): Moderate walk → light jog
Main (40 min): 1min sprint → 2min jog × 8–10, 12% incline walk (10 min), steady run (10–15 min)
Cool‑down (10 min): Slow walk + stretch`,
  },
  {
    title: "Elliptical (Steady State, Interval Training)",
    details: `⏳ Duration: 60 min
Warm‑up (10 min): Low resistance pedaling
Main (40 min): Steady state (15 min), intervals 1min high→2min low ×10, endurance (10 min)
Cool‑down (10 min): Light pedaling + stretch`,
  },
  {
    title: "Stationary Bike (Spin Class, Steady Pedal)",
    details: `⏳ Duration: 60 min
Warm‑up (10 min): Light pedaling
Main (40 min): Spin intervals 30s sprint→1min moderate ×12, hill climbs (10 min), steady RPM (15 min)
Cool‑down (10 min): Slow pedaling + stretch`,
  },
  // Ajoute les autres séances ici...
];

export default function DetailsGymSession() {
  return (
    <div style={{ margin: 20 }}>
      <Typography variant="h4" sx={{ color: "#fff", mb: 3 }}>
        Choose a Gym Session
      </Typography>

      {sessionsData.map((session, i) => (
        <Accordion
          key={i}
          sx={{ bgcolor: "transparent", border: "1px solid #555", mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
            sx={{ borderBottom: "1px solid #444" }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 600 }}>
              {session.title}
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
              {session.details}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
