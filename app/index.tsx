// import { ScrollView, View, Text } from "react-native";
// import { useEffect, useState } from "react";
// import CitySearch from "../components/CitySearch";
// import WeatherCard from "../components/WeatherCard";
// import * as Progress from "react-native-progress";
// import { fetchWeather } from "../services/weather";
// import { loadCity } from "../storage";
// import { OPEN_WEATHER_API_KEY } from "@/constants/index";

// export default function Home() {
//   const [loading, setLoading] = useState(false);
//   const [forecast, setForecast] = useState<any[]>([]);
//   const [city, setCity] = useState("Delhi");

//   useEffect(() => {
//     loadCity().then((stored) => {
//       if (stored) {
//         setCity(stored);
//         searchCity(stored);
//       } else {
//         searchCity("Delhi");
//       }
//       console.log(OPEN_WEATHER_API_KEY)
//     });
//   }, []);

//   const searchCity = async (cityName: string) => {
//     try {
//       setLoading(true);
//       const locRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPEN_WEATHER_API_KEY}`);
//       const loc = await locRes.json();
//       const data = await fetchWeather(loc[0].lat, loc[0].lon);
//       console.log(data)
//       setForecast(data.daily.slice(0, 5));
//     } catch (e) {
//       console.error("Failed to fetch weather", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-100">
//       <CitySearch onSearch={searchCity} />
//       {loading ? (
//         <View className="items-center mt-10">
//           <Progress.Circle size={40} indeterminate={true} />
//         </View>
//       ) : (
//         forecast.map((day, idx) => <WeatherCard key={idx} day={day} />)
//       )}
//     </ScrollView>
//   );
// }



import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { OPEN_WEATHER_API_KEY } from "@/constants/index";


import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

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

      // Step 2: Get weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`
      );
      const weatherJson = await weatherRes.json();
      setWeather(weatherJson);
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

  return (
    <ScrollView className="flex-1 bg-sky-100 px-4 pt-10">
      <SearchBar onSearch={fetchWeather} />

      {loading && (
        <View className="mt-10 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      {weather && !loading && <WeatherCard data={weather} />}
    </ScrollView>
  );
}
