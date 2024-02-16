import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Plan from "../assets/pic/plan.jpg"
import Calculation from "../assets/pic/calculation.jpg"
import DataSharing from "../assets/pic/datashar.jpg"
import Investment from "../assets/pic/investment.jpg"
import Saving from "../assets/pic/save.jpg"
import Budget from "../assets/pic/budget.jpg"

function MainPage() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [financialPlanData, setFinancialPlanData] = useState(null);
  const [savingData, setSavingData] = useState(null);
  const [budgetData, setBudgetData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:1112/user/${user.id}`); // แก้ URL
        setUser(response.data.user);
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:1112/notifications/${user.id}`); // แก้ URL
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchIncome = async () => {
      try {
        const response = await axios.get(`http://localhost:1112/IncomeExpenses/incomes/${user.id}`); // แก้ URL
        setIncome(response.data);
      } catch (error) {
        console.error('Error fetching income:', error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:1112/IncomeExpenses/expenses/${user.id}`); // แก้ URL
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    const fetchFinancialPlanData = async () => {
      try {
        const response = await axios.get(`http://localhost:1112/financialplan/${user.id}`); // แก้ URL
        setFinancialPlanData(response.data);
      } catch (error) {
        console.error('Error fetching financial plan data:', error);
      }
    };

    const fetchSavingData = async () => {
      try {
        const response = await axios.get(`http://localhost:1112/saving/${user.id}`); // แก้ URL
        setSavingData(response.data);
      } catch (error) {
        console.error('Error fetching saving data:', error);
      }
    };

    const fetchBudgetData = async () => {
      try {
        const response = await axios.get(`http://localhost:1112/budget/${user.id}`); // แก้ URL
        setBudgetData(response.data);
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    if (user !== null) {
      fetchUserData();
      fetchNotifications();
      fetchIncome();
      fetchExpenses();
      fetchFinancialPlanData();
      fetchSavingData();
      fetchBudgetData();
    }
  }, [user]);

  const deposit = async () => {
    try {
      const response = await axios.post('http://localhost:1112/userData/transactions/', {
        userId: user.id,
        amount: 100, // ปรับปรุงจำนวนตามที่ต้องการ
        type: 'deposit',
      });
      setBalance(balance + 100); // อัปเดตยอดเงินใน state
    } catch (error) {
      console.error('Error depositing:', error);
    }
  };

  const withdraw = async () => {
    try {
      const response = await axios.post('http://localhost:1112/transactions/', {
        userId: user.id,
        amount: 50, // ปรับปรุงจำนวนตามที่ต้องการ
        type: 'withdraw',
      });
      setBalance(balance - 50); // อัปเดตยอดเงินใน state
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };

  return (
    <div className="flex">
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
              <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Dashboard</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Transactions</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Reports</a>
            </li>
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Edit Profile</a>
            </li>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <li className="mb-2">
              <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Settings</a>
            </li><hr />
            <li className="mb-2 justify-b">
              <a href="#" className="block py-2 px-4 text-sm hover:bg-red-600">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
      {/* Content */}


      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user ? user.username : 'Guest'}</h1>

        {/* Statistics */}
        <div className="flex justify-between mb-8">
          <div className="text-white">
            <div className="text-2xl font-bold">{balance !== null ? balance : 'Loading...'}</div>
            <div className="stat-desc">Your balance</div>
          </div>
          <div className="text-white">
            <div className="text-2xl font-bold">{financialPlanData !== null ? financialPlanData.amount : 'Loading...'}</div>
            <div className="stat-desc">Your financial plan</div>
          </div>
          <div className="text-white">
            <div className="text-2xl font-bold">{savingData !== null ? savingData.amount : 'Loading...'}</div>
            <div className="stat-desc">Your saving</div>
          </div>
          <div className="text-white">
            <div className="text-2xl font-bold">{budgetData !== null ? budgetData.amount : 'Loading...'}</div>
            <div className="stat-desc">Your budget status</div>
          </div>
        </div>

        <br /><br /><br />

        <div className=" text-white flex justify-between">
          {/* FinancialPlan */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col items-center justify-center mb-8">
            <Link to="/finance-plan"> {/* เพิ่มลิงก์ที่นำไปยังหน้า FinancePlan */}
              <img src={Plan} alt="Financial Plan" className="w-16 h-16 rounded-full mb-2" />
              <span className="text-sm">FinancePlan</span>
            </Link>
          </div>
          {/* InterestCalculation */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col items-center justify-center mb-8">
            <img src={Calculation} alt="Interest Calculation" className="w-16 h-16 rounded-full mb-2" />
            <span className="text-sm">Calculation</span>
          </div>
          {/* DataSharing */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col items-center justify-center mb-8">
            <img src={DataSharing} alt="Data Sharing" className="w-16 h-16 rounded-full mb-2" />
            <span className="text-sm">DataSharing</span>
          </div>
          {/* Investment */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col items-center justify-center mb-8">
            <img src={Investment} alt="Investment" className="w-16 h-16 rounded-full mb-2" />
            <span className="text-sm">Investment</span>
          </div>
          {/* Saving */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col items-center justify-center mb-8">
            <img src={Saving} alt="Saving" className="w-16 h-16 rounded-full mb-2" />
            <span className="text-sm text-center">Saving</span>
          </div>
          {/* Budget */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col items-center justify-center mb-8">
            <img src={Budget} alt="Budget" className="w-16 h-16 rounded-full mb-2" />
            <span className="text-sm">Budget</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="carousel w-full">
          <div id="item1" className="carousel-item w-full">
            <img src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center w-full py-2 gap-2">
          <a href="#item1" className="btn btn-xs">1</a>
          <a href="#item2" className="btn btn-xs">2</a>
          <a href="#item3" className="btn btn-xs">3</a>
          <a href="#item4" className="btn btn-xs">4</a>
        </div>

        <div className="flex space-x-4">
          {/* Notifications */}
          <div className="bg-gray-100 p-4 w-1/3 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>{notification.message}</li>
              ))}
            </ul>
          </div>
          {/* Income */}
          <div className="bg-gray-100 p-4 w-1/3 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Income</h2>
            <ul>
              {income.map((item, index) => (
                <li key={index}>{item.amount}</li>
              ))}
            </ul>
          </div>
          {/* Expenses */}
          <div className="bg-gray-100 p-4 w-1/3 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Expenses</h2>
            <ul>
              {expenses.map((item, index) => (
                <li key={index}>{item.amount}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;


// FinancialPlan
// InterestCalculation
// DataSharing
// Profile
// Investment
// Saving
// Budget

// Notification
// Income
// Expenseo
