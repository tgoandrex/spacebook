"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

// Components
import Button from "./Button";
import { navLinks } from "../_constants";
import Modal from "./Modal";

// Hooks
import useColorMode from "../_hooks/useColorMode";

import navIcon from "../_assets/icons/nav-icon.png";
import navIconDark from "../_assets/icons/nav-icon-dark.png";

const Nav = () => {
  const [toggleOpen, setToggleOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 640) {
        setToggleOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);
  
  return (
    <>
      <header className=" bg-[#4B91F1] dark:bg-black">
        <nav className="flex justify-between">
          <Link href="/">
            <img src={navIcon.src} alt='logo' className="w-[225px] h-[75px] block dark:hidden" />
            <img src={navIconDark.src} alt='logo' className="w-[225px] h-[75px] hidden dark:block" />
          </Link>
          <div className="flex flex-col justify-center">
            <Button 
              label={colorMode === "light" ? "Space Mode" : "Light Mode"} 
              fontAwesomeIcon={colorMode === "light" ? "fa-moon" : "fa-sun"} 
              clickEvent={() => setColorMode(colorMode === "light" ? "dark" : "light")} 
              isDisabled={false}
            />
          </div>
          <div className="flex items-center gap-2 max-sm:hidden divide-x divide-black dark:divide-white">
            {navLinks.map((item) => (
              <li 
                key={item.label} 
                className="flex items-center px-2 dark:text-white text-lg list-none h-full cursor-pointer" 
                onClick={() => setModalType(item.label)}
              >
                {item.label}
              </li>
            ))}
          </div>
          <div className='hidden max-sm:flex mr-2'>
            <button className="relative group" onClick={() => setToggleOpen(!toggleOpen)}>
              <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-black ring-0 ring-gray-300 hover:ring-8 group-hover:ring-4 ring-opacity-30 duration-200 shadow-md">
                <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                  <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-hover:translate-y-6 delay-100"></div>
                  <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-hover:translate-y-6 delay-75"></div>
                  <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-hover:translate-y-6"></div>
                  <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-hover:translate-x-0 flex w-0 group-hover:w-12">
                  <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 group-hover:rotate-45"></div>
                  <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 group-hover:-rotate-45"></div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </nav>
        <nav className={toggleOpen ? "block" : "hidden"}>
          <ul className="flex flex-col text-center">
            {navLinks.map((item) => (
              <li 
                key={item.label} 
                className="dark:text-white text-lg py-3" 
                onClick={() => setModalType(item.label)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {modalType !== "" &&
        <Modal modalType={modalType} setModalType={setModalType} />
      }
    </>
  )
}

export default Nav;