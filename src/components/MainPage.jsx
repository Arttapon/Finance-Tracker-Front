import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Plan from "../assets/pic/plan.jpg"
import DataSharing from "../assets/pic/datashar.jpg"
import Budget from "../assets/pic/budget.jpg"
import investment1 from '../assets/pic/save1.jpg'
import investment2 from '../assets/pic/save2.jpg'
import investment3 from '../assets/pic/save3.jpg'
import investment4 from '../assets/pic/save4.jpg'
import AuthContext, { AuthContextProvider } from '../contexts/AuthContext';

// Component ที่ใช้ในการรับข้อมูลผู้ใช้และแสดงหน้าหลักหลังเข้าสู่ระบบ
export default function GetUser() {
  return (
    <AuthContextProvider>
      <MainPage />
    </AuthContextProvider>
  )
}

// Component สำหรับแสดงหน้าหลักหลังเข้าสู่ระบบ
function MainPage() {

  const { user, loading, } = useContext(AuthContext); // เรียกใช้ context AuthContext เพื่อรับข้อมูลผู้ใช้และสถานะการโหลด

  // ตรวจสอบสถานะการโหลดข้อมูลผู้ใช้
  if (loading) {
    return (
      <div>
        <p>loading....</p>
      </div>
    )
  }

  // แสดงหน้าหลักหลังเข้าสู่ระบบหลังจากโหลดข้อมูลผู้ใช้เรียบร้อยแล้ว
  return (
    <div>
      {<MainDashboard user={user} />}
    </div>
  )

}

// Component ที่ใช้ในการแสดงหน้าหลักหลังเข้าสู่ระบบ
function MainDashboard({ user }) {

  // ฟังก์ชันที่ใช้ในการออกจากระบบ
  const handleLogout = () => {
  };

  // แสดงหน้าหลักหลังเข้าสู่ระบบ
  return (
    <div className="flex min-h-screen bg-cyan-200">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 py-8 px-4">
        {/* Logo Profile */}
        <div className="flex flex-col items-center justify-center mb-8">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Logo" className="w-16 h-16 rounded-3xl mb-2" />
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
              <Link to="/login" onClick={handleLogout} className="block py-2 px-4 text-sm hover:bg-red-700">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Content */}
      <div className=" flex-1 container mx-auto px-4 py-8 text-black">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user ? user.username : 'Guest'}</h1>
        <br />
        <br /><br /><br />
        {/* ส่วนของเมนู */}
        <div className=" text-black flex justify-center space-x-72">
          {/* FinancialPlan */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col mb-8">
            <Link to="/financial-plan">
              <img src={Plan} alt="Financial Plan" className="w-16 h-16 rounded-3xl mb-2" />
              <span className="text-sm">FinancePlan</span>
            </Link>
          </div>
          {/* Budget */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col mb-8">
            <Link to="/Budget">
              <img src={Budget} alt="Budget" className="w-16 h-16 rounded-3xl mb-2" />
              <span className="text-sm">Budget</span>
            </Link>
          </div>
          {/* DataSharing */}
          <div className="block cursor-pointer text-center hover:bg-slate-500 flex-col mb-8">
            <Link to='/DataSharing'>
              <img src={DataSharing} alt="Data Sharing" className="w-16 h-16 rounded-3xl mb-2" />
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
        </div>
        {/* Income & Expenses */}
        <div className="flex justify-center space-x-10 mt-10">
          <div className="bg-gray-100 p-4 w-1/3 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Income</h2>
          </div>
          <div className="bg-gray-100 p-4 w-1/3 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Expenses</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
