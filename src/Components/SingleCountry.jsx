import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "./Navbar";
import StatesPopulationIndia from "./Population/StatesPopulationIndia.json";
import CountryDataOnClick from "./CountryDataOnClick";
import Footer from "./Footer";
import CountryPageShimmer from "./CountryPageShimmer";
import { getCountryByName } from "../Api/restCountries";

const SingleCountry = () => {
  const [loader, setloader] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [populationData, setPopulationData] = useState({
    Name: "",
    Population: "",
    CountryName: "",
    CountryPopulation: "",
  });

  const PopulationChecker = (country) => {
    const states = StatesPopulationIndia;

    if (
      country.population > 60000 &&
      country.population <= 199812341
    ) {
      for (let i of states) {
        if (i.value < country.population) {
          setPopulationData({
            Name: i.state,
            Population: i.value,
            CountryName: country.name.common,
            CountryPopulation: country.population,
          });
          break;
        }
      }
    } else if (
      country.population > 199812341 &&
      country.population < 500000000
    ) {
      setPopulationData({
        Name: "India",
        Population: 1417492000,
        CountryName: country.name.common,
        CountryPopulation: country.population,
      });
    } else if (country.population > 500000000) {
      setPopulationData({
        Name: "Europe , Australia , SouthAmerica",
        Population: 1611782000,
        CountryName: country.name.common,
        CountryPopulation: country.population,
      });
    }
  };

  const fetchCountry = async () => {
    try {
      setError(null);
      setPopulationData({
        Name: "",
        Population: "",
        CountryName: "",
        CountryPopulation: "",
      });

      const country = await getCountryByName(id);
      if (!country) {
        setError("Country not found");
        setloader(false);
        return;
      }

      setloader(false);
      setData(country);
      PopulationChecker(country);
    } catch (err) {
      setError(err.message);
      setloader(false);
    }
  };

  useEffect(() => {
    if (id) fetchCountry();
    window.scrollTo(0,0);
  }, [id]);

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

  return (
    <>
      <Navbar />
      {
        loader &&
        <CountryPageShimmer />
      }

      <CountryDataOnClick
        data={data}
        populationData={populationData}
      />
      {
        data &&
        <Footer />
      }
    </>
  );
};

export default SingleCountry;