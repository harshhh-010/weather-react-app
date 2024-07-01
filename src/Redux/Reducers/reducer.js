import { combineReducers } from 'redux';
import {SET_CITY,SET_WEATHER,SET_FORECAST,SET_ERROR,SET_LOADING,TOGGLE_UNIT} from '../Actions/action';

const initialState = {
  city: '',
  weather: null,
  forecast: [],
  error: null,
  isLoading: false,
  unit: 'metric', 
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CITY':
      return {...state,city: action.payload,};
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    case SET_FORECAST:
      return { ...state, forecast: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case TOGGLE_UNIT:
      return { ...state, unit: state.unit === 'metric' ? 'imperial' : 'metric' };
    default:
      return state;
  }
};

export default combineReducers({
  weather: weatherReducer,
});
