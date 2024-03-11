// DepositPlan.js
import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Deposit from '../assets/pic/Deposit.jpg';
import AuthContext from '../contexts/AuthContext';

export default function DepositPlan() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [plans, setPlans] = useState([]);
    const [newValue, setDepositAmount] = useState('');
    const [depositDetails, setDepositDetails] = useState('');

    const depId = location.pathname.split('/')[2]

    useEffect(() => {
        const getPlans = async () => {
            try {
                if (!user) return;
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:6969/FinancialPlan/deposit/${depId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPlans(response.data);
                // console.log(response.data)
            } catch (error) {
                console.log(error);
            }
        };
        getPlans();
    }, [user]);

        const updateCurrentAmount = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:6969/FinancialPlan/${depId}`, { newValue }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                
            });
        } catch (error) {
            console.log(error);
        }
        console.log(newValue);
    };
    
    const addDepositIncome = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:6969/IncomeExpenses/incomes', {
                category: 'Deposit',
                amount: newValue,
                details: depositDetails
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleDeposit = async () => {
        try {
            await updateCurrentAmount();
            // await updateFinancialPlan();
            await addDepositIncome();
            alert('Deposit successful!');
            window.location.reload();
        } catch (error) {
            console.error('Error depositing:', error);
            alert('Deposit failed. Please try again later.');
        }
    };
    

    return (
        <div className="flex min-h-screen bg-cyan-200">
            <div className="bg-gray-800 text-white w-64 py-8 px-4">
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
                        </li><hr/>
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
                            <h1 className="text-3xl font-bold mb-4">Deposit to Plan</h1>

                            <div className="card w-full lg:w-10/1 rounded-box p-8">
                                {plans.map((plan) => (
                                    <div key={plan.id} className="bg-gray-100 text-black p-10 rounded-md">
                                        <h2 className="text-lg font-semibold mb-2">{plan.PlanName}</h2>
                                        <p>Target Amount: {plan.targetAmount}</p>
                                        <p>Current Amount: {plan.currentAmount}</p>
                                        <p>Amount To Collect: {plan.amountToCollect}</p>
                                    </div>
                                ))}
                            </div><br/>

                            <input
                                type="number"
                                className="input mb-4"
                                value={isNaN(newValue) ? '' : newValue}
                                onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
                                placeholder="Enter deposit amount"
                            />
                            <input type="text"
                                className="input mb-4" value={depositDetails}
                                onChange={(e) => setDepositDetails(e.target.value)}
                                placeholder="Enter deposit details"
                            />
                            <button onClick={handleDeposit} className="btn mt-4 bg-blue-700 hover:bg-blue-600 text-white">Deposit</button>
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal my-8 lg:my-0"></div>
                    <div className="card w-full lg:w-1/2 rounded-box p-8">
                        <img src={Deposit} alt='investment' className=" rounded-3xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}