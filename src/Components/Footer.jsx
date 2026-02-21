import React from 'react'
import useStore from './ZustandState'
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin, FaGithub } from "react-icons/fa";
const Footer = () => {
  const Mode = useStore((store) => store.Mode);
  return (
    <>
      <div
        className={`flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 md:gap-0 px-5 sm:px-10 md:px-[10%] mt-20  text-xl mb-15
        ${Mode ? 'text-white' : 'text-black'}
        `}
      >
        <h1 className="text-center mb-4 md:mb-0">
          Made with <span>❤️</span> By Dipak
        </h1>

        <div className="flex flex-row gap-3 sm:gap-5 flex-wrap justify-center items-center">
          <a
            href="https://x.com/Dipakdu59626304"
            className="hover:text-green-600 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTwitterX />
          </a>
          <a
            href="https://github.com/DIPAK-DUBEY"
            className="hover:text-green-600 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://monkeytype.com/account"
            className="hover:text-green-600 flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </>
  )
}

export default Footer