import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
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
import { getCountryByCode } from "../Api/restCountries";
const BorderCountry = () => {
  const navigate = useNavigate();
  const Mode = useStore((store) => store.Mode);
  const { code } = useParams();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const fetchCountry = async () => {
    try {
      setError(null);
      const country = await getCountryByCode(code);
      if (!country) {
        setError("Country not found");
        setloading(false);
        return;
      }
      PopulationChecker(country);
      setData([country]);
      setloading(false);
    } catch (err) {
      setError(err.message);
      setloading(false);
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
  useEffect(() => {
    setPopulationData({
      Name: '',
      Population: '',
      CountryName: '',
      CountryPopulation: ''
    })
    fetchCountry();
    window.scrollTo(0, 0);
  }, [code]);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-red-600">{error}</h1>
            <button
              onClick={fetchCountry}
              className="mt-4 px-6 py-2 rounded-md bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  const items = data[0];
  const currenciesList = items ? Object.values(items.currencies || {}) : [];
  const languagesList = items ? Object.values(items.languages || {}) : [];

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
        </div>

        {loading && <CountryPageShimmer />}

        {items && (
          <>
        {/* Main Section */}
        <div className="mt-10 flex flex-col lg:flex-row gap-10  lg:items-start ">

          {/* Flag */}
            <div className="w-full lg:w-1/2 ">
              <img
                src={items.flags.svg}
                alt="flag"
                className={`w-full rounded-lg shadow-md object-contain ${Mode ? 'bg-black /80 backdrop-blur-[5px] shadow-[0_54px_32px_rgba(0,0,0,0.35),0_0_5px_rgba(255,255,255,0.9)]' : 'bg-white/25 backdrop-blur-[18px] border border-white/35 shadow-[0_8px_32px_rgba(0,0,0,0.20)]'}`}
              />
            </div>

          {/* Details */}
            <div className={`
            w-full text-base sm:text-lg lg:text-xl flex flex-col gap-5 
            ${Mode ? ' text-white' : ' text-black'}`}>
                <React.Fragment key={0}>

                {/* Info Grid */}
                <div className="flex flex-col md:flex-row gap-10 justify-start ">

                  {/* Left Column */}
                  <div className="flex flex-col gap-3">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-3">
                        {items.flagEmoji && <span className="mr-2">{items.flagEmoji}</span>}
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

                      {items.subregion && (
                    <h1>
                      <span className="font-semibold">Subregion:</span>{" "}
                        <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>{items.subregion}</span>
                    </h1>
                      )}

                      {items.continents?.length > 0 && (
                    <h1>
                      <span className="font-semibold">Continent:</span>{" "}
                        <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>{items.continents.join(", ")}</span>
                    </h1>
                      )}
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-3 justify-end">
                    <h1>
                      <span className="font-semibold">CCA3 Code:</span>{" "}
                        <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>{items.cca3}</span>
                    </h1>

                      {items.cca2 && (
                    <h1>
                      <span className="font-semibold">CCA2:</span>{" "}
                        <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>{items.cca2}</span>
                    </h1>
                      )}

                      {items.tlds?.length > 0 && (
                    <h1>
                      <span className="font-semibold">TLD:</span>{" "}
                        <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>{items.tlds.join(", ")}</span>
                    </h1>
                      )}

                      {items.callingCodes?.length > 0 && (
                    <h1>
                      <span className="font-semibold">Calling Code:</span>{" "}
                        <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>+{items.callingCodes.join(", +")}</span>
                    </h1>
                      )}

                    <h1>
                      <span className="font-semibold">Timezone:</span>{" "}
                        <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>
                          {items.timezones[0]}
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

                {/* Extra Info */}
                  {(currenciesList.length > 0 || languagesList.length > 0 || items.area?.kilometers) && (
                  <div className="flex flex-col md:flex-row gap-10 mt-2">
                      {currenciesList.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <h1 className="font-semibold">Currencies</h1>
                          {currenciesList.map((c, i) => (
                            <span key={i} className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>
                              {c.symbol || ""} {c.name}
                          </span>
                        ))}
                      </div>
                      )}
                      {languagesList.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <h1 className="font-semibold">Languages</h1>
                          {languagesList.map((lang, i) => (
                            <span key={i} className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>{lang}</span>
                        ))}
                      </div>
                      )}
                      {items.area?.kilometers && (
                      <div className="flex flex-col gap-2">
                        <h1 className="font-semibold">Area</h1>
                          <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>
                            {items.area.kilometers.toLocaleString()} km²
                            {items.area.miles && ` (${items.area.miles.toLocaleString()} mi²)`}
                        </span>
                          <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>
                            {items.landlocked ? "Landlocked" : "Has coastline"}
                        </span>
                      </div>
                      )}
                  </div>
                  )}

                  {items.timezones?.length > 1 && (
                  <h1>
                    <span className="font-semibold">All Timezones:</span>{" "}
                      <span className={` ${Mode ? 'text-white/50' : 'text-gray-600'}`}>{items.timezones.join(", ")}</span>
                  </h1>
                  )}

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
hover:shadow-lg hover:-translate-y-1px
active:scale-[0.97]
${Mode
                            ? 'bg-neutral-900 text-white border border-neutral-700 hover:bg-neutral-800'
                            : 'bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-100'
                          }`}
                        onClick={() => navigate(`/Border/${Border}`)}
                      >
                        {Border}
                      </button>
                    ))}
                </div>

              </React.Fragment>
          </div>
        </div>

            {/* Population */}
            {populationData?.Population > 100000 && (
          <div className="mt-10 flex flex-col gap-5">
                <PopulationChart populationData={populationData} />

                {populationData.CountryName !== "India" &&
                  populationData.CountryName !== "China" && (
                <div className="text-center">
                  <h1 className="text-xl font-semibold">
                      Population of {items.name.common} ≈{" "}
                    {populationData.Name}
                  </h1>
                  <h1>
                    India population is{" "}
                      <span className={` text-2xl${Mode ? 'text-red-600' : 'text-green-600'}`}>
                        {Math.floor(
                          1417492000 / items.population
                      )}
                    </span>
                    x greater.
                  </h1>
                </div>
              )}
          </div>
            )}

            {/* Map */}
            {data[0] &&
          <CountryMap
              key={items.cca3}
              countryName={items.name.common}
            geoCountry={geoCountry}
              lat={items.latlng[0]}
              lng={items.latlng[1]}
          />
            }
          </>
        )}

        {
          data &&
          <Footer />
        }
      </div>
    </>
  );
};

export default BorderCountry;