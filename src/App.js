import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";

const url = "https://restcountries.com/v2/all";

const App = () => {

  const [isloading, setIsloading]= useState(true);
  const [error, setError]= useState(null);
  const [countries,setCountries]=useState([]);
    const [filteredCountries, setFilteredCountries] = useState([countries]);


  const fetchData = async (url)=>{
    setIsloading(true);
    try{
      const response = await fetch(url);
    const data= await response.json();
    setCountries(data);
    setFilteredCountries(data);
    setIsloading(false);
    setError(null);
    }catch(error){
      setIsloading(false);
      setError(error);
    }
  }

useEffect( () => {
  fetchData(url)
}, [])

const handleRemoveCountry=(name)=>{
const filter= filteredCountries.filter((country)=> country.name.common !== name);
setFilteredCountries(filter);
 }

  return (
    <>
      <h1> Let's Explore The World ...</h1>
      {isloading && <h2>Loading.. </h2>}
      {error && <h2>{error.message} </h2>}
      {countries && (
        <Countries
          countries={filteredCountries}
          onRemoveCountry={handleRemoveCountry}
        />
      )}
    </>
  );
};

export default App;
