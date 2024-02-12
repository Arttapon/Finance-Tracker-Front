// src/layout/HomeScreen.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/pic/Logo.jpg";

function HomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cyan-400 text-white">
      <img src={logo} alt="Logo" className="mb-8" style={{ maxHeight: "100px" }} />
      <div className="max-w-md w-full rounded-lg overflow-hidden text-center">
        <div className="text-xl font-itim text-black">
          Welcome to Finance Tracker
        </div>
        <div className="p-6 text-black font-itim">
          <p>Track your finances easily with our app!</p>
        </div>
      </div>
      <Link to="/login" className="mt-8 bg-blue-800 text-white font-bold py-2 px-4 rounded">
        Start
      </Link>
    </div>
  );
}

export default HomeScreen;


