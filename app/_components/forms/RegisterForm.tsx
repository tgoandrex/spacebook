import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

import prisma from "../../../prisma/lib/prisma";

// Components
import Button from "../Button";

const validateUsername = (username: string) => {
  const minLength = 4;
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;

  if (username.length < minLength) {
    return false;
  }
  if (!alphanumericRegex.test(username)) {
    return false;
  }
  return true;
};

const validatePassword = (password: string) => {
  const minLength = 8;
  const hasNumber = /\d/;
  const hasUpperCase = /[A-Z]/;

  if (password.length < minLength) {
    return false;
  }
  if (!hasNumber.test(password)) {
    return false;
  }
  if (!hasUpperCase.test(password)) {
    return false;
  }
  return true;
};

const RegisterForm = async () => {
  const register = async (formData: FormData) => {
    "use server"
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!validateUsername(username)) {
      throw new Error('Username does not meet the requirements: Minimum 4 characters in length, contain only alphanumeric values.');
    }

    if (!validatePassword(password)) {
      throw new Error('Password does not meet the requirements: Minimum 8 characters in length, contain at least one capital letter, contain at least one number.');
    }
    
    try {
      const usernameExists = await prisma.user.findUnique({
        where: {
          username: username
        }
      })

      if(usernameExists) {
        throw new Error('Username is already in use');
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, async function(err, hash) {
            await prisma.user.create({
              data: {
                username: username,
                password: hash
              }
            });
          });
        });
      }
    } catch (e) {
      throw new Error('Failed to register new user');
    }
    redirect('/');
  }
  
  return (
    <form action={register} className="flex flex-col dark:text-white md:w-96 mx-auto">
      <h3 className="text-2xl mb-4 text-center">Register a New Account</h3>
      <label htmlFor="username" className="mb-3 w-full">
        Username<br />
        <span className="text-xs">(Minimum 4 characters in length, contain only alphanumeric values)</span><br />
        <input type="text" id="username" name="username" className="border border-gray-800 w-full text-black" maxLength={20} required />
      </label>
      <label htmlFor="password" className="mb-3 w-full">
        Password <br />
        <span className="text-xs">(Minimum 8 characters in length, contain at least one capital letter, contain at least one number)</span><br />
        <input type="password" id="password" name="password" className="border border-gray-800 w-full text-black" maxLength={30} required />
      </label>
      <Button label="Register" isDisabled={false} />
    </form>
  )
}

export default RegisterForm;