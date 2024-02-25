// import React, { useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // Import Redirect
// import AuthContext from '../contexts/AuthContext';
// import { addDays } from 'date-fns';

// function CreatePlan() {
//     const { user } = useContext(AuthContext);
//     const [data, setData] = useState({
//         PlanName: '',
//         targetAmount: '',
//         currentAmount: '',
//         amountToCollect: '',
//         collectionFrequency: ''
//     });

//     const [daysToReachGoal, setDaysToReachGoal] = useState(0);
//     const [redirect, setRedirect] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     useEffect(() => {
//         handleCalculate();
//     }, [data]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             await axios.post('http://localhost:6969/FinancialPlan', {
//                 ...data
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             // แจ้งว่าสร้างเสร็จแล้ว
//             alert('Financial Plan created successfully!');
//             // เปลี่ยน state เพื่อเปิดการเปลี่ยนเส้นทาง
//             setRedirect(true);
//         } catch (error) {
//             console.error('Error creating plan:', error);
//         }
//     };

//     const calculateTargetDates = () => {
//         const { currentAmount, targetAmount, amountToCollect, collectionFrequency } = data;
//         const amountNeeded = targetAmount - currentAmount;

//         let days = 0;

//         switch (collectionFrequency) {
//             case 'daily':
//                 days = Math.ceil(amountNeeded / amountToCollect);
//                 break;
//             case 'weekly':
//                 days = Math.ceil(amountNeeded / (amountToCollect * 7));
//                 break;
//             case 'monthly':
//                 days = Math.ceil(amountNeeded / (amountToCollect * 30));
//                 break;
//             default:
//                 days = 0;
//                 break;
//         }

//         return days;
//     };

//     const handleCalculate = () => {
//         const days = calculateTargetDates();
//         setDaysToReachGoal(days);
//     };

//     const renderCalendar = () => {
//         const targetDates = [];
//         let currentDate = new Date();
    
//         switch (data.collectionFrequency) {
//             case 'daily':
//                 for (let i = 0; i < daysToReachGoal; i++) {
//                     targetDates.push(addDays(currentDate, i));
//                 }
//                 break;
//             case 'weekly':
//                 for (let i = 0; i < daysToReachGoal; i += 7) {
//                     targetDates.push(addDays(currentDate, i));
//                 }
//                 break;
//             case 'monthly':
//                 for (let i = 0; i < daysToReachGoal; i += 30) {
//                     targetDates.push(addDays(currentDate, i));
//                 }
//                 break;
//             default:
//                 break;
//         }
    
//         return (
//             <div className="flex flex-wrap">
//                 {targetDates.map((date, index) => (
//                     <div key={index} className="w-1/4 p-2">
//                         <div className="bg-white shadow-md rounded p-4 text-center">
//                             {date.toLocaleDateString()}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//     };
    
//     useEffect(() => {
//         if (redirect) {
//             window.location.href = '/financial-plan';
//         }
//     }, [redirect]);

//     return (
//         <div className="flex min-h-screen bg-cyan-200">
//             <div className="bg-gray-800 text-white w-64 py-8 px-4">
//                 <div className="flex flex-col items-center justify-center mb-8">
//                     <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Logo" className="w-16 h-16 rounded-full mb-2" />
//                     <span className="text-sm">{user ? user.username : 'Guest'}</span>
//                 </div>
//                 <hr />
//                 <br />
//                 <nav>
//                     <ul>
//                         <li className="mb-2">
//                             <Link to="/main" className="block py-2 px-4 text-sm hover:bg-gray-700">Dashboard</Link>
//                         </li>
//                         <li className="mb-2">
//                             <Link to="/settings" className="block py-2 px-4 text-sm hover:bg-gray-700">Settings</Link>
//                         </li>
//                         <hr />
//                         <li className="mb-2 justify-b">
//                             <Link to="/login" className="block py-2 px-4 text-sm hover:bg-red-700">Logout</Link>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//             <div className="container mx-auto px-4 py-8">
//                 <h1 className="text-3xl font-bold mb-4">Create Plan</h1>

//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2" htmlFor="planName">Plan Name</label>
//                         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="planName" type="text" placeholder="Enter plan name" name="PlanName" value={data.PlanName} onChange={handleChange} />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2" htmlFor="targetAmount">Target Amount</label>
//                         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="targetAmount" type="number" placeholder="Enter target amount" name="targetAmount" value={data.targetAmount} onChange={handleChange} />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2" htmlFor="currentAmount">Current Amount</label>
//                         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="currentAmount" type="number" placeholder="Enter current amount" name="currentAmount" value={data.currentAmount} onChange={handleChange} />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2" htmlFor="amountToCollect">Amount To Collect</label>
//                         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="amountToCollect" type="number" placeholder="Enter amount to collect" name="amountToCollect" value={data.amountToCollect} onChange={handleChange} />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-sm font-bold mb-2" htmlFor="collectionFrequency">Collection Frequency</label>
//                         <select className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="collectionFrequency" name="collectionFrequency" value={data.collectionFrequency} onChange={handleChange}>
//                             <option value="">-- Choose Frequency --</option>
//                             <option value="daily">Daily</option>
//                             <option value="weekly">Weekly</option>
//                             <option value="monthly">Monthly</option>
//                         </select>
//                     </div>
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
//                         Create Plan
//                     </button>
//                 </form>

