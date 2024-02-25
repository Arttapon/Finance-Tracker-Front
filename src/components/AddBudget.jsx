import React, { useState } from 'react';
import axios from 'axios';

function AddBudget() {
  // const [category, setCategory] = useState('');
  // const [plannedAmount, setPlannedAmount] = useState('');
  // const [actualAmount, setActualAmount] = useState('');

  const [data, setData] = useState({
    category: '',
    plannedAmount: '',
    actualAmount: ''
  })

  const hdlChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:6969/budget', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Redirect to budget page after successful submission
      window.location.href = '/budget';
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Add Budget</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">Category</label>
          <input name='category' type="text" id="category" className="form-input mt-1 block w-full" value={data.category} onChange={hdlChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="plannedAmount" className="block text-gray-700">Planned Amount</label>
          <input name='plannedAmount' type="text" id="plannedAmount" className="form-input mt-1 block w-full" value={data.plannedAmount} onChange={hdlChange} />
        </div>
        <div className="mb-4">
          <label htmlFor="actualAmount" className="block text-gray-700">Actual Amount</label>
          <input  name='actualAmount' type="text" id="actualAmount" className="form-input mt-1 block w-full" value={data.actualAmount} onChange={hdlChange} />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
}

export default AddBudget;
