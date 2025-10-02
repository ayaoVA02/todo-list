import React from 'react'

function Input({label,id, type, value, onChange, placeholder, required , error}) {
    return (
        <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-700'>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full p-2 border  rounded-md focus:border-blue-400
                     focus:outline-none ${error ? 'border-red-500': 'border-gray-300'}`}
                required={required}
            />
            {error && <p className='text-sm text-red-500'>{error}</p>}
        </div>
    )
}

export default Input