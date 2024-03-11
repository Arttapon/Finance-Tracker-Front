/* eslint-disable react/prop-types */
import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

// สร้าง context สำหรับการจัดการข้อมูลการยืนยันตัวตน
const AuthContext = createContext()

// สร้าง Provider สำหรับ AuthContext
function AuthContextProvider(props) {
  // สร้าง state เพื่อเก็บข้อมูลผู้ใช้และสถานะ loading
  const [user, setUser] = useState(null) // เก็บข้อมูลผู้ใช้
  const [loading, setLoading] = useState(true) // สถานะ loading

  // useEffect ใช้สำหรับดึงข้อมูลผู้ใช้จากเซิร์ฟเวอร์เมื่อ component โหลด
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true) // เริ่มต้นการโหลดข้อมูล ให้แสดงสถานะ loading
        let token = localStorage.getItem('token') // ดึง Token JWT จาก localStorage
        if (!token) { return } // ถ้าไม่มี Token JWT ให้จบการทำงานทันที
        // ส่งคำขอเพื่อขอข้อมูลผู้ใช้จากเซิร์ฟเวอร์โดยใช้ Token JWT
        const rs = await axios.get('http://localhost:6969/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(rs.data) // เมื่อได้ข้อมูลผู้ใช้กลับมา กำหนดค่าให้กับ state user
      } catch (err) {
        console.log(err.message) // แสดงข้อความ error ในกรณีที่เกิดข้อผิดพลาด
      } finally {
        setLoading(false) // เมื่อเสร็จสิ้นการโหลด ให้ปรับสถานะ loading เป็น false
      }
    }
    run() // เรียกใช้งานฟังก์ชัน run เมื่อ component โหลด
  }, []) // ใช้ [] เพื่อให้ useEffect ทำงานเฉพาะครั้งแรกเท่านั้น

  // ฟังก์ชันสำหรับการออกจากระบบ (ล้างข้อมูลผู้ใช้และ Token JWT ออกจาก localStorage)
  const logout = () => {
    setUser(null) // ล้างข้อมูลผู้ใช้
    localStorage.removeItem('token') // ลบ Token JWT ออกจาก localStorage
    localStorage.removeItem('status') // ลบข้อมูลอื่นๆ ที่อาจจะเก็บไว้ใน localStorage
  }

  // สร้าง Provider สำหรับ AuthContext และกำหนดค่าที่ต้องการให้ Context นี้ส่งไปยัง child components
  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {props.children} {/* ส่ง child components ที่อยู่ภายใต้ AuthContextProvider */}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider } // ส่งออก AuthContextProvider เพื่อให้สามารถ import ไปใช้ในอื่นๆ ได้
export default AuthContext // ส่งออก AuthContext เพื่อให้สามารถ import ไปใช้ในอื่นๆ ได้
