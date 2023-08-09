import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";



function App() {
  const [city, setCity] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = import.meta.env.VITE_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${api}&q=${city}`;

  const getWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        setLoading(true);
        const { data } = await axios.get(url);
        setInfo(data);
        setCity("");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(
          error.response && error.response.status === 400
            ? "City Not Found!"
            : error.message
        );
        setCity("");
      }
    }
  };

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);
      setInfo(data);
      setCity("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response && error.response.status === 400
          ? "City Not Found!"
          : error.message
      );
      setCity("");
    }
  };

  const resetApp = () => {
    setInfo(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Toaster />

      <h1 className="text-5xl font-bold text-center mt-5">Weather App</h1>

      <div className="text-center bg-white border-2 border-black rounded-xl mt-6 p-4 w-full max-w-lg">
        <div className="flex items-center justify-center space-x-4">
          <input
            type="text"
            className="flex-grow outline-none p-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 w-3/4"
            placeholder="Enter City Name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={getWeather}
          />
          <button
            className="bg-blue-500 text-white rounded-lg p-2 w-1/4"
            onClick={fetchWeather}
          >
            {loading ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#fff"
                className="animate-spin"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="4"
                  strokeDasharray="80"
                  strokeDashoffset="60"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    dur="2s"
                    values="0;360"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            ) : (
              "Search"
            )}
          </button>
        </div>

        {info && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Weather Details:</h2>
            <h1 className="text-3xl mb-2">{info.location.name}</h1>
            <div className="flex items-center justify-center">
              <img
                src={`https:${info.current.condition.icon}`}
                alt={info.current.condition.text}
                className="w-16 h-16"
              />
              <h1 className="text-3xl ml-2">
                {info.current.temp_c}°C / {info.current.temp_f}°F
              </h1>
            </div>
            <p className="text-lg m-2">
                Condition: {info.current.condition.text}
              </p>
              <p className="text-lg m-2">
                Wind: {info.current.wind_mph} mph / {info.current.wind_kph} kph, {info.current.wind_dir}
              </p>
              <p className="text-lg m-2">
                Pressure: {info.current.pressure_mb} mb / {info.current.pressure_in} in
              </p>
              <p className="text-lg m-2">
                Humidity: {info.current.humidity}%
              </p>
              <p className="text-lg m-2">
                Cloud Cover: {info.current.cloud}%
              </p>
              <p className="text-lg m-2">
                Feels Like: {info.current.feelslike_c}°C / {info.current.feelslike_f}°F
              </p>
              <p className="text-lg m-2">
                Visibility: {info.current.vis_km} km / {info.current.vis_miles} miles
              </p>
              <p className="text-lg m-2">UV Index: {info.current.uv}</p>
              <p className="text-lg m-2">
                Gusts: {info.current.gust_mph} mph / {info.current.gust_kph} kph
              </p>
              <p className="text-lg m-2">
                Last Updated: {info.current.last_updated}
              </p>
          </div>
        )}

        {!info && !loading && (
          <div className="no-data mt-4">
            <p>Search for a city to get weather information.</p>
          </div>
        )}

        {info && (
          <button
            onClick={resetApp}
            className="bg-blue-500 text-white rounded-lg p-2 mt-4 w-full"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
