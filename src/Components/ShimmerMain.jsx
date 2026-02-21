import React from 'react'
import useStore from './ZustandState'
import './ShimmerMaincss.css'
const ShimmerMain = () => {
  const newArarry  = [1,2,3,4,5,67,8,9,8,88,8,88,8,8,8,88,8,88,8,88,8,8,8];
  const Mode = useStore((store) => store.Mode)
 return (
   newArarry.map((items, index)=>{
  return (
    <div key={index}
      className={`
    relative mt-4 min-w-[250px] max-[300px]:min-w-[220px] h-[350px] rounded-[10px] overflow-hidden
    ${!Mode ? 'bg-[#f3f3f3]' : 'bg-[#111111]'}
  `}
    >

      {/* SHIMMER */}
      <div
        className={`
      absolute inset-0 pointer-events-none
      bg-gradient-to-r
      from-transparent
      ${!Mode ? 'via-white/60' : 'via-white/10'}
      to-transparent
      animate-[shimmer_1.4s_linear_infinite]
    `}
      />

      {/* image skeleton */}
      <div
        className={`w-full h-[50%] ${!Mode ? 'bg-[#e5e5e5]' : 'bg-[#1f1f1f]'
          }`}
      />

      {/* text lines */}
      <div className={`w-3/4 h-4 mt-6 mx-4 rounded ${!Mode ? 'bg-[#e5e5e5]' : 'bg-[#1f1f1f]'}`} />
      <div className={`w-2/3 h-4 mt-3 mx-4 rounded ${!Mode ? 'bg-[#e5e5e5]' : 'bg-[#1f1f1f]'}`} />
      <div className={`w-1/2 h-4 mt-5 mx-4 rounded ${!Mode ? 'bg-[#e5e5e5]' : 'bg-[#1f1f1f]'}`} />

    </div>
  )
})
 )
}

export default ShimmerMain