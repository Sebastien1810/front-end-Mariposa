import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import React from "react";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

import "./App.css";
import GymsessionPage from "./pages/GymsessionPage";

function App() {
  return (
    <>
      <Navbar />;
      <Routes>
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
          path="/GymsessionPage"
          element={
            <IsPrivate>
              <GymsessionPage />
            </IsPrivate>
          }
        />
      </Routes>
    </>
  );
}

export default App;
