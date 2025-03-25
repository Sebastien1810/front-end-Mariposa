import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import GymsessionPage from "./pages/GymsessionPage";
import Homepage from "./pages/Homepage";
import ProfilPage from "./pages/ProfilPage";
import CommentsSection from "./pages/CommentsSection";
import "./App.css";
import MateFinderPage from "./pages/MateFinderPage";
import DetailsGymSession from "./pages/DetailsGymSession";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/profil"
          element={
            <IsPrivate>
              <ProfilPage />
            </IsPrivate>
          }
        />
        <Route
          path="/gymsession"
          element={
            <IsPrivate>
              <GymsessionPage />
            </IsPrivate>
          }
        />
        <Route
          path="/CommentPage"
          element={
            <IsPrivate>
              <CommentsSection />
            </IsPrivate>
          }
        />
        <Route
          path="/matefinder"
          element={
            <IsPrivate>
              <MateFinderPage />
            </IsPrivate>
          }
        />
        <Route
          path="/DetailGymsessionPage"
          element={
            <IsPrivate>
              <DetailsGymSession />
            </IsPrivate>
          }
        />
      </Routes>
    </>
  );
}

export default App;
