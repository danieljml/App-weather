import React, { useState, useEffect, memo } from 'react';
import { BsSearch } from 'react-icons/bs';
import moment from 'moment';
import './index.css';

const convertTimezoneToMinutes = timezone => {
  const timezoneInMinutes = timezone / 60;
  const timezoneToMinutes = moment().utcOffset(timezoneInMinutes).format('h:mm A');
  return timezoneToMinutes;
};

const getCityByIP = async clientIP => {
  try {
    const res = await fetch(`https://ipinfo.io/${clientIP}?token=f7e68a41baa7e5`);
    const data = await res.json();
    console.log('User IP Address:', data);
    const { city } = data;
    return city;
  } catch (error) {
    console.error('Error fetching city by IP:', error);
  }
};

const getUserIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const { ip: clientIP } = await response.json();
    return clientIP;
  } catch (error) {
    console.error('Error fetching IP:', error);
  }
};

const api = {
  key: '4aa692caf0bf7cf7a224fe81a3ca4959',
  base: 'https://api.openweathermap.org/data/2.5/',
};

const InputContent = () => {
  return (
    <>
      <input className="form__input" type="text" name="country" placeholder="Search weather by country" />
      <button type="submit" className="form__btn">
        <BsSearch className="btn__icon" />
      </button>
    </>
  );
};

const Input = memo(InputContent);

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [weather, setWeather] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  const getUsercity = async () => {
    const ip = await getUserIP();
    const city = await getCityByIP(ip);
    searchWeatherByCountry(city);
  };

  useEffect(() => {
    getUsercity();
  }, []);

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

  const dateBuilder = () => moment().format('LLLL');

  const weatherTopSection = weatherData ? (
    <>
      <div className={`top__content ${weather}`}>
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
      <p className="date">{dateBuilder()}</p>
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
      <main className={`app ${weather}`}>
        <div className="container__top">
          <header className="block">
            <form onSubmit={handleSubmit} id="form-country" className="form-weather">
              <Input />
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
