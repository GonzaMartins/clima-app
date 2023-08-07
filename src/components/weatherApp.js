import { useState, useEffect, useCallback } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import Error from "./error";
import "../styles/weatherApp.css";
import Loading from "./loading";
import nubes from "../img/nubes.png";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const apiBaseUrl = "https://api.openweathermap.org/data/2.5/weather?id=524901&appid=a30ed4d972778e8d26e26877580906d8&units=metric";
  const iconsUrl = "https://openweathermap.org/img/wn/"

  useEffect(() => {
    document.title = `Clima | ${weather?.name ?? ""}`;
  }, [weather]);

  const loadInfo = useCallback(async (city = "Buenos Aires") => {
    try {
      const request = await fetch(`${apiBaseUrl}&q=${city}`);
      const json = await request.json();
      setWeather(json);
      const icon = await fetch(
        `${iconsUrl}${json.weather[0].icon}.png`
      );
      setWeatherIcon(icon);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChangeCity = (city) => {
    setWeather(null);
    loadInfo(city);
  };

  useEffect(() => {
    loadInfo();
  }, [loadInfo]);

  return (
    <div className="divContainer">
      <div className="weatherContainer">
        <div className="divHeader">
          <div className="titulo">Climapp</div>
          <img className="numeImg" alt="nubes" src={nubes} />
        </div>
        <WeatherForm onChangeCity={handleChangeCity} />
        {weather && weather.cod === "404" ? (
          <Error />
        ) : weather ? (
          <WeatherMainInfo weather={weather} icon={weatherIcon} />
        ) : (
          <div className="spinnerContainer">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
