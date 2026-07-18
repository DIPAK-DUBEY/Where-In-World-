import React from 'react'
import { useNavigate } from 'react-router';
import useStore from './ZustandState';
const Card = ({ index, country }) => {
  const Mode = useStore((store) => store.Mode)
  const navigate = useNavigate();
  return (
    <div key={index} onClick={() => navigate(`Country/${encodeURIComponent(country.name.common)}`)}
      className={`
        mt-4 w-[300px]
        ${Mode ? 'bg-black/50 border border-white' : 'bg-white border border-white/35'}
        backdrop-blur-[18px] 
        rounded-[10px] overflow-hidden
        shadow-[0_8px_32px_rgba(0,0,0,0.20)]
        cursor-pointer
        transform-gpu
        transition-all duration-300 ease-out
        hover:-translate-y-2
        hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)]
      `}
    >
      <img
        className='aspect-video object-cover '
        src={country.flags.svg} alt="" />
      <div
        className=' p-4 mt-8 mb-8 flex flex-col gap-2'
      >
        <h1> <span className='text-xl'>Name - </span>  {country.name.common}</h1>
        <h1> <span className='text-xl'>Capital - </span>  {country.capital[0] ? country.capital[0] : 'No Capital  Found'}</h1>
        <h1> <span className='text-xl'>Population - </span>  {country.population}</h1>
      </div>
    </div>


  )
}

export default Card