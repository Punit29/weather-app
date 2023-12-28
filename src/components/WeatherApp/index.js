import React from 'react';
import './index.css';

import searchIcon from '../images/search.png';
import cloudIcon from '../images/cloud.png';
import rainIcon from '../images/rain.png';
import snowIcon from '../images/snow.png';
import windIcon from '../images/wind.png';
import humidityIcon from '../images/humidity.png';

const WeatherApp = () => {
  return (
    <div className='container'>
        <div className='top'>
            <input type='text' className='input' placeholder='Search' />
            <div className='search-icon'>
                <img className='search-image' src={searchIcon} alt="search-icon" />
            </div>
        </div>
        <div className='weather-image'>
            <img src={cloudIcon} alt="cloud icon" className='weather' />
        </div>
        <div className='temperature'>24 c</div>
        <div className='location'> London </div>
        <div className='details-wrapper'>
            <div className='detail'>
                <img src={humidityIcon} alt='' className='icon' />
                <div className='data'>
                    <div className='humidity'>64%</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
            <div className='detail'>
                <img src={windIcon} alt='' className='icon' />
                <div className='data'>
                    <div className='humidity'>18 km/h</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp;
