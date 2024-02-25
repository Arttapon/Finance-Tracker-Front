import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // เพิ่มบรรทัดนี้เข้ามา
import AuthContext from '../contexts/AuthContext';

function Budget() {
  const { user, loading, logout } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:6969/budget', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBudgets();
    }
  }, [user]);

  const handleDeleteBudget = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:6969/budget/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // หลังจากลบแล้วให้ดึงข้อมูล Budgets ใหม่
      fetchBudgets();
    } catch (error) {
      console.error('Error deleting budget:', error);
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
              <button onClick={logout} className="block py-2 px-4 text-sm hover:bg-red-700">Logout</button>
            </li>
          </ul>
        </nav>
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Budget</h1>

        <div className="grid grid-cols-3 gap-4">
          {Array.isArray(budgets) && budgets.map((budget) => (
            <div key={budget.id} className="bg-gray-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">{budget.category}</h2>
              <p>Planned Amount: {budget.plannedAmount}</p>
              <p>Actual Amount: {budget.actualAmount}</p>
              {/* เพิ่มปุ่ม Delete และเรียกใช้งานฟังก์ชัน handleDeleteBudget */}
              <button onClick={() => handleDeleteBudget(budget.id)} className="text-red-500">Delete</button>
            </div>
          ))}
        </div>
        <Link to="/AddBudget" className="block mt-8 text-indigo-500">Add Budget</Link>
      </div>
    </div>
  );
}

export default Budget; // Export Budget as default
