import React, { useRef, useState } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //     setPreviewUrl(reader.result);
            //     setImage(file);
            //     setPreview(file);
            // };
            // reader.readAsDataURL(file);

            setImage(file);

            const preview = URL.createObjectURL(file);
            if (setPreview) {
                setPreview(preview);
            }
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        if (setPreview) {
            setPreview(null);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    }

    return (
        <div className='flex justify-center mb-6'>
            <input type="file" ref={inputRef} onChange={handleImageChange} accept='image/*' className='hidden' />
            {!image ? (
                <div className='w-20 h-20 flex items-center justify-center gap-4 bg-orange-50 rounded-full relative cursor-pointer '>
                    <LuUser size={44} className='text-4xl text-orange-500' />
                    <button type='button' onClick={onChooseFile} className='w-8 h-8 flex items-center justify-center bg-linear-to-r from-orange-300/85 to-orange-600 rounded-full text-white hover:bg-orange-600 transition-colors duration-300 absolute -right-1 -bottom-1 cursor-pointer'>
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img src={previewUrl || preview} alt="Profile Photo" className='w-20 h-20 rounded-full object-cover' />
                        <button type='button' onClick={handleRemoveImage} className='w-8 h-8 flex items-center justify-center bg-linear-to-r from-orange-300/85 to-orange-600 rounded-full text-white hover:bg-orange-600 transition-colors duration-300 absolute -right-1 -bottom-1 cursor-pointer'>
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfilePhotoSelector