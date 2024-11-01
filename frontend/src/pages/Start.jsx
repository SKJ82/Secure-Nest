import React from 'react'
import Navbar from "../components/Navbar"

const Start = () => {
  return (
    <>
      <div className='min-h-[82vh]'>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white 
            bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),
            linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 
            bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>

        <div className=" mx-auto text-center py-8">
          <h1 className="text-blue-900 text-5xl font-bold mb-4">SecureNest</h1>
          <p className="text-black text-3xl font-semibold mb-8 my-5">Keep your passwords secure with us</p>
        </div>

        <div className="mx-auto">
          <h2 className="text-blue-900 text-4xl font-bold text-center my-5">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-blue-900 text-2xl font-semibold mb-2">Strong Encryption</h3>
              <p className="text-gray-700">All your data is protected with top-notch encryption standards, keeping your passwords safe from unauthorized access.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-blue-900 text-2xl font-semibold mb-2">Easy Management</h3>
              <p className="text-gray-700">Add, edit, or delete passwords with ease. Our intuitive interface ensures a smooth experience for managing your credentials.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-blue-900 text-2xl font-semibold mb-2">Access Anywhere</h3>
              <p className="text-gray-700">Securely access your password vault from any device, wherever you are, with full assurance of security and privacy.</p>
            </div>
          </div>
        </div>

        <div className="md:container my-8 mx-auto">
          <h2 className="text-blue-900 text-4xl font-bold text-center my-5">How It Works</h2>
          <div className="flex justify-center gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-blue-900 text-xl font-semibold mb-2">1. Sign Up</h3>
              <p className="text-gray-700">Create an account and set up your secure vault.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-blue-900 text-xl font-semibold mb-2">2. Add Passwords</h3>
              <p className="text-gray-700">Add your passwords to keep them safe and organized.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-blue-900 text-xl font-semibold mb-2">3. Secure Access</h3>
              <p className="text-gray-700">Access your passwords securely from anywhere.</p>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Start