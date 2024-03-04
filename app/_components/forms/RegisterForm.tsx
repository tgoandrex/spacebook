'use client'

// Components
import { authFormFields } from "../../_constants";
import Button from "../Button";

const RegisterForm = () => {
  return (
    <form className="flex flex-col dark:text-white md:w-96 mx-auto">
      <h3 className="text-2xl mb-4 text-center">Register a New Account</h3>
      {authFormFields.map((field) => (
        <label key={field.label} htmlFor={field.label} className="mb-3 w-full">
          {field.label}<br />
          <input id={field.label} type={field.type} name={field.label} className="border border-gray-800 w-full text-black" required />
        </label>
      ))}
      <Button label="Register" isDisabled={true} />
    </form>
  )
}

export default RegisterForm;