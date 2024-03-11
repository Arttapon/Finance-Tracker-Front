import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
// import Deposit from '../assets/pic/Deposit.jpg'

function EditPlan() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [plans, setPlans] = useState([]);
    const [planData, setPlanData] = useState({
        PlanName: '',
        targetAmount: 0,
        amountToCollect: 0
    });

    const EditId = location.pathname.split('/')[2]

    useEffect(() => {
        if (!EditId) {
            console.log("ไม่พบ ID");
            return;
        }

        const getPlans = async () => {
            try {
                if (!user) return; // Check if user is logged in
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:6969/FinancialPlan/edit/${EditId}`, {
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
    }, [user, EditId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlanData({
            ...planData,
            [name]: value
        });
    };

    const updateFinancialPlan = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:6969/FinancialPlan/${EditId}`, {
                PlanName: planData.PlanName,
                targetAmount: parseFloat(planData.targetAmount),
                amountToCollect: parseFloat(planData.amountToCollect),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert('Plan updated successfully!');
            window.location.reload(); // Use history.push to navigate
        } catch (error) {
            console.error('Error updating plan:', error);
            alert('Failed to update plan. Please try again later.');
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateFinancialPlan();
    };

    return (
        <div className="flex min-h-screen bg-cyan-200">
            {/* Sidebar */}
            <div className="bg-gray-800 text-white w-64 py-8 px-4">
                <div className="flex flex-col items-center justify-center mb-8">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Logo" className="w-16 h-16 rounded-full mb-2" />
                    <span className="text-sm">{user ? user.username : 'Guest'}</span>
                </div>
                <hr className="my-4" />
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
            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Edit Financial Plan</h1>
                <div className="flex flex-col lg:flex-row">
                    <div className="card w-full lg:w-1/2 rounded-box p-8">
                        <div className="card rounded-box p-8">
                            <div className="card w-full lg:w-10/1 rounded-box p-8">
                                {plans.length > 0 ? (
                                    plans.map((plan) => (
                                        <div key={plan.id} className="bg-gray-100 text-black p-10 rounded-md">
                                            <h2 className="text-lg font-semibold mb-2">{plan.PlanName}</h2>
                                            <p>Target Amount: {plan.targetAmount}</p>
                                            <p>Current Amount: {plan.currentAmount}</p>
                                            <p>Amount To Collect: {plan.amountToCollect}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal my-8 lg:my-0"></div>
                    <div className="card w-full lg:w-1/2 rounded-box p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="PlanName" className="block text-sm font-bold mb-2">Plan Name</label>

                                <input
                                    type="text"
                                    id="PlanName"
                                    name="PlanName"
                                    value={planData.PlanName || ''}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />

                            </div>
                            <div className="mb-4">
                                <label htmlFor="targetAmount" className="block text-sm font-bold mb-2">Target Amount</label>
                                <input
                                    type="number"
                                    id="targetAmount"
                                    name="targetAmount"
                                    value={planData.targetAmount || ''}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />

                            </div>
                            <div className="mb-4">
                                <label htmlFor="amountToCollect" className="block text-sm font-bold mb-2">Amount To Collect</label>
                                <input
                                    type="number"
                                    id="amountToCollect"
                                    name="amountToCollect"
                                    value={planData.amountToCollect || ''}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />

                            </div>
                            <button type="submit" className="btn bg-blue-700 hover:bg-blue-600 text-white">Update Plan</button>
                            <Link to="/financial-plan" className="btn ml-4">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPlan;
