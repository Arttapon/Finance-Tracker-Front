import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import Plan from "../assets/pic/plan.jpg"
import DataSharing from "../assets/pic/datashar.jpg"
import Budget from "../assets/pic/budget.jpg"
import investment1 from '../assets/pic/investment1.jpg'
import investment2 from '../assets/pic/investment2.jpg'
import investment3 from '../assets/pic/investment3.jpg'
import investment4 from '../assets/pic/investment4.jpg'
import AuthContext, { AuthContextProvider } from '../contexts/AuthContext';


export default function GetUser() {
  return (
    <AuthContextProvider>
      <MainPage />
    </AuthContextProvider>
  )
}

function MainPage() {

  const { user, loading, } = useContext(AuthContext);



  // console.log(getSaving.savings)

  if (loading) {
    return (
      <div>
        <p>loading....</p>
      </div>
    )
  }

  return (
    <div>
      {<MainDashboard user={user} />}
    </div>
  )

}

function MainDashboard({ user }) {
  // console.log(getPlans);
  // console.log(getBut);
  // console.log(getData);
  console.log(user);

  const handleLogout = () => {

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
              <Link to="/settings" className="block py-2 px-4 text-sm hover:bg-gray-700">Setting</Link>
            </li>
            <hr />
            <li className="mb-2 justify-b">
              <Link to="/login" onClick={handleLogout} className="block py-2 px-4 text-sm hover:bg-red-700">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Content */}


      <div className=" flex-1 container mx-auto px-4 py-8 text-black">
        {/* {console.log(user.user)} */}
        <h1 className="text-3xl font-bold mb-4">Welcome, {user ? user.username : 'Guest'}</h1>
        <br />
        <br /><br /><br />

        <div className=" text-black flex justify-center space-x-80">
          {/* FinancialPlan */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col items-center justify-center mb-8">
            <Link to="/financial-plan"> {/* เพิ่มลิงก์ที่นำไปยังหน้า FinancePlan */}
              <img src={Plan} alt="Financial Plan" className="w-16 h-16 rounded-full mb-2" />
              <span className="text-sm">FinancePlan</span>
            </Link>
          </div>

          {/* Budget */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col items-center justify-center mb-8">
            <Link to="/Budget">
              <img src={Budget} alt="Budget" className="w-16 h-16 rounded-full mb-2" />
              <span className="text-sm">Budget</span>
            </Link>
          </div>

          {/* DataSharing */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col items-center justify-center mb-8">
            <Link to='/DataSharing'> {/* ใช้ Link แทนเพื่อนำไปยังหน้า DataSharing */}
              <img src={DataSharing} alt="Data Sharing" className="w-16 h-16 rounded-full mb-2" />
              <span className="text-sm">DataSharing</span>
            </Link>
          </div>

        </div>

        {/* Carousel */}
        <div className="carousel w-full ">
          <div id="item1" className="carousel-item w-full justify-center">
            <img src={investment1} alt='investment' className="w-[800px] h-[200px]" />
          </div>
          <div id="item2" className="carousel-item w-full justify-center">
            <img src={investment2} alt='investment' className="w-[800px] h-[200px]" />
          </div>
          <div id="item3" className="carousel-item w-full justify-center">
            <img src={investment3} alt='investment' className="w-[800px] h-[200px]" />
          </div>
          <div id="item4" className="carousel-item w-full justify-center">
            <img src={investment4} alt='investment' className="w-[800px] h-[200px]" />
          </div>
        </div>
        {/* Pagination */}
        <div className="flex justify-center w-full py-2 gap-2">
          <a href="#item1" className="btn btn-xs">1</a>
          <a href="#item2" className="btn btn-xs">2</a>
          <a href="#item3" className="btn btn-xs">3</a>
          <a href="#item4" className="btn btn-xs">4</a>
        </div><br /><br />

        <div className="flex justify-center space-x-10">
          {/* Income */}
          <div className="bg-gray-100 p-4 w-1/3 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Income</h2>
            {/* <ul>
                {income.map((item, index) => (
                  <li key={index}>{item.amount}</li>
                ))}
              </ul> */}
          </div>
          {/* Expenses */}
          <div className="bg-gray-100 p-4 w-1/3 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Expenses</h2>
            {/* <ul>
                {expenses.map((item, index) => (
                  <li key={index}>{item.amount}</li>
                ))}
              </ul> */}
          </div>
        </div>
      </div>
    </div>
  )
}



