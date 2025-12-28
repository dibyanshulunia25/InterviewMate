import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector';

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
  };
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create Account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us to start your journey of career growth. Please enter your details to create an account.
      </p>
      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

        <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
          <Input value={name} onChange={({ target }) => setName(target.value)} label="Name" placeHolder="John Doe" type="text" />
          <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeHolder="john@example.com" type="email" />
          <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeHolder="Enter your password" type="password" />
          {error && <p className='text-red-500 test-xs pb-2.5'>{error}</p>}
          <button type='submit' className='btn-primary w-full mt-6'>Sign Up</button>

          <p className='text-s text-slate-800 mt-[5px] mb-6 text-center'>
            Already have an account? <span onClick={() => setCurrentPage("login")} className='text-primary cursor-pointer underline'>Login</span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp