import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "./Navbar";

import axios from "axios";
import StatesPopulationIndia from "./Population/StatesPopulationIndia.json";
import CountryDataOnClick from "./CountryDataOnClick";
import Footer from "./Footer";
import CountryPageShimmer from "./CountryPageShimmer";


const SingleCountry = () => {
  const [loader, setloader] = useState(true);
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [populationData, setPopulationData] = useState({
    Name: "",
    Population: "",
    CountryName: "",
    CountryPopulation: "",
  });

  // ---------------- POPULATION CHECK ----------------
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

  // ---------------- FETCH COUNTRY ----------------
  const fetchCountry = async () => {
    try {
      // reset old population data
      setPopulationData({
        Name: "",
        Population: "",
        CountryName: "",
        CountryPopulation: "",
      });

      const response = await axios(
        `https://restcountries.com/v3.1/name/${id}?fullText=true&fields=name,flags,capital,region,population,borders,cca3,timezones,coatOfArms,maps,languages,currencies,subregion,continents,latlng`
      );

      const country = response.data[0];

      setloader(!loader);
      setData(country);          // ✅ store object
      PopulationChecker(country); // ✅ calculate
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (id) fetchCountry();
    window.scrollTo(0,0);
  }, [id]);

  // ---------------- RENDER ----------------
  return (
    <>
      <Navbar />
      {
        loader &&
        <CountryPageShimmer />
      }

      <CountryDataOnClick
        data={data}                 // ✅ object pass
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