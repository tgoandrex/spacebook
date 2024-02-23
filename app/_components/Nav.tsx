"use client"

import { useSession, signOut, signIn } from "next-auth/react"

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import Button from "./Button";
import { navLinksAuthenticatedUser, navLinksAuthenticatedAdmin, navLinksUnauthenticated } from "../_constants";

// Hooks
import useColorMode from "../_hooks/useColorMode";

import navIcon from "../_assets/icons/nav-icon.png";
import navIconDark from "../_assets/icons/nav-icon-dark.png";

const Nav = () => {
  const { data: session, status } = useSession()

  const [toggleOpen, setToggleOpen] = useState(false);
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

  const toggleMenu = () => {
    setToggleOpen(!toggleOpen);
  };
  
  return (
    <>
      <header className=" bg-[#4B91F1] dark:bg-black">
        <nav className="flex justify-between min-h-[75px]">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={navIcon.src}
                width={325}
                height={75}
                className="block dark:hidden"
                alt="navigation logo"
              />
              <Image
                src={navIconDark.src}
                width={325}
                height={75}
                className="hidden dark:block"
                alt="navigation logo"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <Button 
              label={colorMode === "light" ? "Space Mode" : "Light Mode"} 
              fontAwesomeIcon={colorMode === "light" ? "fa-moon" : "fa-sun"} 
              clickEvent={() => setColorMode(colorMode === "light" ? "dark" : "light")} 
              isDisabled={false}
            />
          </div>
          <ul className="flex items-center max-sm:hidden">
            {status === "authenticated" ? navLinksAuthenticatedAdmin.map((item) => (
              item.href === "/logout" ?
                <li 
                  key={item.label} 
                  className={`flex items-center px-2 dark:text-white text-lg list-none h-full cursor-pointer hover:bg-[#034694] 
                  hover:dark:bg-[#89CFF0] rounded-xl`}
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  {item.label}
                </li>
              :
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center px-2 dark:text-white text-lg list-none h-full cursor-pointer hover:bg-[#034694] 
                hover:dark:bg-[#89CFF0] rounded-xl`}
              >
                {item.label}
              </Link>
            )) :
            navLinksUnauthenticated.map((item) => (
              item.href === "/login" ?
                <li key={item.label}
                  className={`flex items-center px-2 dark:text-white text-lg list-none h-full cursor-pointer hover:bg-[#034694] 
                  hover:dark:bg-[#89CFF0] rounded-xl`}
                  onClick={() => signIn('email', { callbackUrl: '/' })}
                >
                  {item.label}
                </li>
              :
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center px-2 dark:text-white text-lg list-none h-full cursor-pointer hover:bg-[#034694] 
                  hover:dark:bg-[#89CFF0] rounded-xl`}
                >
                  {item.label}
                </Link>
            ))}
          </ul>
          <div className='hidden max-sm:flex mr-2'>
            <button className="relative group" onClick={toggleMenu}>
              <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-black dark:bg-[#4B91F1] ring-0 ring-gray-300 hover:ring-8 group-hover:ring-4 ring-opacity-30 duration-200 shadow-md">
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
        <nav className={`overflow-hidden ${toggleOpen ? 'max-h-[100vh]' : 'max-h-0'} duration-700 ease-in-out`}>
          <ul className="flex flex-col items-center text-center">
            {status === "authenticated" ? navLinksAuthenticatedAdmin.map((item) => (
              item.href === "/logout" ?
                <li key={item.label}
                  className={`dark:text-white text-lg py-1 my-2 cursor-pointer hover:bg-[#034694] hover:dark:bg-[#89CFF0] w-[30%] 
                  rounded-xl`}
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  {item.label}
                </li>
              :
                <Link key={item.label}
                  href={item.href}
                  className={`dark:text-white text-lg py-1 my-2 cursor-pointer hover:bg-[#034694] hover:dark:bg-[#89CFF0] w-[30%] rounded-xl`}
                >
                  {item.label}
                </Link>
            )) :
            navLinksUnauthenticated.map((item) => (
              item.href === "/login" ?
                <li key={item.label}
                  className={`dark:text-white text-lg py-1 my-2 cursor-pointer hover:bg-[#034694] hover:dark:bg-[#89CFF0] w-[30%] 
                  rounded-xl`}
                  onClick={() => signIn('email', { callbackUrl: '/' })}
                >
                  {item.label}
                </li>
              :
                <Link key={item.label}
                  href={item.href}
                  className={`dark:text-white text-lg py-1 my-2 cursor-pointer hover:bg-[#034694] hover:dark:bg-[#89CFF0] w-[30%] rounded-xl`}
                >
                  {item.label}
                </Link>
            ))}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Nav;