import React from 'react'
import { LuX } from 'react-icons/lu'

const Drawer = ({
    isOpen,
    onClose,
    title,
    children
}) => {
    return (
        <>
            <div
                className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            ></div>

            <div className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white text-black shadow-lg transform transition-transform duration-300 z-100 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
                    <h2 className='text-lg font-semibold'>{title}</h2>
                    <button onClick={onClose} className='p-2 rounded-full hover:bg-gray-100 transition-colors'>
                        <LuX size={20} />
                    </button>
                </div>

                <div className='flex-1 p-6 overflow-y-auto'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Drawer