import React from 'react'

function Button({className, children, onClick}) {
  return (
    <div className={`px-4 py-2 rounded-lg w-full text-center font-semibold text-md cursor-default ${className}`} onClick={onClick}>{children}</div>
  )
}

export default Button