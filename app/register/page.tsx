import { auth } from "../../auth";
import { redirect } from "next/navigation";

// Components
import RegisterForm from "../_components/forms/RegisterForm";

const Register = async () => {
  const session = await auth();

  if(session?.user) {
    redirect("/");
  }

  return (
    <main className='page-layout'>
      <RegisterForm />
    </main>
  )
}

export default Register;