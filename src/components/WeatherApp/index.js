import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";

import "./index.css";

import searchIcon from "../images/search.png";
import cloudIcon from "../images/cloud.png";
import rainIcon from "../images/rain.png";
import snowIcon from "../images/snow.png";
import clearIcon from "../images/clear.png";
import drizzleIcon from "../images/drizzle.png";
import windIcon from "../images/wind.png";
import humidityIcon from "../images/humidity.png";

const API_KEY = "c5a6f36df2e854825cf78b60209a47f9";

const iconMap = {
    Rain: rainIcon,
    Clouds: cloudIcon,
    Clear: clearIcon,
    Snow: snowIcon,
    Drizzle: drizzleIcon,
}

const WeatherApp = () => {
  const [location, setLocation] = useState(localStorage.getItem('lastCity') ?? "London");
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState('');

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    if (!location.length) {
      toast.error("Please enter location", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      )
      .then((res) => {
        setWeather({
          humidity: res.data.main.humidity + "%",
          wind: res.data.wind.speed + "m/s",
          temperature: Math.floor(res.data.main.temp) + "°C",
          location: res.data.name,
        });
        localStorage.setItem('lastCity', res.data.name);
        setIcon(iconMap[res.data.weather[0].main] || iconMap.Clouds)
      })
      .catch(err => {
        toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER
          });
      });
  };

  return (
    <div className="container">
      <form className="top" onSubmit={(e) => {
        e.preventDefault();
        search()}}>
        <input
          type="text"
          className="input"
          placeholder="Search"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className="search-icon" onClick={() => search()}>
          <img className="search-image" src={searchIcon} alt="search-icon" />
        </div>
      </form>
      <div className="weather-image">
        <img src={icon} alt="cloud icon" className="weather" />
      </div>
      <div className="temperature">{weather?.temperature}</div>
      <div className="location">{weather?.location}</div>
      <div className="details-wrapper">
        <div className="detail">
          <img src={humidityIcon} alt="" className="icon" />
          <div className="data">
            <div className="humidity">{weather?.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="detail">
          <img src={windIcon} alt="" className="icon" />
          <div className="data">
            <div className="humidity">{weather?.wind}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WeatherApp;
