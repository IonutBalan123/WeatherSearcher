import { useState, useEffect } from "react";
import axios from "axios";

import Search from "./search/Search";
import WeatherShower from "./weatherShower/WeatherShower";
import Spinner from "../../UI/spinner/spinner";
import styles from "./mainPage.module.css";

function toDateTime(secs) {
  var t = new Date(1970, 0, 1);
  t.setSeconds(secs);
  return t.toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const MainPage = () => {
  const [weatherData, setWeatherData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [viewForecast, setViewforecast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    const timer = setTimeout(() => {
      setErrorMessage(null);
      clearTimeout(timer);
    }, 2000);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      axios
        .get(
          `https://us1.locationiq.com/v1/reverse.php?key=pk.005998972c013564c8551df8c6d10928&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
        )
        .then((res) => {
          searchWeather(res.data.display_name.split(" ")[0]);
        });
    });
  }, []);
  const searchWeather = (query) => {
    if (query === "") {
      showErrorMessage("Please enter a city");
      setViewforecast(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${query}&APPID=33550a44ac99652dca3144eabdb6ea5a&units=metric`
        )
        .then(({ data }) => {
          setViewforecast(true);
          setIsLoading(false);
          setWeatherData({
            name: data.city.name,
            country: data.city.country,
            sunrise: toDateTime(data.city.sunrise),
            sunset: toDateTime(data.city.sunset),
            now: {
              feels: data.list[0].main.feels_like.toFixed(1),
              humidity: data.list[0].main.humidity,
              temp: data.list[0].main.temp.toFixed(1),
              description: data.list[0].weather[0].description,
              wind: data.list[0].wind.speed,
              icon: `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`,
            },
            next: [
              {
                time: toDateTime(data.list[1].dt),
                temp: data.list[1].main.temp.toFixed(1),
                description: data.list[1].weather[0].description,
                icon: `http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`,
              },
              {
                time: toDateTime(data.list[2].dt),
                temp: data.list[2].main.temp.toFixed(1),
                description: data.list[2].weather[0].description,
                icon: `http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`,
              },
              {
                time: toDateTime(data.list[3].dt),
                temp: data.list[3].main.temp.toFixed(1),
                description: data.list[3].weather[0].description,
                icon: `http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`,
              },
              {
                time: toDateTime(data.list[4].dt),
                temp: data.list[4].main.temp.toFixed(1),
                description: data.list[4].weather[0].description,
                icon: `http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png`,
              },
            ],
          });
        })

        .catch((err) => {
          setIsLoading(false);
          setViewforecast(false);
          if (err.response.status === 404)
            showErrorMessage("Please enter a valid city name");
        });
    }
  };
  return (
    <>
      <Search receiveSearch={searchWeather} />
      {errorMessage && <h2 className={styles.ErrorMessage}>{errorMessage}</h2>}
      {isLoading ? (
        <Spinner />
      ) : (
        <WeatherShower weatherData={weatherData} show={viewForecast} />
      )}
    </>
  );
};

export default MainPage;
