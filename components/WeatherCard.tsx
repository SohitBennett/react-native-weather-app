// // components/WeatherCard.tsx
// import { View, Text } from "react-native";

// export default function WeatherCard({ day }: { day: any }) {
//   const date = new Date(day.dt * 1000).toDateString();
//   return (
//     <View className="bg-white p-4 m-2 rounded-xl shadow">
//       <Text className="text-lg font-bold">{date}</Text>
//       <Text>🌡️ {day.temp.day}°C</Text>
//       <Text>☁️ {day.weather[0].description}</Text>
//     </View>
//   );
// }


import { View, Text, Image } from "react-native";

export default function WeatherCard({ data }: { data: any }) {
  const icon = data.weather[0].icon;
  const imageUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <View className="mt-10 p-6 bg-white rounded-2xl shadow-md items-center">
      <Text className="text-xl font-semibold text-gray-800">{data.name}</Text>

      <Image source={{ uri: imageUrl }} className="w-32 h-32" />

      <Text className="text-4xl font-bold text-gray-900">
        {Math.round(data.main.temp)}°C
      </Text>
      <Text className="text-lg text-gray-600 capitalize">
        {data.weather[0].description}
      </Text>

      <View className="flex-row mt-4 justify-between w-full px-4">
        <View className="items-center">
          <Text className="text-sm text-gray-500">Feels Like</Text>
          <Text className="text-lg font-medium">{data.main.feels_like}°</Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-gray-500">Humidity</Text>
          <Text className="text-lg font-medium">{data.main.humidity}%</Text>
        </View>
        <View className="items-center">
          <Text className="text-sm text-gray-500">Wind</Text>
          <Text className="text-lg font-medium">{data.wind.speed} m/s</Text>
        </View>
      </View>
    </View>
  );
}
