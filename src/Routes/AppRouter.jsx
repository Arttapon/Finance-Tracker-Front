import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from "../layout/HomeScreen";
import LoginForm from "../layout/LoginForm";
import RegisterForm from "../layout/RegisterForm";
import FinancePlan from '../components/FinancePlan'; 
import BudgetPage from "../components/ฺBudget";
import GetUser from "../components/MainPage";
import AddBudget from '../components/AddBudget';
import DataSharing from "../components/DataSharing";
import CreatePlan from "../components/CreatePlan";
import Settings from "../components/Settings";
import DepositPlan from "../components/DepositPlan";
import EditPlan from "../components/EditPlan";
import Spend from "../components/Spend"


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/main" element={<GetUser/>} />
        {/* <Route exact path="/" component={MainPage} /> */}
        <Route path="/financial-plan" element={<FinancePlan />} />
        <Route path="/financial-plan/CreatePlan" element={<CreatePlan />} />
        <Route path="/Budget" element={<BudgetPage />} />
        <Route path="/AddBudget" element={<AddBudget />} />
        <Route path="/DataSharing" element={<DataSharing />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/deposit/:id" element={<DepositPlan />} />
        <Route path="/edit/:id" element={<EditPlan />} />
        <Route path="/spend/:id" element={<Spend />} />
        {/* เพิ่มเส้นทางอื่น ๆ ตามต้องการ */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
