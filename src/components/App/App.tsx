import { useState } from 'react';

import Header from '../Header/Header';
import WeatherWidget from '../WeatherWidget/WeatherWidget';
import ErrorMessage from '../Error/Error';
import Footer from '../Footer/Footer';

import './App.scss';

function App() {
  const [city, setCity] = useState('');
  const [isCityCorrect, setIsCityCorrect] = useState(true);
  const [cityNameError, setCityNameError] = useState('');
  const [unit, setUnit] = useState('metric');

  const handleSubmit = async (city: string) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.cod === "404") {
      setIsCityCorrect(false);
      setCityNameError(city);
    } else {
      setCity(city);
      setIsCityCorrect(true);
      setCityNameError('');
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  }

  return (
    <>
      <button onClick={toggleUnit}>{unit === 'metric' ? 'Celcius (C°)' : 'Farenheit (F°)'}</button>
        <div className='app'>
          <Header onSubmit={handleSubmit} />
          {!isCityCorrect && <ErrorMessage city={cityNameError} />}
          {city && isCityCorrect && <WeatherWidget city={city} unit={unit} />}
        </div>
      <Footer />
    </>
  );
}

export default App;
