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

  useEffect(() => {
    document.title = `Clima | ${weather?.name ?? ""}`;
  }, [weather]);

  const loadInfo = useCallback(async (city = "Buenos Aires") => {
    try {
      const request = await fetch(`${process.env?.REACT_APP_URL}&q=${city}`);
      const json = await request.json();
      setWeather(json);
      const icon = await fetch(
        `${process.env?.REACT_APP_ICON}${json.weather[0].icon}.png`
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
