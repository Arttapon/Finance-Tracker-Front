import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from "../layout/HomeScreen";
import LoginForm from "../layout/LoginForm";
import RegisterForm from "../layout/RegisterForm";
import MainPage from '../components/mainpage';
import FinancePlan from '../components/FinancePlan'; 

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/main" element={<MainPage />} />
        <Route exact path="/" component={MainPage} />
        <Route path="/finance-plan" element={<FinancePlan />} /> {/* แก้ไขตรงนี้เพื่อเพิ่ม Element ของ FinancePlan */}
        {/* เพิ่มเส้นทางอื่น ๆ ตามต้องการ */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
