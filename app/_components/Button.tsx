"use client"

import { MouseEventHandler } from "react";

type ButtonProps = {
  label: string,
  fontAwesomeIcon?: string,
  clickEvent?: MouseEventHandler<HTMLButtonElement>
  isDisabled: boolean
}

const Button = ({ label, fontAwesomeIcon, clickEvent, isDisabled }: ButtonProps) => {
  return (
    <button 
      onClick={clickEvent} 
      className={`p-1 border rounded-full bg-black border-gray-600 text-white dark:bg-blue-500 dark:border-blue-800 
      disabled:dark:border-black disabled:dark:bg-gray-600 disabled:bg-gray-600 hover:translate-y-1`}
      disabled={isDisabled ? true : false} >
        <i className={`pr-1 fa-solid ` + fontAwesomeIcon}></i>
        <span>{label}</span>
    </button>
  )
}

export default Button;