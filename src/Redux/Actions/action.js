export const SET_CITY = 'SET_CITY';
export const SET_WEATHER = 'SET_WEATHER';
export const SET_FORECAST = 'SET_FORECAST';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const TOGGLE_UNIT = 'TOGGLE_UNIT';

export const setCity = (city) => ({
    type: 'SET_CITY',
    payload: city,});

export const setWeather = (weather) => (
    { type: SET_WEATHER, 
        payload: weather });

export const setForecast = (forecast) => (
    { type: SET_FORECAST, 
        payload: forecast });

export const setError = (error) => (
    { type: SET_ERROR,
       payload: error });

export const setLoading = (isLoading) => (
    { type: SET_LOADING,
        payload: isLoading });

export const toggleUnit = () => (
    { type: TOGGLE_UNIT });
