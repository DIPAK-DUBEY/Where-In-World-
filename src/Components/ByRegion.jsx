import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router'
import NativeDropdown from './NativeDropdown'
import axios from 'axios'
import Card from './Card'
import useStore from './ZustandState'
import ShimmerMain from './ShimmerMain'
const ByRegion = () => {
  const { region } = useParams();
  const Mode = useStore((store) => store.Mode);
  const [Data, setData] = useState([]);
  const [loader,setloader]=useState(true);
  const FetchRegionData = async () => {
    try {
      const Response = await axios(`https://restcountries.com/v3.1/region/${region}?fields=name,flags,capital,region,population,borders,cca3`);
      setData(Response.data); // Response.data is already an array of countries
      setloader(!loader);
    } catch (error) {
      console.error("Error fetching region data:", error);
      setData([]); // Optionally clear data or set error state
    }
  }

  useEffect(() => {
    FetchRegionData();
  }, [region])
  return (
    <>
        <Navbar />  

      <div
        className=' text-black  max-w-[1430px] mx-auto px-[30px] py-[15px]  rounded-[50px]'>
        <div className="flex justify-between items-center p-3 sm:p-5 flex-wrap gap-4">
          <button
            className={`px-4 sm:px-8 py-2 rounded-md shadow cursor-pointer text-sm transition
              ${Mode
                ? "text-white bg-black border hover:shadow-lg"
                : "bg-white hover:shadow-lg"
              }`}
              onClick={() => window.history.back()}
              >
            Go-Back
          </button>
          <NativeDropdown />
        </div>
            {
              loader&&<ShimmerMain/>
            }
        <h1 className={` text-center font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl  
            border border-white/35 px-4 sm:px-8 py-2 rounded-md 
            shadow ${Mode ? ' text-white bg-black backdrop-blur-[18px] ' :'  text-black bg-white backdrop-blur-[18px]  '} `}>{region}</h1>
        <div className={`flex flex-wrap flex-row gap-5
         justify-around ${Mode ? 'text-white' : 'text-black'}`} >
          {
            Data.map((country, index) => {
              return (
                <Card key={index} country={country} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default ByRegion