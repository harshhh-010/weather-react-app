import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWeather, setForecast, setError, setLoading } from '../Redux/Actions/action';
import axios from 'axios';
import SearchBar from './SearchBar';
import WeatherDisplay from './WeatherDisplay';
import ForecastItem from './ForecastItem';
import '../index.css';


const WeatherApp = () => {
  const dispatch = useDispatch();
  const city = useSelector((state) => state.weather.city);
  const unit = useSelector((state) => state.weather.unit);
  const forecast = useSelector((state) => state.weather.forecast);
  const [activeTab, setActiveTab] = useState('daily');

  const fetchWeatherData = useCallback(async (city, unit) => {
    dispatch(setLoading(true));
    try {
      const apiKey = '8c6ad31fcd9db1911bd8107fce141860';
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`);
      
      dispatch(setWeather(weatherResponse.data));

      // Filter forecast data to get one entry per day for daily forecast
      const dailyForecast = forecastResponse.data.list.filter((item) => item.dt_txt.includes('12:00:00'));
      dispatch(setForecast(forecastResponse.data.list));
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError('City not found'));
    }
    dispatch(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (city) {
      fetchWeatherData(city, unit);
    }
  }, [city, unit, fetchWeatherData]);

  const today = new Date().toISOString().split('T')[0];
  const dailyForecast = forecast.filter((item) => item.dt_txt.includes('12:00:00'));
  const hourlyForecast = forecast.filter((item) => item.dt_txt.startsWith(today));

  return (
    <div className="container-fluid weather-app">
      <SearchBar />
      <WeatherDisplay />
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'daily' ? 'active' : ''}`}
            id="daily-tab"
            data-toggle="tab"
            href="#daily"
            role="tab"
            aria-controls="daily"
            aria-selected={activeTab === 'daily'}
            onClick={() => setActiveTab('daily')}
          >
            Daily
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'hourly' ? 'active' : ''}`}
            id="hourly-tab"
            data-toggle="tab"
            href="#hourly"
            role="tab"
            aria-controls="hourly"
            aria-selected={activeTab === 'hourly'}
            onClick={() => setActiveTab('hourly')}
          >
            Hourly
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className={`tab-pane fade ${activeTab === 'daily' ? 'show active' : ''}`} id="daily" role="tabpanel" aria-labelledby="daily-tab">
          <div className="row tab-data">
            {dailyForecast.map((item, index) => (
              <div className="block col-md-2" key={index}>
                <ForecastItem data={item} />
              </div>
            ))}
          </div>
        </div>
        <div className={`tab-pane fade ${activeTab === 'hourly' ? 'show active' : ''}`} id="hourly" role="tabpanel" aria-labelledby="hourly-tab">
          <div className="row tab-data">
            {hourlyForecast.map((item, index) => (
              <div className='block col-md-2' key={index}>
                <ForecastItem data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
