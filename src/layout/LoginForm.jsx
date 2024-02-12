import axios from 'axios';
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/pic/Logo.jpg";

export default function LoginForm() {
  const [input, setInput] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    if (e.target.type === "checkbox") {
      setInput(prevState => ({ ...prevState, [e.target.name]: e.target.checked }));
    } else {
      setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1112/auth/login', input);
      console.log(response.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cyan-400 text-black">
      <img src={logo} alt="Logo" className="mb-8" style={{ maxHeight: "100px" }} />
      <div className="max-w-md w-full rounded-lg overflow-hidden text-center">
        <div className="text-3xl mb-5">Login</div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="form-control">
            <span className="label-text text-black ">Username</span>
            <input
              type="text"
              className="input input-bordered bg-slate-300"
              name="username"
              value={input.username}
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
            <input
              type="checkbox"
              className="form-checkbox text-blue-600"
              name="rememberMe"
              checked={input.rememberMe}
              onChange={handleChange}
            />
            <span className="ml-2">Remember me</span>
            <Link to="/forgotpassword" className="text-blue-600">Forgot Password</Link>
          </label>

          <div className="flex gap-2 md:justify-center">
            <button type="submit" className="btn bg-blue-700">
              Login
            </button>
            <div className="flex gap-2">
              <Link to="/register" className="btn bg-blue-700">Register</Link>
              
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
