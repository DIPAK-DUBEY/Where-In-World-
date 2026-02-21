import { Bar } from "react-chartjs-2";
import "../../Charts/chartSetup";
import useStore from "../ZustandState";

export default function PopulationChart({ populationData }) {
  if (!populationData) return null;
  const Mode = useStore((store)=>store.Mode);

  const data = {
    labels: [
      populationData.CountryName,
      populationData.Name,
    ],
    datasets: [
      {
        label: "Population",
        data: [
          populationData.CountryPopulation,
          populationData.Population,
        ],
        backgroundColor: ['red', 'aqua'] 
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color:  "green",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color:  "green",
        },
        grid: {
          color: "violet",
        },
      },
      y: {
        ticks: {
          color:  "blue",
        },
        grid: {
          color:  "gray",
        },
      },
    },
  };

  return (
    <div className=" max-h-[400px] w-[100%] flex justify-center   ">
      <Bar data={data} options={options} />
    </div>
  );
}
