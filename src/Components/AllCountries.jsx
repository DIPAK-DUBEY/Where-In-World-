import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NativeDropdown from './NativeDropdown';
import Card from './Card';
import useStore from './ZustandState';
import Footer from './Footer';
import ShimmerMain from './ShimmerMain';
const AllCountries = () => {
  const Mode = useStore((store) => store.Mode);
  const Input = useStore((state) => state.Input)
  const setInput = useStore((state) => state.setInput)
  const [Data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const AllCountriesData = async () => {
    const Response = await axios('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,borders,cca3');
    setData(Response.data);
    setLoader(!loader);
  }
  const handlingInput = (e) => {
    setInput(e.target.value)
  }

  useEffect(() => {
    AllCountriesData();
  }, [])
  return (
    <>

      <div
        className={`${Mode ? 'bg-black max-w-[1350px] mx-auto text-white' : 'bg-white/35 text-black  max-w-[1350px] mx-auto'}`}>
        <div
          className=' flex justify-between   mb-5 flex-wrap  gap-5 px-3   min-w-[220px]'>
          <input
            className={`backdrop-blur-[18px] border border-white/35
              shadow-[0_8px_32px_rgba(0,0,0,0.20)] rounded-[10px] py-3   px-5 max-w-[200px]   ${Mode ? 'bg-black  text-white' : 'bg-white  text-black'} `}
            type="text"
            value={Input}
            placeholder='Search By Country'
            onChange={handlingInput}
          />
          <div
          >
            <NativeDropdown />
          </div>

        </div>
        <div className=' flex flex-wrap flex-row gap-5
         justify-around' >
          {
            loader &&
            <ShimmerMain />
          }
          {Data[0] &&

            (() => {
              const filtered = Data.filter((country) =>
                country.name.common
                  .toLowerCase()
                  .includes(Input.toLowerCase())
              );

              if (filtered.length > 0) {
                return filtered.map((country) => (
                  <Card key={country.cca3} country={country} />
                ));
              } else {
                return (

                  <h1 className='font-semibold text-2xl'>
                    No Country Name with
                    <span className='text-red-600'> {Input} </span> Found
                  </h1>
                );
              }
            })()

          }
        </div>

      </div>
      {Data[0] &&
        <Footer />

      }


    </>
  )
}
export default AllCountries