import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

function Settings() {
    const { user, loading, logout, token } = useContext(AuthContext);
    const [profileData, setProfileData] = useState({
        profileImage: '',
        coverImage: '',
        nickname: ''
    });
    const [loadingProfile, setLoadingProfile] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetchProfileData(userId);
        } else {
            // Handle case where userId is not available
        }
    }, []);

    const fetchProfileData = async (userId) => {
        try {
            setLoadingProfile(true);
            const response = await axios.get(`http://localhost:6969/profile/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfileData(response.data);
            setLoadingProfile(false);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            setLoadingProfile(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileData(prevData => ({
                ...prevData,
                profileImage: reader.result
            }));
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoadingProfile(true);
            const userId = localStorage.getItem('userId');
            await axios.put(`http://localhost:6969/profile/${userId}`, profileData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Profile updated successfully!');
            setLoadingProfile(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setLoadingProfile(false);
        }
    };

    if (loadingProfile) {
        return <p>Loading...</p>;
    }

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
                            <Link to="/login" onClick={logout} className="block py-2 px-4 text-sm hover:bg-red-700">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="flex-1 container mx-auto px-4 py-8 text-black">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                <form onSubmit={handleSubmit}>
                <h2 className="text-3xl font-semibold mb-4">Profile</h2>
                    <div className="flex flex-col items-center justify-center mb-8 mt-4">
                        <label htmlFor="profilePicture" className="cursor-pointer text-center">
                            <img src={profileData.profileImage || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt="Profile" className="w-16 h-16 rounded-full mb-2" />
                            <span className="text-sm">{user ? user.username : 'Guest'}</span>
                            <input type="file" id="profilePicture" name="profilePicture" onChange={handleProfilePictureChange} className="hidden" />
                        </label>
                    </div>

                    {user && (
                        <div className="container  text-black mt-4">
                            <h2 className="text-3xl font-semibold mb-4">User Information</h2>
                            <p>Name: {user.username}</p>
                            <p>Email: {user.email}</p>
                            {/* Add more user information as needed */}
                        </div>
                    )}

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white mt-10 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
                </form>
            </div>
        </div>
    );
}

export default Settings;
