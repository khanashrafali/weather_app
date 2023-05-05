import React from "react";

const WeatherCard = (props) => {
  const weatherCardElements = props.weatherData.map((data) => (
    <div key={data.id} class="weather-card-container">
      <div class="weather-card">
        <div class="weather-card-header">
          {data.time} <br />
          {data.date}
        </div>
        <div class="weather-card-body">
          <div className="city-name">{data.cityName}</div>
          <img
            class="weather-icon"
            src="https://www.weatherbit.io/static/img/icons/t01d.png"
            alt="weather icon"
          />
          <div class="weather-description">{data.weather}</div>
          <div class="temperature">
            {data.temp}
            <span>&deg;C</span>
          </div>
          <div class="wind">
            pressure: <br />
            {data.pressure} km/h || Minimum:{data.minimum_temp}
            <span>&deg;C</span> || Maximum: {data.maximum_temp}
            <span>&deg;C</span> || Humidity: {data.humidity}%
          </div>
          {/* <div class="humidity">
                        Humidity: 60%
                        </div> */}
        </div>
      </div>
    </div>
  ));
  return <>{weatherCardElements}</>;
};

export default WeatherCard;
