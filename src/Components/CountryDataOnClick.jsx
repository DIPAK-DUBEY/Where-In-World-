import React from "react";
import { useNavigate } from "react-router";
import CalculateTime from "./CalculateTime";
import PopulationChart from "./Population/PopulationChart";
import useStore from "./ZustandState";
const CountryDataOnClick = ({ data, populationData }) => {
  const navigate = useNavigate();
  const Mode = useStore((store) => store.Mode);



  if (!data) return null;

  const lat = data?.latlng?.[0];
  const lng = data?.latlng?.[1];

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

        {data.coatOfArms?.png && (
          <img
            className="w-10 sm:w-14 lg:w-16"
            src={data.coatOfArms.png}
            alt={data.name.common}
          />
        )}
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
            </div>

            {/* Right */}
            <div className="flex flex-col gap-3 justify-end">
              <h1>
                <b>CCA3:</b>{" "}
                <span className="opacity-60">{data.cca3}</span>
              </h1>

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
                onClick={() => navigate(`/country/${border}`)}
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
      {lat && lng && (
        <div className="mt-20 mb-5">
          <iframe
            title="Country Map"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 5},${lat - 5},${lng + 5},${lat + 5}&layer=mapnik`}
          />
        </div>
      )}
    </div>
  );
};

export default CountryDataOnClick;