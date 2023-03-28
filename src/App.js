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
  const FORM = useRef(null);

  const handlerTimer = () => {
    setTimeout(() => setAlert({ type: '', message: '' }), 3000);
  };

  const getInputCountry = e => {
    e.preventDefault();
    const form = FORM?.current;
    const formData = new FormData(form);
    const { country } = Object.fromEntries(formData.entries());
    searchWeatherByCountry(country);
    form.reset();
  };

  useEffect(() => {
    FORM?.current?.addEventListener('submit', getInputCountry);
  }, []);

  const searchWeatherByCountry = async country => {
    const res = await fetch(`${api.base}weather?q=${country}&units=metric&APPID=${api.key}`);
    const data = await res.json();
    if (res.status === 200) {
      setWeatherData(data);
      setAlert({ type: 'success', message: 'Success request' });
      handlerTimer();
      if (data.main.temp > 16) {
        setWeather('warm');
        return;
      }
      setWeather('cold');
    } else {
      setAlert({ type: 'error', message: 'Invalid country' });
    }
    handlerTimer();
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
      <img className="top__image" src={weather === 'warm' ? 'https://i.imgur.com/H2Fa2Ye.jpg' : 'https://i.imgur.com/FK28j2H.png'} alt="img-weather" />
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
        <img className={weather} src={`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`} alt="icon" />
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
            <form ref={FORM} id="form-country" className="form-weather">
              <input className="form__input" type="text" name="country" placeholder="Search weather by country" />
              <button className="form__btn">
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
