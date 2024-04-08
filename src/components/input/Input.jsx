import React from 'react'

function Input({className, placeholder, type, onInput, name}) {
  return (
    <input type={type} className={`border border-neutral-700 rounded-lg px-3 py-2 w-full ${className}`} placeholder={placeholder} onInput={onInput} name={name} />
  )
}

export default Input