import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherForm from "./components/weather_form";
import WeatherCard from "./components/weather_card";
import Map from "./components/map";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";

function App() {
  const [weatherData, setWeatherData] = React.useState([]);
  const [coord, setCoord] = React.useState({
    lng: -122.4194,
    lat: 37.7749,
  });

  const handleCoord = (newCoord) => {
    console.log("handlecoord");
    setCoord(newCoord);
  };

  const handleWeatherData = (newData) => {
    setWeatherData(newData);
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            // render={(props) => <Home {...props} />}
            Component={() => <Home />}
          />
          <Route path="/register" Component={() => <Register />} />
          <Route path="/login" Component={() => <Login />} />
          <Route
            path="/dashboard"
            element={[
              <Map coord={coord} />,
              <WeatherForm
                handleWeatherData={handleWeatherData}
                handleCoordData={handleCoord}
              />,
              <WeatherCard weatherData={weatherData} />,
            ]}
          />
        </Routes>
        {/* <Login /> */}
        {/* <Map coord={coord} />
        <WeatherForm
          handleWeatherData={handleWeatherData}
          handleCoordData={handleCoord}
        />
        <WeatherCard weatherData={weatherData} /> */}
      </Router>
    </div>
  );
}

export default App;
