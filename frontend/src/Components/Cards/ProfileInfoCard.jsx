import React, { useContext } from 'react'
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return (
    user && (
      <div className='flex items-center gap-2'>
        <img src={user?.profileImageUrl} alt="" className='w-12 h-12 rounded-full bg-gray-300' />
        <div className='flex flex-col gap-2'>
          <div className='text-sm font-semibold text-gray-700 leading-3'>
            {user?.name || ""}
          </div>
          <button onClick={handleLogout} className='bg-linear-to-r from-[#ff8000] to-[#e5aa6e] text-sm font-semibold text-white px-2 py-1 rounded-full hover:underline cursor-pointer'>
            Logout
          </button>
        </div>
      </div>
    )
  )
}

export default ProfileInfoCard