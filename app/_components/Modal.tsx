"use client"

// Components
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";

interface ModalProps {
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}

const Modal: React.FC<ModalProps> = ({ modalType, setModalType }) => {
  return (
    <section>
      <div className="fixed top-[45%] left-[25%] sm:left-[45%] bg-white z-10 p-4 border rounded-lg">
        {modalType === "Login" ? <LoginForm /> : <RegisterForm />}
      </div>
      <div onClick={() => setModalType("")} className="fixed top-0 left-0 w-full h-full opacity-50 bg-black"></div>
    </section>
  )
}

export default Modal;