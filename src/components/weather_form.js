import React from "react";
import axios from "axios";

const WeatherForm = ({handleWeatherData, handleCoord}) => {

    // const [weatherData, setWeatherData] = React.useState(null);
    const [weatherType, setWeatherType] = React.useState('');
    const [formData, setFormData] =React.useState({
        search: ""
    })

    const currentWeather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${formData.search}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`);
            const currentWeatherData = [
                {
                    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                    date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }),
                    weather: response.data.weather[0].description,
                    temp: response.data.main.temp,
                    pressure: response.data.main.pressure,
                    minimum_temp: response.data.main.temp_min,
                    maximum_temp: response.data.main.temp_max,
                    humidity: response.data.main.humidity,
                    id: response.data.id
                }
            ]
            const coord = {
                lat: response.data.coord.lat,
                lng: response.data.coord.lon
            };
            console.log('if==>',response)
            handleWeatherData(currentWeatherData);
            handleCoord(coord);
        } catch (error) {
            console.log(error)
        }
    };

    const anotherWeather = async () => {
        try {
            console.log('else===>')
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${formData.search}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`);
            const currentWeatherData = [];
            response.data.list.map((data,index) => (
                currentWeatherData.push({
                    time: new Date(data.dt_txt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                    date: new Date(data.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }),
                    weather: data.weather[0].description,
                    temp: data.main.temp,
                    pressure: data.main.pressure,
                    minimum_temp: data.main.temp_min,
                    maximum_temp: data.main.temp_max,
                    humidity: data.main.humidity,
                    id: index
                })
            ))
            console.log(response)
            handleWeatherData(currentWeatherData);
        } catch (error) {
            
        }
    }

    React.useEffect(() => {
        if(weatherType !== "" && formData.search !== "") {
            console.log(weatherType)
            if(weatherType==="Current Weather") currentWeather();
            else anotherWeather();
        }
    }, [weatherType]);

    const handleFormData = (event) => {
        setFormData({[event.target.name]: event.target.value});
    }

    const handleWeatherType = (weatherType) => {
        try {
            console.log(weatherType)
            setWeatherType(weatherType);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div class="search-container">
                <form>
                    <input type="text" placeholder="Enter city name..." name="search" value={formData.search} onChange={handleFormData} />
                </form>
            </div>
                <div class="forecast-options">
                <button class="current-weather-btn" onClick={() => handleWeatherType('Current Weather')}>Current Weather</button>
                <button class="five-day-weather-btn" onClick={() => handleWeatherType('5 Day Weather')}>5 Day Weather</button>
                <button class="seven-day-weather-btn" onClick={() => handleWeatherType('7 Day Weather')}>7 Day Weather</button>
                <button class="forty-eight-hour-weather-btn" onClick={() => handleWeatherType('48 Hour Weather')}>48 Hour Weather</button>
            </div>
        </>
    )
}

export default WeatherForm;