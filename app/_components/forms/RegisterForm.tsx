import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import prisma from "../../../prisma/lib/prisma";

// Components
import Button from "../Button";

const RegisterForm = async () => {
  const register = async (formData: FormData) => {
    "use server"
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    
    try {

      const usernameExists = await prisma.user.findUnique({
        where: {
          username: username
        }
      })

      if(usernameExists) {
        console.log('Username already exists');
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, async function(err, hash) {
            await prisma.user.create({
              data: {
                username: username,
                password: hash
              }
            });
            revalidatePath('/');
          });
        });
      }
    } catch (e) {
      console.log('Failed to register new user');
    }
  }
  
  return (
    <form action={register} className="flex flex-col dark:text-white md:w-96 mx-auto">
      <h3 className="text-2xl mb-4 text-center">Register a New Account</h3>
      <label htmlFor="username" className="mb-3 w-full">
        Username<br />
        <input type="text" id="username" name="username" className="border border-gray-800 w-full text-black" maxLength={20} required />
      </label>
      <label htmlFor="password" className="mb-3 w-full">
        Password<br />
        <input type="password" id="password" name="password" className="border border-gray-800 w-full text-black" maxLength={30} required />
      </label>
      <Button label="Register" isDisabled={false} />
    </form>
  )
}

export default RegisterForm;