//                 <div>
//                     <h2 className="text-2xl font-bold mb-2">Estimated Time to Reach Goal: {daysToReachGoal} {data.collectionFrequency === 'weekly' ? 'weeks' : data.collectionFrequency === 'monthly' ? 'months' : 'days'}</h2>
//                     <h2 className="text-2xl font-bold mb-2">Calendar:</h2>
//                     <div>{renderCalendar()}</div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CreatePlan;


import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Redirect
import AuthContext from '../contexts/AuthContext';
import { addDays } from 'date-fns';

function CreatePlan() {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState({
        PlanName: '',
        targetAmount: '',
        currentAmount: '',
        amountToCollect: '',
        collectionFrequency: ''
    });

    const [daysToReachGoal, setDaysToReachGoal] = useState(0);
    const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        handleCalculate();
    }, [data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:6969/FinancialPlan', {
                ...data
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // แจ้งว่าสร้างเสร็จแล้ว
            alert('Financial Plan created successfully!');
            // เปลี่ยน state เพื่อเปิดการเปลี่ยนเส้นทาง
            setRedirect(true);
        } catch (error) {
            console.error('Error creating plan:', error);
        }
    };

    const calculateTargetDates = () => {
        const { currentAmount, targetAmount, amountToCollect, collectionFrequency } = data;
        const amountNeeded = targetAmount - currentAmount;

        let days = 0;

        switch (collectionFrequency) {
            case 'daily':
                days = Math.ceil(amountNeeded / amountToCollect);
                break;
            case 'weekly':
                days = Math.ceil(amountNeeded / (amountToCollect * 7));
                break;
            case 'monthly':
                days = Math.ceil(amountNeeded / (amountToCollect * 30));
                break;
            default:
                days = 0;
                break;
        }

        return days;
    };

    const handleCalculate = () => {
        const days = calculateTargetDates();
        setDaysToReachGoal(days);
    };

    const renderCalendar = () => {
        const targetDates = [];
        let currentDate = new Date();
        
        switch (data.collectionFrequency) {
            case 'daily':
                for (let i = 0; i < daysToReachGoal; i++) {
                    targetDates.push(addDays(currentDate, i));
                }
                break;
            case 'weekly':
                for (let i = 0; i < daysToReachGoal * 7; i += 7) {
                    targetDates.push(addDays(currentDate, i));
                }
                break;
            case 'monthly':
                for (let i = 0; i < daysToReachGoal * 30; i += 30) {
                    targetDates.push(addDays(currentDate, i));
                }
                break;
            default:
                break;
        }
        
        return (
            <div className="flex flex-wrap">
                {targetDates.map((date, index) => (
                    <div key={index} className="w-1/4 p-2">
                        <div className="bg-white shadow-md rounded p-4 text-center">
                            {date.toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    
    useEffect(() => {
        if (redirect) {
            window.location.href = '/financial-plan';
        }
    }, [redirect]);

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
                            <Link to="/login" className="block py-2 px-4 text-sm hover:bg-red-700">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Create Plan</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="planName">Plan Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="planName" type="text" placeholder="Enter plan name" name="PlanName" value={data.PlanName} onChange={handleChange} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="targetAmount">Target Amount</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="targetAmount" type="number" placeholder="Enter target amount" name="targetAmount" value={data.targetAmount} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="currentAmount">Current Amount</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="currentAmount" type="number" placeholder="Enter current amount" name="currentAmount" value={data.currentAmount} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="amountToCollect">Amount To Collect</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="amountToCollect" type="number" placeholder="Enter amount to collect" name="amountToCollect" value={data.amountToCollect} onChange={handleChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="collectionFrequency">Collection Frequency</label>
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="collectionFrequency" name="collectionFrequency" value={data.collectionFrequency} onChange={handleChange}>
                            <option value="">-- Choose Frequency --</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Create Plan
                    </button>
                    <div className="flex justify-center mt-8">
                    <Link to="/financial-plan" className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        View Plans
                    </Link>
                </div>
                </form>

                <div>
                    <h2 className="text-2xl font-bold mb-2">Estimated Time to Reach Goal: {daysToReachGoal} {data.collectionFrequency === 'weekly' ? 'weeks' : data.collectionFrequency === 'monthly' ? 'months' : 'days'}</h2>
                    <h2 className="text-2xl font-bold mb-2">Calendar:</h2>
                    <div>{renderCalendar()}</div>
                </div>

                
            </div>
        </div>
    );
}

export default CreatePlan;
