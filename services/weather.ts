// services/weather.ts
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_URL } from "../constants";

export const fetchWeather = async (lat: number, lon: number) => {
  const res = await fetch(
    `${OPEN_WEATHER_URL}?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${OPEN_WEATHER_API_KEY}`
  );
  if (!res.ok) throw new Error("Weather fetch failed");
  return res.json();
};
