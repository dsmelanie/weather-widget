import { useEffect, useState } from 'react';
import axios from 'axios';

import './WeatherWidget.scss';


interface WeatherWidgetProps {
    city: string;
    unit: string;
}

function WeatherWidget({ city, unit }: WeatherWidgetProps) {

    const [temperature, setTemperature] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('04d');

    useEffect(
        () => {
            const fetchTemperature = async () => {

                const API_KEY = import.meta.env.VITE_API_KEY;
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`);

                setTemperature(Math.round(result.data.main.temp));
                setDescription(result.data.weather[0].description);
                setIcon(result.data.weather[0].icon);
            }
            fetchTemperature()
        },
        [city, unit]
    );

    const displayTemperature = () => {
        if (unit === 'imperial') {
            return Math.round(temperature * 1.8 + 32) + '°F';
        }
        return temperature + '°C';
    }

    return (
        <div className="meteo">
            <div>
                <div className="meteo-city">{city}</div>
                <div className="meteo-temperature">{displayTemperature()}</div>
                <div className="meteo-description">{description.charAt(0).toUpperCase() + description.slice(1)}</div>
            </div>
            <div>
                <img src={`https://openweathermap.org/img/wn/${icon}.png`} />
            </div>
        </div>
    );
}

export default WeatherWidget;
