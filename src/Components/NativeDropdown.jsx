import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import useStore from "./ZustandState";
function NativeDropdown() {
  const navigate = useNavigate();
  const Mode = useStore((store) => store.Mode);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const continents = [
    "Asia",
    "Europe",
    "Oceania",
    "Antarctic",
    "Africa",
    "Americas",
  ];

  // click outside close
  useEffect(() => {
    function handleClickOutside(e) {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className=

      {
        `relative w-full max-w-[200px] rounded-[10px] 
          ${Mode ? 'bg-black/50 ' : 'bg-white '}`
      }>

      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`
           ${Mode ? 'bg-black/25 text-white  border' : 'bg-white/25 border border-white/35 text-black '}
          w-full text-center
          shadow-[0_8px_32px_rgba(0,0,0,0.20)]
          p-2 rounded-md  cursor-pointer
    `}
      >
        Select by Region
      </button>

      {/* Dropdown */}
      <ul
        className={`
           ${Mode ? 'bg-black text-white  border' : 'bg-white border border-white/35 text-black '}
          absolute left-0 mt-2 w-full z-50
          rounded-md shadow-lg
          transition-all duration-200 origin-top
          ${open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        {continents.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              navigate(`/Region/${item}`);
              setOpen(false);
            }}
            className={
              `${Mode ? 'hover:bg-white/15 cursor-pointer' : 'hover:bg-black/15 cursor-pointer'}
              px-4 py-2 `}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NativeDropdown;