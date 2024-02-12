/* eslint-disable react/prop-types */
import axios from 'axios'
import {createContext, useState, useEffect} from 'react'

const AuthContext = createContext()

function AuthContextProvider(props) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect( ()=>{
    const run = async () => {
      try {
        setLoading(true)
        let token = localStorage.getItem('token')
        if(!token) { return }
        const rs = await axios.get('http://localhost:1112/auth/me', {
          headers : { Authorization : `Bearer ${token}` }
        })
        setUser(rs.data)
      }catch(err) {
        console.log(err.message)
      }finally {
        setLoading(false)
      }   
    }
    run()
  }, [])

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={ {user, setUser, loading, logout} }>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
export default AuthContext