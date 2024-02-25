import React from 'react';
import { Link } from 'react-router-dom';

function DataSharing() {
  return (
    <div className="flex bg-cyan-200">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 py-8 px-4">
        {/* Logo Profile */}
        <div className="flex flex-col items-center justify-center mb-8">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Logo" className="w-16 h-16 rounded-full mb-2" />
          <span className="text-sm">Username</span>
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
              <Link to="/finance-plan" className="block py-2 px-4 text-sm hover:bg-gray-700">Finance Plan</Link>
            </li>
            <li className="mb-2">
              <Link to="/transactions" className="block py-2 px-4 text-sm hover:bg-gray-700">Transactions</Link>
            </li>
            <li className="mb-2">
              <Link to="/reports" className="block py-2 px-4 text-sm hover:bg-gray-700">Reports</Link>
            </li>
            <li className="mb-2">
              <Link to="/profile" className="block py-2 px-4 text-sm hover:bg-gray-700">Edit Profile</Link>
            </li>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
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
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Data Sharing</h1>
        {/* Add your content here */}
      </div>
    </div>
  );
}

export default DataSharing;
