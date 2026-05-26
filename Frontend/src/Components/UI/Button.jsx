import React from 'react'

const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-lg bg-black text-white ${className}`}
    >
      {text}
    </button>
  )
}

export default Button