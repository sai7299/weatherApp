


import "./card.css"

export default function Card({data}) {
    // Check if data exists and is an object
    if (!data || Object.keys(data).length === 0) {
        return <p>No data available</p>;
        
    }
    return (
        <>
            <div className="cards">
                {Object.entries(data).map(([city, weatherArray]) => {
                    if (weatherArray.length === 0) {
                        return null;
                    }
                    
                    return (
                        <div className="card" key={city}>
                            <h2>{city.charAt(0).toUpperCase() + city.slice(1)}</h2>
                            {weatherArray.map((weather, index) => (
                                <div key={index}>
                                    <p>Weather: {weather.weather}</p>
                                    <p>Min Temp: {weather.min_temp.$numberDecimal}°C</p>
                                    <p>Max Temp: {weather.max_temp.$numberDecimal}°C</p>
                                    <p>Current Temp: {weather.temp.$numberDecimal}°C</p>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </>
    );

}

