import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import Navbar from "../components/Navbar"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <>
    <div className='min-h-[79vh]'>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white 
            bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),
            linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 
            bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <form className="login max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg my-10" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-semibold mb-6 text-gray-700">Log In</h3>

        <label className="block text-gray-600 text-sm font-medium mb-1">Email address:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-gray-600 text-sm font-medium mb-1">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          disabled={isLoading}
          className={`w-full p-3 mt-4 font-semibold text-white rounded-lg transition-colors 
        ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>
          Log in
        </button>

        {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
      </form>

    </div>
    </>
  )
}

export default Login