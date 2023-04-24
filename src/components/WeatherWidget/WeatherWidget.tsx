import { useEffect, useState } from 'react';
import axios from 'axios';

import './WeatherWidget.scss';


interface WeatherWidgetProps {
    city: string;
}

function WeatherWidget({ city }: WeatherWidgetProps) {

    const [temperature, setTemperature] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('04d');

    useEffect(
        () => {
            const fetchTemperature = async () => {

                const API_KEY = import.meta.env.VITE_API_KEY;

                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

                setTemperature(Math.round(result.data.main.temp));
                setDescription(result.data.weather[0].description);
                setIcon(result.data.weather[0].icon);
            }
            fetchTemperature()
        },
        [city]
    );

    return (
        <div className="meteo">
            <div>
                <div className="meteo-city">{city}</div>
                <div className="meteo-temperature">{temperature}°C</div>
                <div className="meteo-description">{description.charAt(0).toUpperCase() + description.slice(1)}</div>
            </div>
            <div>
                <img src={`https://openweathermap.org/img/wn/${icon}.png`} />
            </div>
        </div>
    );
}

export default WeatherWidget;