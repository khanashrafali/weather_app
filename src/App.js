import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import React from "react";
import WeatherForm from './components/weather_form';
import WeatherCard from './components/weather_card';
import Map from "./components/map";

function App() {

  const [weatherData, setWeatherData] = React.useState([]);
  const [coord, setCoord] = React.useState({
    lng: 0,
    lat: 0
  });

  const handleCoord = (newCoord) => {
    setCoord(newCoord)
  }
  
  const handleWeatherData = (newData) => {
    setWeatherData(newData)
  }

  return (
    <div className="App">
      <Header />
      <Map coord={coord} />
      <WeatherForm handleWeatherData={handleWeatherData} handleCoordData={handleCoord} />
      <WeatherCard weatherData={weatherData} />
    </div>
  );
}

export default App;
