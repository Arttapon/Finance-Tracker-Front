import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext'; // Import AuthContext

function FinancePlan() {
  const { user } = useContext(AuthContext); // Get user from context
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const getPlans = async () => {
      try {
        if (!user) return;
        const id = user.id;
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:6969/FinancialPlan/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPlans(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPlans();
  }, [user]);

  const handleDeletePlan = async (planId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:6969/FinancialPlan/${planId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Remove the deleted plan from the state
      setPlans(plans.filter(plan => plan.id !== planId));
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-cyan-200">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 py-8 px-4">
        {/* Logo Profile */}
        <div className="flex flex-col items-center justify-center mb-8">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Logo" className="w-16 h-16 rounded-full mb-2" />
          <span className="text-sm">{user ? user.username : 'Guest'}</span>
        </div>
        <hr />
        <br />
        {/* Menu */}
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/main" className="block py-2 px-4 text-sm hover:bg-gray-700">Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link to="/settings" className="block py-2 px-4 text-sm hover:bg-gray-700">Settings</Link>
            </li>
            <hr />
            <li className="mb-2 justify-b">
              <Link to="/login" className="block py-2 px-4 text-sm hover:bg-red-700">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Financial Plan</h1>

        {/* Display user's main financial plan */}
        {plans.length > 0 && (
          <div className="bg-gray-100 p-4 w-1/3 rounded-lg mb-4">
            <h2 className="text-xl font-semibold mb-4">Your main financial plan</h2>
            <p>Plan Name: {plans[0].PlanName}</p>
            <p>Target Amount: {plans[0].targetAmount}</p>
            <p>Current Amount: {plans[0].currentAmount}</p>
            <p>Amount To Collect: {plans[0].amountToCollect}</p>
            {/* Add other plan details here */}
            <div className="mt-4 flex space-x-4">
              <button onClick={() => handleDeletePlan(plans[0].id)} className="text-red-500">Delete</button>
            </div>
          </div>
        )}

        {/* Display other financial plans */}
        <div className="grid grid-cols-3 gap-4">
          {plans.slice(1).map((plan) => (
            <div key={plan.id} className="bg-gray-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">{plan.PlanName}</h2>
              <p>Target Amount: {plan.targetAmount}</p>
              <p>Current Amount: {plan.currentAmount}</p>
              <p>Amount To Collect: {plan.amountToCollect}</p>
              {/* Add other plan details here */}
              <div className="mt-4 flex space-x-4">
                <button onClick={() => handleDeletePlan(plan.id)} className="text-red-500">Delete</button>
              </div>
            </div>
          ))}
        </div>
        <Link to="CreatePlan" className="flex mt-8 text-indigo-500">Create Plan</Link>
      </div>
    </div>
  );
}

export default FinancePlan;


