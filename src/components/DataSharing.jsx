import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function DataSharing() {
  const { user } = useContext(AuthContext);
  
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
      {user && (
          <div className="container  text-black mt-4">
            <h2 className="text-3xl font-semibold mb-4">User Information</h2>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
            {/* Add more user information as needed */}
          </div>
        )}
        <h1 className="text-3xl  text-black font-bold mb-4 mt-10">Data Sharing</h1>
        <div className="flex flex-col w-full lg:flex-row">
          <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">Share</div>
          <div className="divider lg:divider-horizontal">To</div>
          <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">contact</div>
        </div>
        {/* Example of displaying user information */}
        
      </div>
    </div>
  );
}

export default DataSharing;
