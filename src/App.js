import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";

const url = "https://restcountries.com/v3.1/all";

const App = () => {

  const [isloading, setIsloading]= useState(true);
  const [error, setError]= useState(null);
  const [countries,setCountries]=useState([]);

  const fetchData = async (url)=>{
    setIsloading(true);
    try{
      const response = await fetch(url);
    const data= await response.json();
    setCountries(data);
    setIsloading(false);
    setError(null);
    }catch(error){
      setIsloading(false);
      setError(error);
    }
  }

useEffect(() => {
 fetchData(url)
}, [])


  return (
    <>
      <h1> Let's Explore The World ...</h1>
      {isloading && <h2>Loading.. </h2>}
      {error && <h2>{error.message} </h2>}
      {countries && <Countries countries={countries} />}
    </>
  );
};

export default App;
