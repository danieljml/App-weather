/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { BsSearch } from 'react-icons/bs';
import './index.css';

const convertTimezoneToMinutes = timezone => {
  const timezoneInMinutes = timezone / 60;
  const timezoneToMinutes = moment().utcOffset(timezoneInMinutes).format('h:mm A');
  return timezoneToMinutes;
};

const api = {
  key: '4aa692caf0bf7cf7a224fe81a3ca4959',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [weather, setWeather] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handlerTimer = () => setTimeout(() => setAlert({ type: '', message: '' }), 3000);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { country } = Object.fromEntries(formData.entries());
    searchWeatherByCountry(country);
    form.reset();
  };

  const searchWeatherByCountry = async country => {
    try {
      const res = await fetch(`${api.base}weather?q=${country}&units=metric&APPID=${api.key}`);
      const data = await res.json();
      if (res.status === 200) {
        setWeatherData(data);
        setAlert({ type: 'success', message: 'Success request' });
        if (data.main.temp > 16) {
          setWeather('warm');
          return;
        }
        setWeather('cold');
      } else {
        setAlert({ type: 'error', message: 'Invalid country' });
      }
    } catch (error) {
      console.log(error);
    } finally {
      handlerTimer();
    }
  };

  const dateBuilder = d => {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  const weatherTopSection = weatherData ? (
    <>
      <img
        loading="lazy"
        className="top__image"
        src={weather === 'warm' ? 'https://i.imgur.com/Cf7kgE8.png' : 'https://i.imgur.com/iLDHBSD.png'}
        alt="img-weather"
      />
      <div className="top__content">
        <p>{weatherData.weather[0]?.main}</p>
        <span>{Math.round(weatherData.main.temp)}°</span>
      </div>
    </>
  ) : (
    ''
  );

  const weatherBottomSection = weatherData ? (
    <>
      <div className="container__image">
        <img loading="lazy" className={weather} src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`} alt="icon" />
      </div>
      <p className="location">
        {weatherData.name}, {weatherData.sys.country}
      </p>
      <p className="date">{dateBuilder(new Date())}</p>
      <ul>
        <li>
          Description: <span>{weatherData.weather[0].description}</span>
        </li>
        <li>
          Coords:{' '}
          {Object.entries(weatherData['coord'])
            .map(item => {
              return `${item[0]}: ${item[1]}`;
            })
            .join(', ')}
        </li>
        <li>Timezone: {convertTimezoneToMinutes(weatherData.timezone)}</li>
        <li>Pressure: {Math.round(weatherData.main.pressure)}</li>
        <li>Humidity: {Math.round(weatherData.main.humidity)}</li>
      </ul>
    </>
  ) : (
    ''
  );

  return (
    <div className={`container__app ${weather}`}>
      <div className={`alert ${alert.type}`}>
        <p>{alert.message}</p>
      </div>
      <main className="app">
        <div className="container__top">
          <header className="block">
            <form onSubmit={handleSubmit} id="form-country" className="form-weather">
              <input className="form__input" type="text" name="country" placeholder="Search weather by country" />
              <button type="submit" className="form__btn">
                <BsSearch className="btn__icon" />
              </button>
            </form>
          </header>
          {weatherTopSection}
        </div>
        <div className={`container__bottom ${weather}`}>{weatherBottomSection}</div>
      </main>
    </div>
  );
}

export default App;
