import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCity } from '../Redux/Actions/action';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      dispatch(setCity(input.trim()));
    }
  };

  return (
    
    <form className=" searchbar form-inline justify-content-center mb-5" onSubmit={handleSearch}>
      <input
        type="text"
        className="form-control mr-2"
        placeholder="Enter city name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit"  className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchBar;
