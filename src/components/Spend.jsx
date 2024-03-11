import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'; 
import AuthContext from '../contexts/AuthContext'; 

function Spend() {
  const { user } = useContext(AuthContext); 
  const [amount, setAmount] = useState('');
  const [expenseDetails, setExpenseDetails] = useState(''); 
  const { id } = useParams(); 

  const updateBudget = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:6969/Budget/${id}`, { plannedAmount: amount }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error updating budget:', error);
      throw error;
    }
  };
  
  const recordExpense = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:6969/IncomeExpenses/expenses', {
        category: 'Spend',
        amount: amount, 
        details: expenseDetails
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error recording expense:', error);
      throw error;
    }
  };

  const handleSpend = async (e) => {
    e.preventDefault(); 
    try {
      await updateBudget();
      await recordExpense();
      console.log('Amount spent:', amount);
      alert('Amount spent successfully!');
    } catch (error) {
      console.error('Error spending amount:', error);
      alert('Failed to spend amount. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen bg-cyan-200">
      <div className="bg-gray-800 text-white w-64 py-8 px-4">
        {/* Logo Profile */}
        <div className="flex flex-col items-center justify-center mb-8">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Logo" className="w-16 h-16 rounded-full mb-2" />
          <span className="text-sm">{user ? user.username : 'Guest'}</span>
        </div>
        <hr className="my-4"/>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/main" className="block py-2 px-4 text-sm hover:bg-gray-700">Dashboard</Link>
            </li>
            <li className="mb-2">
              <Link to="/settings" className="block py-2 px-4 text-sm hover:bg-gray-700">Settings</Link>
            </li>
            <li className="mb-2">
              <Link to="/login" className="block py-2 px-4 text-sm hover:bg-red-700">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          <div className="card w-full lg:w-1/2 rounded-box p-8">
            <div className="card rounded-box p-8">
              <h1 className="text-3xl font-bold mb-4">Spend Budget</h1>
              <form onSubmit={handleSpend} className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="amount" className="text-gray-700">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    className="input"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="details" className="text-gray-700">Expense Details</label>
                  <input
                    type="text"
                    id="details"
                    className="input"
                    value={expenseDetails}
                    onChange={(e) => setExpenseDetails(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn bg-blue-500 text-white hover:bg-blue-600">Confirm Spend</button>
              </form>
            </div>
          </div>
          <div className="divider lg:divider-horizontal my-8 lg:my-0"></div>
          <div className="card w-full lg:w-1/2 rounded-box p-8">
            <div className="grid place-items-center">
              <p>Content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spend;
