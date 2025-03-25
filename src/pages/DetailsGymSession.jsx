// pages/DetailsGymSession.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

const workoutInstructions = {
  "Treadmill (Intervals, Incline Walking, Endurance Run)": `
⏳ Duration: 60 min
Warm‑up (10 min): Walk at a moderate pace (5 min), Light jog (5 min)
Main Workout (40 min):
 • Intervals: 1 min sprint → 2 min jog (repeat 8–10)
 • Incline Walking: 12% incline, steady walk (10 min)
 • Endurance Run: Maintain steady pace (10–15 min)
Cool‑down (10 min): Slow walk (5 min), Full‑body stretch (5 min)
`,
  "Elliptical (Steady State, Interval Training)": `
⏳ Duration: 60 min
Warm‑up (10 min): Low resistance pedaling (5 min), Increase intensity (5 min)
Main Workout (40 min):
 • Steady State: Moderate resistance, continuous effort (15 min)
 • Intervals: 1 min high resistance → 2 min low (repeat 10)
 • Endurance: Low resistance, steady pace (10 min)
Cool‑down (10 min): Decrease resistance & speed (5 min), Stretch (5 min)
`,
  "Stationary Bike (Spin Class, Steady Pedal)": `
⏳ Duration: 60 min
Warm‑up (10 min): Light pedaling (5 min), Increase resistance (5 min)
Main Workout (40 min):
 • Spin Intervals: 30s sprint → 1min moderate (repeat 12)
 • Hill Climbs: High resistance pedaling (10 min)
 • Steady Pedal: 80–90 RPM (15 min)
Cool‑down (10 min): Slow pedaling (5 min), Leg & hip stretches (5 min)
`,
  "Rowing Machine (Interval Rowing, Continuous Endurance)": `
⏳ Duration: 60 min
Warm‑up (10 min): Light rowing (5 min), Increase stroke rate (5 min)
Main Workout (40 min):
 • Intervals: 30s high intensity → 1min slow row (repeat 10)
 • Endurance Rowing: Steady strokes (20 min)
Cool‑down (10 min): Slow rowing (5 min), Shoulder & back stretches (5 min)
`,
  "Stair Climber (Consistent Pace, HIIT)": `
⏳ Duration: 60 min
Warm‑up (10 min): Light stair climbing
Main Workout (40 min):
 • Steady State: 20 min moderate pace
 • HIIT: 1min fast → 2min slow (repeat 10)
Cool‑down (10 min): Walk flat, Stretch calves & hamstrings
`,
  "HIIT Classes (Burpees, Jumping Jacks, Sprints)": `
⏳ Duration: 60 min
Warm‑up (10 min): Dynamic stretching & light cardio
Main Workout (40 min, 3 rounds):
 • Burpees: 30s
 • Jumping Jacks: 30s
 • Sprints: 15s max
 • Rest: 45s
Cool‑down (10 min): Walk & deep breathing, Stretching
`,
  "Free Weight Training (Bench Press, Squats, Deadlifts, Overhead Press)": `
⏳ Duration: 60 min
Warm‑up (10 min): Bodyweight squats, push‑ups, shoulder rotations
Main Workout (40 min, 3 sets):
 • Bench Press: 10–12 reps
 • Squats: 10 reps
 • Deadlifts: 8 reps
 • Overhead Press: 10 reps
 • Core: Planks & leg raises
Cool‑down (10 min): Full‑body stretching
`,
  "Machine Workouts (Leg Press, Chest Press, Lat Pulldown)": `
⏳ Duration: 60 min
Warm‑up (10 min): Light resistance training
Main Workout (40 min, 3 sets):
 • Leg Press: 12 reps
 • Chest Press: 10 reps
 • Lat Pulldown: 10 reps
 • Leg Extensions & Curls: 10 reps
 • Ab Machine: 10 reps
Cool‑down (10 min): Stretch & foam rolling
`,
  "Yoga & Pilates Classes": `
⏳ Duration: 60 min
Warm‑up (10 min): Deep breathing & sun salutations
Main Workout (40 min):
 • Hatha Yoga: Controlled poses
 • Vinyasa Flow: Smooth transitions
Cool‑down (10 min): Relaxation & meditation
`,
  "TRX Suspension Training (Suspension Exercises, Core Strengthening)": `
⏳ Duration: 60 min
Warm‑up (10 min): Bodyweight warm‑up
Main Workout (40 min, 3 sets):
 • TRX Squats: 10 reps
 • TRX Rows: 12 reps
 • TRX Plank: 30s
Cool‑down (10 min): Stretching
`,
  "Balance & Agility Drills": `
⏳ Duration: 60 min
Warm‑up (10 min): Light jogging & jump rope
Main Workout (40 min, 3 rounds):
 • BOSU Ball Squats: 12 reps
 • Balance Board Holds: 30s
 • Agility Ladder Drills
Cool‑down (10 min): Stretch & deep breathing
`,
};

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
              {session.typeOfWorkout}
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
              {workoutInstructions[session.typeOfWorkout] ||
                "No instructions available."}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
