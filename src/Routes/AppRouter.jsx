import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from "../layout/HomeScreen";
import LoginForm from "../layout/LoginForm";
import RegisterForm from "../layout/RegisterForm";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* เพิ่มเส้นทางอื่น ๆ ตามต้องการ */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;




