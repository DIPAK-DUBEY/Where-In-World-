import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import CalculateTime from "./CalculateTime";
import StatesPopulationIndia from "./Population/StatesPopulationIndia.json"
import PopulationChart from "./Population/PopulationChart";
import useStore from "./ZustandState";
import Footer from "./Footer";
import CountryMap from "../CountryMap";
import countriesGeo from './Mapdata.json';
import CountryPageShimmer from "./CountryPageShimmer";
import { useMemo } from "react";

const BorderCountry = () => {
  const navigate = useNavigate();
  const Mode = useStore((store) => store.Mode);
  const { code } = useParams();
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const fetchCountry = async () => {
    try {
      const response = await axios(
        `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,capital,region,population,borders,cca3,timezones,coatOfArms,maps,latlng

`

      );
      PopulationChecker(response.data);
      setData([response.data]);
      setloading((prev)=>prev=false);
    } catch (err) {
      console.log("error", err);
    }
  };
  const geoCountry = useMemo(() => {
    return countriesGeo.features.find(c =>
      c.properties.name
        .toLowerCase()
        .includes(data[0]?.name?.common?.toLowerCase())
    );
  }, [data[0]?.name?.common]);
  const [populationData, setPopulationData] = useState({
    Name: '',
    Population: '',
    CountryName: '',
    CountryPopulation: ''
  });
  const PopulationChecker = (dataa) => {
    const statesPopulationComparasion = StatesPopulationIndia;
    if (dataa.population > 60000 && dataa.population <= 199812341) {
      for (let i of statesPopulationComparasion) {
        if (i.value < dataa.population) {

          setPopulationData({
            Name: i.state,
            Population: i.value,
            CountryName: dataa.name.common,
            CountryPopulation: dataa.population
          })
          break;
        }
      }
    } else if (dataa.population > 199812341 && dataa.population < 500000000) {
      setPopulationData({
        Name: 'India',
        Population: 1417492000,
        CountryName: dataa.name.common,
        CountryPopulation: dataa.population
      })
    } else if (dataa.population > 500000000) {
      setPopulationData({
        Name: 'Europe , Australia , SouthAmerica ',
        Population: 1611782000,
        CountryName: dataa.name.common,
        CountryPopulation: dataa.population
      })
    }
  }
  const lat = (data[0]?.latlng[0]);
  const lng = (data[0]?.latlng[1]);
  useEffect(() => {
    setPopulationData({
      Name: '',
      Population: '',
      CountryName: '',
      CountryPopulation: ''
    })
    fetchCountry();
    window.scrollTo(0,0);
  }, [code]);

  return (
    <>

      <Navbar />
      <div className={`${Mode ? 'bg-black max-w-[1350px] mx-auto text-white' : 'bg-white text-black  max-w-[1350px] mx-auto'}`}>


        {/* Top Section */}
        <div className="flex justify-between items-center p-3 sm:p-5">
          <button
            className={
              ` px-4 sm:px-8 py-2 rounded-md
            shadow  sm:text-base cursor-pointer ${Mode ? 'text-white bg-black  border backdrop-blur-[18px]hover:shadow-lg transition text-sm' : 'bg-white backdrop-blur-[18px] hover:shadow-lg transition text-sm'}`
            }
            onClick={() => window.history.back()}
          >
            Go-Back
          </button>

          {data[0] && data[0].coatOfArms?.png && (
            <img
              className="w-10 sm:w-14 lg:w-16"
              src={data[0].coatOfArms.png}
              alt={`${data[0].name?.common || "Coat of Arms"}`}
            />
          )}
        </div>
        {
          loading &&
          <CountryPageShimmer />
        }

        {/* Main Section */}
        <div className="mt-10 flex flex-col lg:flex-row gap-10  lg:items-start ">

          {/* Flag */}
          {data[0] && (
            <div className="w-full lg:w-1/2 ">
              <img
                src={data[0].flags.svg}
                alt="flag"
                className={`w-full rounded-lg shadow-md object-contain ${Mode ? 'bg-black /80 backdrop-blur-[5px] shadow-[0_54px_32px_rgba(0,0,0,0.35),0_0_5px_rgba(255,255,255,0.9)]' : 'bg-white/25 backdrop-blur-[18px] border border-white/35 shadow-[0_8px_32px_rgba(0,0,0,0.20)]'}`}
              />
            </div>
          )}

          {/* Details */}
          <div className={`
            w-full text-base sm:text-lg lg:text-xl flex flex-col gap-5 
            ${Mode ? ' text-white' : ' text-black'}`}>
            {data.map((items, idx) => (
              <React.Fragment key={idx}>

                {/* Info Grid */}
                <div className="flex flex-col md:flex-row gap-10 justify-start ">

                  {/* Left Column */}
                  <div className="flex flex-col gap-3">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-3">
                      {items.name.common}
                    </h1>

                    <h1>
                      <span className="font-semibold">Full Name:</span>{" "}
                      <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>
                        {items.name.official}
                      </span>
                    </h1>

                    <h1>
                      <span className="font-semibold">Capital:</span>{" "}
                      <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>

                        {items.capital?.[0] || "None"}
                      </span>
                    </h1>

                    <h1>
                      <span className="font-semibold">Population:</span>{" "}
                      <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>

                        {items.population?.toLocaleString()}
                      </span>
                    </h1>

                    <h1>
                      <span className="font-semibold">Region:</span>{" "}
                      <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>{items.region}</span>
                    </h1>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-3 justify-end">
                    <h1>
                      <span className="font-semibold">CCA3 Code:</span>{" "}
                      <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>{items.cca3}</span>
                    </h1>

                    <h1>
                      <span className="font-semibold">Timezone:</span>{" "}
                      <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>
                        {
                          items.timezones[0]

                        }
                      </span>
                    </h1>
                    <h1>
                      <span className="font-semibold">Time : </span>
                      <span className={` ${Mode ? 'text-red-600' : 'text-green-600'}`}>
                        <CalculateTime e={items.timezones[0]} />
                      </span>

                    </h1>
                  </div>
                </div>

                {/* Borders Section */}
                <div className="flex flex-wrap gap-3 sm:gap-5 items-center justify-baseline ">
                  {items.borders?.length > 0 && (
                    <h1 className="text-lg sm:text-xl font-semibold">
                      Borders:
                    </h1>
                  )}

                  {items.borders?.length > 0 &&
                    items.borders.map((Border) => (
                      <button
                        key={Border}
                        className={`px-4 sm:px-6 py-1 rounded-md cursor-pointer
shadow-sm text-sm sm:text-base
transition-all duration-300 ease-in-out
backdrop-blur-[18px]
hover:shadow-lg hover:-translate-y-[1px]
active:scale-[0.97]
${Mode
                            ? 'bg-neutral-900 text-white border border-neutral-700 hover:bg-neutral-800'
                            : 'bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-100'
                          }`}
                        onClick={() => navigate(`/country/${Border}`)}
                      >
                        {Border}
                      </button>
                    ))}
                </div>

              </React.Fragment>
            ))}

          </div>
        </div>
        {populationData?.Population > 100000 && (
          <div className="mt-10 flex flex-col gap-5">
            <PopulationChart populationData={populationData} />

            {populationData.CountryName !== "India" &&
              populationData.CountryName !== "China" && (
                <div className="text-center">
                  <h1 className="text-xl font-semibold">
                    Population of {data[0].name.common} ≈{" "}
                    {populationData.Name}
                  </h1>
                  <h1>
                    India population is{" "}
                    <span className={` text-2xl${Mode ? 'text-red-600' : 'text-green-600'}`}>
                      {Math.floor(
                        1417492000 / data[0].population
                      )}
                    </span>
                    x greater.
                  </h1>
                </div>
              )}
          </div>
        )}
        {data[0] &&
          <CountryMap
            countryName={data[0]?.name?.common}
            geoCountry={geoCountry}
            lat={data[0].latlng[0]}
            lng={data[0].latlng[1]}
          />
        }
        {
          data &&
          <Footer />
        }
      </div>
    </>
  );
};

export default BorderCountry;
