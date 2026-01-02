import React from 'react'
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../Utils/helper';

const SummaryCard = ({
    colors,
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
    onSelect,
    onDelete,
}) => {
    return (
        <div className='bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-gray-300 transition-all duration-300 relative group' onClick={onSelect}>
            <div className='rounded-lg p-4 cursor-pointer relative' style={{background: colors.bgcolor}}>
                <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#bbf9e9] to-[#d7fff6] rounded-lg flex items-center justify-center'>
                       <span className='text-lg font-semibold text-gray-800'>{getInitials(role)}</span> 
                    </div>

                    {/* content container */}
                    <div className='flex-grow'>
                        <div className='flex justify-between items-start'>
                            {/* title and skills */}
                            <div>
                                <h2 className='text-[17px] font-md'>{role}</h2>
                                <p className='text-xs font-medium text-gray-900'>{topicsToFocus}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-500/20 px-2 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-500 cursor-pointer absolute top-0 right-2 transition-colors ease-in-out duration-300 mt-2' onClick={(e)=>{
                    e.stopPropagation();
                    onDelete();
                }}>
                    <LuTrash2 />
                </button>
            </div>
            <div className='p-3'>
                <div className='flex items-center gap-3 mt-4'>
                    <div className='text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
                        Experience: {experience} {experience === 1 ? "Year" : "Years"}
                    </div>
                    <div className='text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
                        Questions: {questions}
                    </div>
                    <div className='text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full'>
                        Last Updated: {lastUpdated}
                    </div>
                    </div>
                    {/* Desciprtion */}
                    <p className='mt-2 text-[12px] font-medium text-gray-900 line-clamp-2'>{description}</p>
                </div>
            </div>
    )
}

export default SummaryCard