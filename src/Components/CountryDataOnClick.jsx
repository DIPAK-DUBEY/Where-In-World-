import React from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import CalculateTime from "./CalculateTime";
import PopulationChart from "./Population/PopulationChart";
import useStore from "./ZustandState";
import CountryMap from "../CountryMap";
import countriesGeo from "./Mapdata.json";
const CountryDataOnClick = ({ data, populationData }) => {
  const navigate = useNavigate();
  const Mode = useStore((store) => store.Mode);

  const geoCountry = useMemo(() => {
    return countriesGeo.features.find(c =>
      c.properties.name
        .toLowerCase()
        .includes(data?.name?.common?.toLowerCase())
    );
  }, [data?.name?.common]);

  if (!data) return null;

  const currenciesList = Object.values(data.currencies || {});
  const languagesList = Object.values(data.languages || {}).slice(0, 3);

  return (
    <div
      className={`${Mode
        ? "bg-black text-white"
        : "bg-white text-black"
        } max-w-[1350px] mx-auto`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center p-3 sm:p-5">
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

        <h1 className="text-2xl sm:text-3xl font-medium">
          {data.flagEmoji && <span className="mr-2">{data.flagEmoji}</span>}
          {data.name.common}
        </h1>
      </div>

      {/* Main Section */}
      <div className="mt-10 flex flex-col lg:flex-row gap-10">
        {/* Flag */}
        <div className="w-full lg:w-1/2">
          <img
            src={data.flags.svg}
            alt="flag"
            className={`w-full rounded-lg shadow-md object-contain ${Mode ? 'bg-black /80 backdrop-blur-[5px] shadow-[0_54px_32px_rgba(0,0,0,0.35),0_0_5px_rgba(255,255,255,0.9)]' : 'bg-white/25 backdrop-blur-[18px] border border-white/35 shadow-[0_8px_32px_rgba(0,0,0,0.20)]'}`}
          />
        </div>

        {/* Details */}
        <div className="w-full text-base sm:text-lg lg:text-xl flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left */}
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-medium">
                {data.name.common}
              </h1>

              <h1>
                <b>Full Name:</b>{" "}
                <span className="opacity-60">
                  {data.name.official}
                </span>
              </h1>

              <h1>
                <b>Capital:</b>{" "}
                <span className="opacity-60">
                  {data.capital?.[0] || "None"}
                </span>
              </h1>

              <h1>
                <b>Population:</b>{" "}
                <span className="opacity-60">
                  {data.population.toLocaleString()}
                </span>
              </h1>

              <h1>
                <b>Region:</b>{" "}
                <span className="opacity-60">{data.region}</span>
              </h1>

              {data.subregion && (
                <h1>
                  <b>Subregion:</b>{" "}
                  <span className="opacity-60">{data.subregion}</span>
                </h1>
              )}

              {data.continents?.length > 0 && (
                <h1>
                  <b>Continent:</b>{" "}
                  <span className="opacity-60">{data.continents.join(", ")}</span>
                </h1>
              )}
            </div>

            {/* Right */}
            <div className="flex flex-col gap-3 justify-end">
              <h1>
                <b>CCA3:</b>{" "}
                <span className="opacity-60">{data.cca3}</span>
              </h1>

              {data.cca2 && (
                <h1>
                  <b>CCA2:</b>{" "}
                  <span className="opacity-60">{data.cca2}</span>
                </h1>
              )}

              {data.tlds?.length > 0 && (
                <h1>
                  <b>TLD:</b>{" "}
                  <span className="opacity-60">{data.tlds.join(", ")}</span>
                </h1>
              )}

              {data.callingCodes?.length > 0 && (
                <h1>
                  <b>Calling Code:</b>{" "}
                  <span className="opacity-60">+{data.callingCodes.join(", +")}</span>
                </h1>
              )}

              <h1>
                <b>Timezone:</b>{" "}
                <span className="opacity-60">
                  {data.timezones[0]}
                </span>
              </h1>

              <h1>
                <b>Time:</b>{" "}
                <CalculateTime e={data.timezones[0]} />
              </h1>
            </div>
          </div>

          {/* Extra Info Row */}
          {(currenciesList.length > 0 || languagesList.length > 0 || data.area?.kilometers) && (
            <div className="flex flex-col md:flex-row gap-10 mt-2">
              {currenciesList.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold">Currencies</h1>
                  {currenciesList.map((c, i) => (
                    <span key={i} className="opacity-60">
                      {c.symbol || ""} {c.name}
                    </span>
                  ))}
                </div>
              )}
              {languagesList.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold">Languages</h1>
                  {languagesList.map((lang, i) => (
                    i < 3 ? <span key={i} className="opacity-60">{lang}</span> : null
                  ))}
                </div>
              )}
              {data.area?.kilometers && (
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold">Area</h1>
                  <span className="opacity-60">
                    {data.area.kilometers.toLocaleString()} km²
                    {data.area.miles && ` (${data.area.miles.toLocaleString()} mi²)`}
                  </span>
                  <span className="opacity-60">
                    {data.landlocked ? "Landlocked" : "Has coastline"}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Multiple Timezones */}
          {data.timezones?.length > 1 && (
            <h1>
              <b>All Timezones:</b>{" "}
              <span className="opacity-60">{data.timezones.join(", ")}</span>
            </h1>
          )}

          {/* Borders */}
          <div className="flex flex-wrap gap-3 items-center">
            {data.borders?.length > 0 && <h1>Borders:</h1>}

            {data.borders?.map((border) => (
              <button
                key={border}
                className={`px-4 sm:px-6 py-1 rounded-md cursor-pointer
shadow-sm text-sm sm:text-base
transition-all duration-300 ease-in-out
backdrop-blur-[18px]
hover:shadow-lg hover:-translate-y-px
active:scale-[0.97]
${Mode
                    ? 'bg-neutral-900 text-white border border-neutral-700 hover:bg-neutral-800'
                    : 'bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-100'
                  }`}
                onClick={() => navigate(`/Border/${border}`)}
              >
                {border}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Population Section */}
      {populationData?.Population > 100000 && (
        <div className="mt-10 flex flex-col gap-5">
          <PopulationChart populationData={populationData} />

          {populationData.CountryName !== "India" &&
            populationData.CountryName !== "China" && (
              <div className="text-center">
                <h1 className="text-xl font-semibold">
                  Population of {data.name.common} ≈{" "}
                  {populationData.Name}
                </h1>

                <h1>
                  India population is{" "}
                  <span className={`${Mode ? 'text-red-600' : 'text-green-600'}`}>

                    {Math.floor(
                      1417492000 / data.population
                    )}
                  </span>
                  x greater.
                </h1>
              </div>
            )}
        </div>
      )}

      {/* Map */}
      {data &&
        <CountryMap
          countryName={data?.name?.common}
          geoCountry={geoCountry}
          lat={data?.latlng[0]}
          lng={data?.latlng[1]}
        />
      }

    </div>
  );
};

export default CountryDataOnClick;