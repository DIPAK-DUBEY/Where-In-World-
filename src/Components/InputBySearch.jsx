import React from 'react'
import useStore from './ZustandState'
const InputBySearch = () => {
  const Mode  = useStore((store)=>store.Mode);
  const Input = useStore((store)=>store.Input);
  const setInput = useStore((store)=>store.setInput);
  const handlingInput = (e) => {
    setInput(e.target.value)
  }
  return (
    <input
      className={`backdrop-blur-[18px] border border-white/35
              shadow-[0_8px_32px_rgba(0,0,0,0.20)] rounded-[10px] py-3   px-5 max-w-[200px]   ${Mode ? 'bg-black  text-white' : 'bg-white  text-black'} `}
      type="text"
      value={Input}
      placeholder='Search By Country'
      onChange={handlingInput}
    />
  )
}

export default InputBySearch