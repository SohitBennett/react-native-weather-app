
//trying new index.tsx 


import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, ImageBackground, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';

import { OPEN_WEATHER_API_KEY } from "@/constants/index";

import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import WeatherDetails from "../components/WeatherDetails";
import HourlyForecast from "../components/HourlyForecast";

// Type definitions
interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    pop: number;
  }>;
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);

  const getGradientColors = (temp: number, condition: string): string[] => {
    if (temp > 30) return ['#FF6B6B', '#FF8E53', '#FF6B9D']; // Hot
    if (temp > 20) return ['#4FACFE', '#00F2FE']; // Warm
    if (temp > 10) return ['#667eea', '#764ba2']; // Cool
    if (condition.includes('rain') || condition.includes('storm')) 
      return ['#2C3E50', '#4CA1AF']; // Rainy
    if (condition.includes('snow')) 
      return ['#E6DADA', '#274046']; // Snowy
    return ['#134E5E', '#71B280']; // Cold/Default
  };

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      // Step 1: Get coordinates
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      );
      const geoData = await geoRes.json();
      if (!geoData || geoData.length === 0) return;
      const { lat, lon } = geoData[0];

      // Step 2: Get current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
      );
      const weatherJson = await weatherRes.json();
      
      // Step 3: Get 5-day forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
      );
      const forecastJson = await forecastRes.json();
      
      setWeather(weatherJson);
      setForecast(forecastJson);
      await AsyncStorage.setItem("lastCity", cityName);
    } catch (err) {
      console.error("Failed to fetch weather:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const lastCity = await AsyncStorage.getItem("lastCity");
      if (lastCity) fetchWeather(lastCity);
      else fetchWeather("Delhi");
    })();
  }, []);

  const gradientColors: string[] = weather 
    ? getGradientColors(weather.main.temp, weather.weather[0].main.toLowerCase())
    : ['#4FACFE', '#00F2FE'];

  return (
    <>
      <StatusBar barStyle="light-content" />
              <LinearGradient colors={gradientColors as any} style={{ flex: 1 }}>
        <ScrollView 
          className="flex-1 px-4 pt-12 pb-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <SearchBar onSearch={fetchWeather} />

          {loading && (
            <View className="mt-20 items-center justify-center">
              <View className="bg-white/20 rounded-full p-8 backdrop-blur">
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text className="text-white text-lg font-medium mt-4 text-center">
                  Getting weather data...
                </Text>
              </View>
            </View>
          )}

          {weather && !loading && (
            <>
              <WeatherCard data={weather} />
              <WeatherDetails data={weather} />
              {forecast && <HourlyForecast data={forecast} />}
            </>
          )}
        </ScrollView>
      </LinearGradient>
    </>
  );
}