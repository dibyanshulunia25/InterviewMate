import React from 'react'

const DeleteAlertContent = ({content, onDelete}) => {
  return (
    <div className='p-5'>
        <p className='text-center text-[18px]'>{content}</p>
        <div className='flex items-center justify-end gap-4 mt-5'>
            <button type='button' className='btn-small' onClick={onDelete}>Delete</button>
        </div>
    </div>
  )
}

export default DeleteAlertContent