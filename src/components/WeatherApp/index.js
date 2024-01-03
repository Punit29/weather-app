import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";

const API_KEY = "c5a6f36df2e854825cf78b60209a47f9";

const iconMap = {
  Rain: <IoMdRainy />,
  Clouds: <IoMdCloudy />,
  Haze: <BsCloudHaze2Fill />,
  Clear: <IoMdSunny />,
  Snow: <IoMdSnow />,
  Drizzle: <BsCloudDrizzleFill />,
  Thunderstorm: <IoMdThunderstorm />,
};

const WeatherApp = () => {
  const [location, setLocation] = useState(
    localStorage.getItem("lastCity") ?? "London"
  );
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState("");

  useEffect(() => {
    console.log("aaaaaaa");
    search();
  }, []);

  const search = async () => {
    if (!location.length) {
      toast.error("Please enter location", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      )
      .then((res) => {
        setWeather({
          humidity: res.data.main.humidity,
          wind: res.data.wind.speed,
          temperature: Math.floor(res.data.main.temp),
          location: res.data.name,
          country: res.data.sys.country,
          description: res.data.weather[0].description,
          feelsLike: Math.floor(res.data.main.feels_like),
          visibility: res.data.visibility,
        });
        localStorage.setItem("lastCity", res.data.name);
        setIcon(iconMap[res.data.weather[0].main] || iconMap.Clouds);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const date = new Date();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      <form className="h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8">
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
            placeholder="Search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="bg-[#1ab8ed] w-20 h-12 rounded-full flex justify-center items-center transition"
            onClick={() => search()}
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        <div className="flex items-center gap-x-5">
          <div className="text-[87px]">{icon}</div>
          <div className="text-2xl font-semibold">
            {weather.location}, {weather.country}
            <div>
              {date.getUTCDate()}/{date.getUTCMonth() + 1}/
              {date.getUTCFullYear()}
            </div>
          </div>
        </div>
        <div className="my-20">
          <div className="flex justify-center items-center">
            <div className="text-[144px] leading-none font-light">
              {weather?.temperature}
            </div>
            <div className="text-4xl">
              <TbTemperatureCelsius />
            </div>
          </div>
          <div className="capitalize text-center">{weather.description}</div>
        </div>
        <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsEye />
              </div>
              <div>
                Visibility
                <span className="ml-2">{weather.visibility / 1000} km</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsThermometer />
              </div>
              <div className="flex">
                Feels like{" "}
                <div className="flex ml-6">
                  {weather.feelsLike}
                  <TbTemperatureCelsius />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsWater />
              </div>
              <div>
                Humidity <span className="ml-2">{weather.humidity} %</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsWind />
              </div>
              <div>
                Wind <span className="ml-2">{weather.wind} m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WeatherApp;
