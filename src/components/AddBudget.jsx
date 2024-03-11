import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import Save from '../assets/pic/save.jpg';

function AddBudget() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({
    category: '',
    BudgetAmount: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const requestData = { category: data.category, BudgetAmount: parseFloat(data.BudgetAmount) };
      const response = await axios.post('http://localhost:6969/budget', requestData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 201) {
        alert('created Budget successfully!');
        window.location.href = '/budget';
      } else {
        throw new Error('Failed to add budget');
      }
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  const handleLogout = () => {
    // ฟังก์ชัน handleLogout
  };

  return (
    <div className="flex min-h-screen bg-cyan-200">
      <div className="bg-gray-800 text-white w-64 py-8 px-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Logo" className="w-16 h-16 rounded-full mb-2" />
          <span className="text-sm">{user ? user.username : 'Guest'}</span>
        </div>
        <hr />
        <br />
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
              <Link to="/login" className="block py-2 px-4 text-sm hover:bg-red-700" onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Add Budget</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row">
            <div className="card w-full lg:w-1/2 rounded-box p-8">
              <label htmlFor="category" className="block text-gray-700">Category</label>
              <input name="category" type="text" id="category" className="input text-white" value={data.category} onChange={handleChange} />
              <label htmlFor="BudgetAmount" className="block text-gray-700 mt-4">Budget Amount</label>
              <input name="BudgetAmount" type="text" id="BudgetAmount" className="input text-white" value={data.BudgetAmount} onChange={handleChange} />
              <button type="submit" className="btn mt-4 bg-blue-700 hover:bg-blue-600 text-white">Submit</button>
            </div>
            <div className="divider lg:divider-horizontal my-8 lg:my-0"></div>
            <div className="card w-full lg:w-1/2 rounded-box p-8">
              <img src={Save} alt='investment' className=" rounded-3xl" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBudget;
