import Card from "./card"
import { useEffect, useState } from "react"
import "./card.css"
function App() {
  const [weatherData , setWeatherData] = useState({})

  let response;
  async function fetchData(){
    try{
   response = await fetch('http://localhost:3030/getData');
   if(!response.ok){
    console.log("no response")
   }
   let responseData = await response.json()
   
   console.log(responseData)
   const cleanedData = Object.fromEntries(
    Object.entries(responseData.data).map(([key, value]) => {
        if (key === 'hyderabad' || key === 'bengaluru'|| key === "chennai" || key === "kolkata" || key === "delhi" || key === "mumbai") {
            return [
                key,
                value.map(({ _id, createdAt, updatedAt, ...rest }) => rest)
            ];
        }
        return [key, []]; // Return an empty array for other cities
    })
);
console.log(cleanedData)
   setWeatherData(cleanedData)
    }catch(err){
      console.log("error in fetching")
    }
  }
  useEffect(function(){
      fetchData();
      const intervalId = setInterval(fetchData, 5 * 60 * 1000);

      return () => clearInterval(intervalId); 
  },[])
  return (
    <div className="App">
      <Card data = {weatherData} />
    </div>
  );
}

export default App;
