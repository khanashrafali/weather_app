import React from "react";

const Home = () => {
  return (
    <>
      <div class="weather-container">
        <div class="weather-icons">
          <img class="weather-icon" src="weather.png" alt="weather icon" />
          <img class="weather-icon" src="weather1.png" alt="weather icon" />
          <img class="weather-icon" src="weather2.png" alt="weather icon" />
        </div>
        <div class="weather-header">
          <div class="weather-header-title">
            <h3>Today</h3>
          </div>
          <div class="weather-header-content">
            <p>
              If you are an Existing User then Please Click On Login...
              <br />
              Otherwise Please Register Yourself By Clicking on Register Button
            </p>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Home;
