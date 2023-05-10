import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addSearchHistory } from "../redux/actions";

const WeatherForm = ({ handleWeatherData, handleCoordData }) => {
  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.searchHistory);
  const userId = JSON.parse(localStorage.getItem("user")).id;
  console.log("dsdssearchHistory==>", searchHistory[userId]);
  // const [weatherData, setWeatherData] = React.useState(null);
  const [weatherType, setWeatherType] = React.useState("");
  const [formData, setFormData] = React.useState({
    search: "",
  });

  const currentWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${formData.search}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`
      );
      console.log("current================>");
      const currentWeatherData = [
        {
          time: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          date: new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          weather: response.data.weather[0].description,
          temp: response.data.main.temp,
          pressure: response.data.main.pressure,
          minimum_temp: response.data.main.temp_min,
          maximum_temp: response.data.main.temp_max,
          humidity: response.data.main.humidity,
          id: response.data.id,
          cityName: response.data.name,
        },
      ];
      const coord = {
        lat: response.data.coord.lat,
        lng: response.data.coord.lon,
      };
      console.log("if==>", response);
      dispatch(addSearchHistory(userId, response.data.name));
      handleWeatherData(currentWeatherData);
      handleCoordData(coord);
    } catch (error) {
      console.log(error);
    }
  };

  const anotherWeather = async () => {
    try {
      console.log("else===>", formData);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${formData.search}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`
      );
      const currentWeatherData = [];
      console.log(response);
      response.data.list.map((data, index) =>
        currentWeatherData.push({
          time: new Date(data.dt_txt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          date: new Date(data.dt_txt).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          weather: data.weather[0].description,
          temp: data.main.temp,
          pressure: data.main.pressure,
          minimum_temp: data.main.temp_min,
          maximum_temp: data.main.temp_max,
          humidity: data.main.humidity,
          id: index,
          cityName: response.data.city.name,
        })
      );
      console.log("dfgsdfdfdsfd");
      const coord = {
        lat: response.data.city.coord.lat,
        lng: response.data.city.coord.lon,
      };
      dispatch(addSearchHistory(userId, response.data.city.name));
      handleWeatherData(currentWeatherData);
      handleCoordData(coord);
    } catch (error) {}
  };

  React.useEffect(() => {
    if (weatherType !== "" && formData.search !== "") {
      console.log(weatherType);
      if (weatherType === "Current Weather") currentWeather();
      else anotherWeather();
    }
  }, [weatherType, formData]);

  const handleFormData = (event) => {
    setFormData({ [event.target.name]: event.target.value });
  };

  const handleWeatherType = (weatherType) => {
    try {
      console.log(weatherType);
      setWeatherType(weatherType);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonArray = [
    { className: "current-weather-btn", weatherType: "Current Weather" },
    { className: "five-day-weather-btn", weatherType: "5 Day Weather" },
    { className: "seven-day-weather-btn", weatherType: "7 Day Weather" },
    {
      className: "forty-eight-hour-weather-btn",
      weatherType: "48 Hour Weather",
    },
  ];

  const buttonElements = buttonArray.map((b, index) => (
    <button
      key={index}
      class={b.className}
      onClick={() => handleWeatherType(b.weatherType)}
    >
      {b.weatherType}
    </button>
  ));

  return (
    <>
      <div class="search-container">
        <form>
          <input
            className="weather-input"
            type="text"
            autoComplete="off"
            placeholder="Enter city name..."
            name="search"
            value={formData.search}
            onChange={handleFormData}
            list="cities"
          />
        </form>
        <datalist id="cities">
          {searchHistory[userId]?.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </div>
      <div class="forecast-options">{buttonElements}</div>
    </>
  );
};

export default WeatherForm;
