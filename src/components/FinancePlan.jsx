import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FinancePlan() {
    // กำหนด state สำหรับข้อมูลผู้ใช้
    const [user, setUser] = useState(null);

    // กำหนด state สำหรับข้อมูลการเงิน
    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [amountToCollect, setAmountToCollect] = useState('');
    const [collectionFrequency, setCollectionFrequency] = useState('daily');
    const [timeToCollect, setTimeToCollect] = useState('');

    // สร้างฟังก์ชันสำหรับการเรียกข้อมูลผู้ใช้
    const fetchUserData = async () => {
        try {
            // เรียกข้อมูลผู้ใช้จาก API
            const response = await axios.get('http://localhost:1112/userData/1'); // ต้องแก้ URL ให้ตรงกับ API ของคุณ
            // อัปเดตข้อมูลผู้ใช้ใน state
            setUser(response.data.user);
        } catch (error) {
            // แสดงข้อผิดพลาดในการเรียกข้อมูลผู้ใช้
            console.error('Error fetching user data:', error);
        }
    };

    // เรียกใช้งานฟังก์ชัน fetchUserData เมื่อคอมโพเนนต์ถูกโหลด
    useEffect(() => {
        fetchUserData();
    }, []);

    // ฟังก์ชันสำหรับการส่งข้อมูลการเงินไปยังเซิร์ฟเวอร์
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:1112/financialplan', {
                goalName,
                targetAmount,
                amountToCollect,
                collectionFrequency
            });
            console.log('New finance plan created:', response.data);
            // แสดงผลข้อมูลหรือทำการ redirect ไปหน้าอื่นตามที่ต้องการ
        } catch (error) {
            console.error('Error creating finance plan:', error);
        }
    };

    // ฟังก์ชันสำหรับคำนวณเวลาที่ใช้ในการเก็บเงิน
    const calculateTimeToCollect = () => {
        let timeToCollectValue;
        if (collectionFrequency === 'daily') {
            timeToCollectValue = Math.ceil(targetAmount / amountToCollect);
            setTimeToCollect(`${timeToCollectValue} days`);
        } else if (collectionFrequency === 'weekly') {
            timeToCollectValue = Math.ceil(targetAmount / (amountToCollect * 7));
            setTimeToCollect(`${timeToCollectValue} weeks`);
        } else if (collectionFrequency === 'monthly') {
            timeToCollectValue = Math.ceil(targetAmount / (amountToCollect * 30));
            setTimeToCollect(`${timeToCollectValue} months`);
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
                        <Link to="/main" className='mb-2' > {/* Link to the main page */}
                            <a className="block py-2 px-4 text-sm hover:bg-gray-700">Dashboard</a>
                        </Link>
                        <li className="mb-2">
                            <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Transactions</a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Reports</a>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <div>
                    <h1 className="text-3xl font-bold mb-4">Create New Financial Plan</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="goalName" className="text-sm">Goal Name:</label>
                            <input type="text" id="goalName" value={goalName} onChange={(e) => setGoalName(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="targetAmount" className="text-sm">Target Amount:</label>
                            <input type="number" id="targetAmount" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="amountToCollect" className="text-sm">Amount to Collect:</label>
                            <input type="number" id="amountToCollect" value={amountToCollect} onChange={(e) => setAmountToCollect(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="collectionFrequency" className="text-sm">Collection Frequency:</label>
                            <select id="collectionFrequency" value={collectionFrequency} onChange={(e) => setCollectionFrequency(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2">
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Create Plan</button>
                    </form>
                    {timeToCollect && <p className="mt-4">Time to collect: {timeToCollect}</p>}
                </div>
            </div>
        </div>
    );
}

export default FinancePlan;
