import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signupUser } from '../api/userAPI.js';
import { UserContext } from '../context/UserContext';

function Signup() {
  const {setUser}=useContext(UserContext);
  const navigate = useNavigate();
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleSignup=(e)=>{
e.preventDefault();
signupUser(username,email,password).then((data)=>{
  setUser(data.user); // ✅ set the user in global context
      navigate("/"); // ✅ now ProtectedRoute will allow access instantly
 
}).catch((error)=>{
    console.error("Signup error:",error);
});
    }
  return (
     <div className='flex justify-center items-center h-screen w-screen bg-black text-white'>     
      <div className='w-[60%]   flex  justify-between'>
          <span className='w-1 bg-white '></span>
        <form onSubmit={handleSignup} className='flex flex-col space-y-3 px-20 py-10 ring'>
            <h1 className='text-2xl font-bold'>Welcome to the Signup Page</h1>
            <p>Enter Your Name</p>
            <input autoFocus value={username} onChange={(e)=>setUsername(e.target.value)} className='border-1 border-white bg-white text-black px-2 py-1 outline-none' type='text'/>
            <p>Enter the email</p>
            <input value={email} onChangeCapture={(e)=>setEmail(e.target.value)} className='border-1 border-white bg-white text-black px-2 py-1 outline-none' type='text' />
            <p>Enter Your Password</p>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className='border-1 border-white bg-white text-black px-2 py-1 outline-none' type='password' />
            <button className='bg-orange-300 p-1 text-2xl font-bold text-black' type='submit'>Signup</button>
            <p>already have an account ? <Link to='/login' className='text-blue-700'>Login here</Link></p>
        </form>
          <span className='w-1 bg-white'></span>
        </div>
       
      </div>

  )
}

export default Signup
