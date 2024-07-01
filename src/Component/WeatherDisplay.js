import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureHalf } from '@fortawesome/free-solid-svg-icons'

const WeatherDisplay = () => {
  const weather = useSelector((state) => state.weather.weather);
  const isLoading = useSelector((state) => state.weather.isLoading);
  const error = useSelector((state) => state.weather.error);
  const getIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (!weather) {
    return <div className="text-center">No weather data available. Please search for a city.</div>;
  }

  return (
    <>
    <p className='city-name'>{weather.name}</p>
    <div className="Present-day container-fluid">
      <div className="top-part-disc col-md-4">
        <img src={getIconUrl(weather.weather[0].icon)} />
        <div className="disc col-md-8">
          <h1>{weather.main.temp}°C</h1>
          <h2>{weather.weather[0].description}</h2>
        </div>
      </div>

      <div className="top-part col-md-2">
        <h1>{weather.main.humidity}%</h1>
        <h2>Humidity</h2>
      </div>
      <div className="top-part col-md-2">
        <h1>{weather.main.feels_like}°C</h1>
        <h2>Feels Like</h2>
      </div>
      <div className="top-part-min col-md-2">
        <h2>Temprature</h2>
        <div className='min-max'>
          <p>{weather.main.temp_min}°C <br />Minimum</p>
          <p>{weather.main.temp_max}°C <br />Maximum</p>
        </div>
        
      </div>
    </div>
    </>
    
  );
};

export default WeatherDisplay;
