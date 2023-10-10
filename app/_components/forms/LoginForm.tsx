// Components
import { authFormFields } from "../../_constants";
import Button from "../Button";

const LoginForm = () => {
  return (
    <form className="flex flex-col dark:text-white">
      <h3 className="text-2xl mb-4">Login to Your Account</h3>
      {authFormFields.map((field) => (
        <label key={field.label} htmlFor={field.label} className="mb-3">
          {field.label}<br />
          <input id={field.label} type={field.type} name={field.label} className="border border-gray-800 w-full"  required />
        </label>
      ))}
      <Button label="Login" isDisabled={true} />
    </form>
  )
}

export default LoginForm;