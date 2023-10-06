"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

import Button from "./Button";
import { navDesktop, navMobile } from "../constants";

import icon from "../../public/nav-icon.png";

const Nav = () => {
  const [toggleOpen, setToggleOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 768) {
        setToggleOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []);
  
  return (
    <header className=" bg-[#4B91F1] dark:bg-black">
      <nav className="flex justify-between">
        <Link href="/">
          <img src={icon.src} alt='logo' className="w-[225px] h-[75px]" />
        </Link>
        <div className="flex flex-col justify-center">
          <Button label="Space Mode" fontAwesomeIcon="fa-moon" />
        </div>
        <div className="flex flex-col justify-around max-md:hidden mr-2">
          {navDesktop.map((item) => (
            <form action={item.href}>
              <Button label={item.label} fontAwesomeIcon={item.fontAwesomeIcon} />
            </form>
          ))}
        </div>
        <div className='hidden max-md:flex mr-2'>
          <button className="relative group" onClick={() => setToggleOpen(!toggleOpen)}>
            <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-black ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6 delay-100"></div>
                <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-y-6 delay-75"></div>
                <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6"></div>
                <div className="absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 group-focus:translate-x-0 flex w-0 group-focus:w-12">
                <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45"></div>
                <div className="absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45"></div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </nav>
      <nav className={toggleOpen ? "block" : "hidden"}>
        <ul className="flex flex-col text-center">
          {navMobile.map((item) => (
            <li key={item.label} className="py-3 text-white">
              <Link href={item.href} className="text-lg">{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Nav;