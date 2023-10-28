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
      <div className="fixed top-[25%] left-[17%] sm:left-[40%] bg-white dark:bg-slate-700 z-20 pb-6 px-6 border border-black rounded-lg">
        <div className="flex justify-end mb-1">
          <span className="text-2xl cursor-pointer dark:text-white" onClick={() => setModalType("")}>X</span>
        </div>
        {modalType === "Login" ? <LoginForm /> : modalType === "Register" ? <RegisterForm /> : <div>There was an error</div>}
      </div>
      <div onClick={() => setModalType("")} className="fixed top-0 left-0 w-full h-full opacity-50 bg-black"></div>
    </section>
  )
}

export default Modal;