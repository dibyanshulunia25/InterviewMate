import React, { useState } from 'react'
import HERO_IMG from "../assets/hero-img.png"
import { APP_FEATURES } from '../Utils/data'
import { useNavigate } from 'react-router-dom'
import {LuSparkles} from 'react-icons/lu'
import Modal from '../Components/Modal'
import Login from '../Pages/Auth/Login'
import SignUp from '../Pages/Auth/SignUp'

const LandingPage = () => {
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => { };

  return (
    <>
      <div className='w-full min-h-full bg-[#fffcef]'>
        <div className='w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0' />
        <div className='container mx-auto px-4 pt-6 pb-[200px] relative z-10'>
          <header className='flex justify-between items-center mb-16'>
            <div className='text-xl text-black font-bold'>
              InterviewMate
            </div>
            <button onClick={() => setOpenAuthModal(true)} className='bg-linear-to-r from-[#ff8000] to-[#e5aa6e] text-sm font-semibold text-white px-7 py-3 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer'>
              Login / SignUp
            </button>
          </header>

          {/* Hero Content */}
          <div className='flex flex-col md:flex-row items-center'>
            <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
              <div className='flex items-center justify-left mb-2'>
                <div className='flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300'>
                  <LuSparkles /> AI Powered
                </div>
              </div>
              <h1 className='text-5xl text-black font-medium mb-6 leading-tight'>
                Ace Interviews with <br />
                <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,_#fcd760_100%)] bg-[length:200%_100%] animate-text-shine font-semibold'>AI-Powered</span>{" "}
                Learning
              </h1>
            </div>
            <div className='w-full md:w-1/2'>
              <p className='text-[17px] text-gray-900 mr-0 md:mr-20 mb-6'>
                Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. From preparation to mastery &mdash; your ultimate toolkit is here.
              </p>
              <button className='bg-black text-sm font-semibold text-white px-7 py-3 rounded-full  hover:bg-yellow-100 hover:text-black border border-yellow-500 hover:border-yellow-300 transition-all ease-in cursor-pointer' onClick={handleCTA}>Get Started</button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full min-h-full relative z-10 mb-26'>
        <div className='flex items-center justify-center -mt-36'>
          <section>
            <img src={HERO_IMG} alt="Hero Image" className='w-[80vw] h-full rounded-lg' />
          </section>
        </div>
      </div>

    <div className='w-full min-h-full bg-[#FFFCEF] mt-10'>
      <div className='container mx-auto px-4 pt-10 pb-20'>
        <section className='mt-5'>
          <h2 className='text-4xl font-semibold text-center mb-12'>
            Features that make you shine ✨
          </h2>
          <div className='flex flex-col items-center gap-10'>
            {/* first 3 cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10 w-full'>
              {APP_FEATURES.slice(0,3).map((feature)=>(
                <div key={feature.id} className='bg[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-200 transition border-2 border-amber-100'>
                  <h3 className='text-base font-semibold mb-3'>
                    {feature.title}
                  </h3>
                  <p className='font-medium text-md text-gray-600'>{feature.description}</p>
                </div>
              ))}
            </div>
            {/* Remaining two cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full'>
              {APP_FEATURES.slice(3).map((feature)=>(
                <div key={feature.id} className='bg[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-200 transition border-2 border-amber-100'>
                  <h3 className='text-base font-semibold mb-3'>{feature.title}</h3>
                  <p className='font-medium text-md text-gray-600'>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
    <div className='text-md capitalize bg-gray-50 text-secondary text-center p-5 m-5'>&copy; All rights reserved <span className='text-lg text-transparent bg-clip-text bg-[radial-gradient(circle,#ff9324_0%,#fcd760_100%)] bg-[length:200%_100%] animate-text-shine font-semibold'>@ Dibyanshu Lunia</span></div>

    <Modal isOpen={openAuthModal} onClose={()=>{
      setOpenAuthModal(false);
      setCurrentPage("login");
    }}
    hideHeader
    >
      <div>
        {currentPage === "login" && (
          <Login setCurrentPage={setCurrentPage}/>
        )}
        {currentPage === "signup" && (
          <SignUp setCurrentPage={setCurrentPage}/>
        )}
      </div>
    </Modal>
    </>
    

  )

}

export default LandingPage