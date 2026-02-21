import Navbar from "./Components/Navbar";
import AllCountries from "./Components/AllCountries";
import { useEffect } from "react";
import useStore from "./Components/ZustandState";
const App = () => {
  const Mode = useStore((store) => store.Mode);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", !Mode);
  }, [Mode]);
  return (
    <>
      <Navbar />

      <AllCountries />
    </>
  );
};

export default App;