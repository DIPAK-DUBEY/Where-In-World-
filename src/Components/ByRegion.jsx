import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router'
import NativeDropdown from './NativeDropdown'
import Card from './Card'
import useStore from './ZustandState'
import ShimmerMain from './ShimmerMain'
import InputBySearch from './InputBySearch'
import { getCountriesByRegion } from "../Api/restCountries";
const ByRegion = () => {
  const { region } = useParams();
  const Input = useStore((store) => store.Input);
  const Mode = useStore((store) => store.Mode);
  const [Data, setData] = useState([]);
  const [loader, setloader] = useState(true);
  const [error, setError] = useState(null);
  const FetchRegionData = async () => {
    try {
      setError(null);
      setloader(true);
      const data = await getCountriesByRegion(region);
      setData(data);
      setloader(false);
    } catch (error) {
      setError(error.message);
      setloader(false);
      setData([]);
    }
  }

  useEffect(() => {
    FetchRegionData();
  }, [region])

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-red-600">{error}</h1>
            <button
              onClick={FetchRegionData}
              className="mt-4 px-6 py-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        className=' text-black  max-w-[1430px] mx-auto px-[30px] py-[15px]  rounded-[50px]'>
        <div className="flex justify-between  items-center  sm:p-5 flex-wrap gap-4 m-1 ">
          <div className='flex gap-5 flex-wrap mt-3'>

            <InputBySearch />
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
          </div>
          <NativeDropdown />
        </div>
        {
          loader && <ShimmerMain />
        }
        <h1 className={` text-center font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl  
            border border-white/35 px-4 sm:px-8 py-2 rounded-md 
            shadow ${Mode ? ' text-white bg-black backdrop-blur-[18px] ' : '  text-black bg-white backdrop-blur-[18px]  '} `}>{region}</h1>
        <div className={`flex flex-wrap flex-row gap-5
         justify-around ${Mode ? 'text-white' : 'text-black'}`} >
          {
            (() => {
              const filtered = Data.filter((country) =>
                country.cca3
                  .toLowerCase()
                  .includes(Input.toLowerCase()) || country.name.common
                    .toLowerCase()
                    .includes(Input.toLowerCase())
              );
              if (filtered.length > 0) {
                return filtered.map((country) => (
                  <Card key={country.cca3} country={country} />
                ));
              } else {
                return (

                  <h1 className='font-semibold text-2xl mt-15'>
                    No Country Name with
                    <span className='text-red-600'> {Input} </span> Found
                  </h1>
                );
              }
            })()
          }
        </div>
      </div>
    </>
  )
}

export default ByRegion