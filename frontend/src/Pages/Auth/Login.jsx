import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  // handle login form submission

  const handleLogin = async (e) => {
    e.preventDefault();

  };
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6' >
        Please enter your credentials to access your account.
      </p>
      <form onSubmit={handleLogin}>
        <Input value={email} onChange={({target})=>setEmail(target.value)} label="Email Address" placeHolder="john@example.com" type="email" />
        <Input value={password} onChange={({target})=>setPassword(target.value)} label="Password" placeHolder="Enter your password" type="password" />
        {error && <p className='text-red-500 test-xs pb-2.5'>{error}</p>}
        <button type='submit' className='btn-primary w-full mt-6'>Login</button>

        <p className='text-s text-slate-800 mt-[5px] mb-6 text-center'>
          Don't have an account? <span onClick={()=>setCurrentPage("register")} className='text-primary cursor-pointer underline'>Register</span>
        </p>
      </form>
    </div >
  )
}

export default Login