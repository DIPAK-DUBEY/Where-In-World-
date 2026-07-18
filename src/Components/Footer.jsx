import React from 'react'
import useStore from './ZustandState'
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin, FaGithub } from "react-icons/fa";
const Footer = () => {
  const Mode = useStore((store) => store.Mode);
  return (
    <div
      className={`${
        Mode
          ? 'bg-black/80 backdrop-blur-[18px] border text-white shadow-[0_0_5px_rgba(255,255,255,0.9)]'
          : 'bg-white/25 backdrop-blur-[18px] border border-white/35 text-black shadow-[0_8px_32px_rgba(0,0,0,0.20)]'
      } flex items-center justify-between flex-wrap gap-4
         max-w-[1350px] mx-auto px-[30px] py-[15px] my-5 rounded-[50px]`}
    >
      <h1 className="text-base sm:text-lg">
        Made with <span>❤️</span> By Dipak
      </h1>

      <div className="flex flex-row gap-5 items-center">
        <a
          href="https://x.com/Dipakdu59626304"
          className="hover:text-green-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTwitterX size={20} />
        </a>
        <a
          href="https://github.com/DIPAK-DUBEY"
          className="hover:text-green-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/dipak-dubey-81775924b/"
          className="hover:text-green-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={20} />
        </a>
      </div>
    </div>
  )
}

export default Footer