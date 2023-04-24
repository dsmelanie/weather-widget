import { useState, FormEvent } from 'react';
import WeatherWidget from '../WeatherWidget/WeatherWidget';
import logo from '../../assets/logo.png';
import './App.scss';
import Footer from '../Footer/Footer';

function App() {
  const [city, setCity] = useState('');
  const [isCityCorrect, setIsCityCorrect] = useState(true);
  const [cityNameError, setCityNameError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const cityName = formData.get("cityInput") as string;

    const API_KEY = import.meta.env.VITE_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === "404") {
      setIsCityCorrect(false);
      setCityNameError(cityName);
    } else {
      setCity(cityName);
      setIsCityCorrect(true);
      setCityNameError('');
    }
  };

  return (
    <>
      <div className='app'>
        <h2><img width='50px' src={logo} alt="Logo"/>&nbsp;Weather Widget</h2>
        <form onSubmit={handleSubmit}>
          <input id="city-input" type="text" name="cityInput" placeholder='Enter a city..' />
        </form>
        {!isCityCorrect && <p className='error-message'>"{cityNameError}" cannot be found, please try again.</p>}
        {city && isCityCorrect && <WeatherWidget city={city} />}
      </div>
      <Footer />
    </>
  );
}

export default App;
