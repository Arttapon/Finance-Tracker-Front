import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/pic/Logo.jpg";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1112/auth/register', input);
      console.log(response.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error('Registration failed', error);
      setError("Registration failed. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cyan-400 text-black">
      <img src={logo} alt="Logo" className="mb-8" style={{ maxHeight: "100px" }} />
      <div className="max-w-md w-full rounded-lg overflow-hidden text-center">
        <div className="text-3xl mb-5">Register</div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="form-control">
            <span className="label-text text-black">Username</span>
            <input
              type="text"
              className="input input-bordered bg-slate-300"
              name="username"
              value={input.username}
              onChange={handleChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-black">E-mail</span>
            <input
              type="email"
              className="input input-bordered bg-slate-300"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-black">Password</span>
            <input
              type="password"
              className="input input-bordered bg-slate-300"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text text-black">Confirm Password</span>
            <input
              type="password"
              className="input input-bordered bg-slate-300"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleChange}
            />
          </label>

          <div className="flex gap-2 md:justify-center">
            <button type="submit" className="btn bg-blue-700">
              Register
            </button>
            <div className="flex gap-2">
              <Link to="/login" className="btn bg-blue-700">Back to Login</Link>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
