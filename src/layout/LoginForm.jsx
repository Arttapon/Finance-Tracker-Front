import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // เพิ่ม useNavigate ที่นี่
import logo from "../assets/pic/Logo.jpg";

// Component สำหรับแสดงแบบฟอร์มการเข้าสู่ระบบ
export default function LoginForm() {
  const [input, setInput] = useState({
    username: '', // สถานะเก็บค่าชื่อผู้ใช้
    password: '', // สถานะเก็บค่ารหัสผ่าน
    rememberMe: false // สถานะเก็บค่าการจำรหัสผ่าน
  });
  const [error, setError] = useState(''); // สถานะเก็บข้อผิดพลาด
  const navigate = useNavigate(); // เรียกใช้ hook useNavigate เพื่อใช้ในการเปลี่ยนเส้นทาง

  // ฟังก์ชันที่ใช้ในการจัดการการเปลี่ยนแปลงของข้อมูลในฟอร์ม
  const handleChange = e => {
    if (e.target.type === "checkbox") {
      setInput(prevState => ({ ...prevState, [e.target.name]: e.target.checked }));
    } else {
      setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }
  };

  // ฟังก์ชันที่ใช้สำหรับการส่งคำขอเข้าสู่ระบบไปยังเซิร์ฟเวอร์
  const handleSubmit = async e => {
    try {
      e.preventDefault(); // ป้องกันการโหลดหน้าใหม่ขณะที่กำลังส่งคำขอ
      const rs = await axios.post('http://localhost:6969/auth/login', input); // ส่งคำขอเข้าสู่ระบบไปยังเซิร์ฟเวอร์
      console.log(rs.data.token); // แสดง token ที่ได้รับกลับมาจากเซิร์ฟเวอร์ในคอนโซล
      localStorage.setItem('token', rs.data.token); // เก็บ token ลงใน localStorage
      const rs1 = await axios.get('http://localhost:6969/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      }); // ส่งคำขอเพื่อขอข้อมูลผู้ใช้
      if (rs.status === 200) {
        alert('login successful'); // แสดงแจ้งเตือนเมื่อเข้าสู่ระบบสำเร็จ
        navigate('/main'); // เปลี่ยนเส้นทางไปยังหน้าหลักหลังจากเข้าสู่ระบบสำเร็จ
      }
      setUser(rs1.data); // กำหนดข้อมูลผู้ใช้ลงใน state
    } catch (err) {
      console.log(err.message); // แสดงข้อความ error ในกรณีที่เกิดข้อผิดพลาด
    }
  };

  // ส่วนของ JSX ที่ใช้สำหรับแสดงผลบนหน้าเว็บ
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
