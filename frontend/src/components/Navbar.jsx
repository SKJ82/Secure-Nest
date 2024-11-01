import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

const Navbar = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignup = () => {
        navigate('/signup')
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <nav className='bg-gray-900 '>
            <div className='text-white flex justify-between items-center px-4 py-5 h-14 mycontainer'>
                <div className="logo font-bold text-3xl md:mx-20 flex">
                    <img width={44} height={44} src="./icons/logo.png" alt="" />
                    <Link to='/'>SecureNest</Link>   
                </div>


                {user && (<button onClick={handleLogout} className='text-white my-5 flex justify-between items-center 
            rounded-full mr-3 md:mr-20 ring-white ring-1 hover:bg-blue-500'>
                    <img className='invert w-10 p-2' src="icons/logout.png" alt="" />
                    <span className="font-bold px-2 mr-1"> Logout</span>
                </button>)}

                {!user && (<div className='flex'>
                    <button onClick={handleLogin} className='text-white my-5 flex justify-between items-center 
                    rounded-full mr-3 md:mr-5 ring-white ring-1 hover:bg-blue-500'>
                        <img className='invert w-10 p-2' src="icons/login.png" alt="" />
                        <span className="font-bold px-2 mr-1"> Login</span>
                    </button>

                    <button onClick={handleSignup} className='text-white my-5 flex justify-between items-center 
                    rounded-full mr-3 md:mr-20 ring-white ring-1 hover:bg-blue-500'>
                        <img className='invert w-10 p-2' src="icons/signup.png" alt="" />
                        <span className="font-bold px-2 mr-1"> Signup</span>
                    </button>
                </div>)}

            </div>
        </nav>
    )
}

export default Navbar