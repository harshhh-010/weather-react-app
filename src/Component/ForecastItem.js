import React from 'react';
import '../index.css'

const ForecastItem = ({ data }) => {
  const date = new Date(data.dt * 1000);
  const dateTime = date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  const day = date.toLocaleDateString(undefined, { weekday: 'long' });
  const time = date.toLocaleTimeString();
  const getIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  return (
    <div className='daily-block'>
      <p className='day'>{dateTime}</p>
      <p className='time'>{time}</p>
      <img src={getIconUrl(data.weather[0].icon)} />
      <p className='temp'>{data.main.temp}°C</p>
    </div>
  );
};

export default ForecastItem;
