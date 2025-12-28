import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
const Input = ({value, onChange, label, placeHolder, type}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="text-[14px] font-medium text-slate-800">
        {label}
      </label>
      <div className='input-box'>
        <input type={ type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeHolder}
        value={value}
        onChange={(e)=>onChange(e)}
        className='w-full bg-transparent outline-none'
        />
        {type === "password" && (
          <>
          {showPassword ? (
            <FaRegEye size={22} className="text-primary cursor-pointer" onClick={()=>handlePasswordVisibility()}/>
          ):(
            <FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={()=>handlePasswordVisibility()}/>
          )
        }
          </>
        )}
      </div>
    </div>
  )
}

export default Input