import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import { validateEmail } from '../../Utils/helper';
import axiosInstance from '../../Utils/axiosInstance';
import { API_PATHS } from '../../Utils/apiPaths';
import { UserContext } from '../../Context/UserContext';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // handle login form submission

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError("")
    // login API call

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setPassword("");
        toast.error("Invalid credentials.", { duration: 2000 });
      }
      else if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };



  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <Toaster />
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6' >
        Please enter your credentials to access your account.
      </p>
      <form onSubmit={handleLogin}>
        <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeHolder="john@example.com" type="email" />
        <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeHolder="Enter your password" type="password" />
        {error && <p className='text-red-500 test-xs pb-2.5'>{error}</p>}
        <button type='submit' className='btn-primary w-full mt-6'>Login</button>

        <p className='text-s text-slate-800 mt-[5px] mb-6 text-center'>
          Don't have an account? <span onClick={() => setCurrentPage("signup")} className='text-primary cursor-pointer underline'>Register</span>
        </p>
      </form>
    </div >
  )
}

export default Login