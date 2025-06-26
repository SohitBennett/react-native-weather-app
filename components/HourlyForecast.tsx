import { View, Text, ScrollView, Image } from "react-native";
import { ClockIcon } from "react-native-heroicons/outline";

interface HourlyForecastProps {
  data: {
    list: Array<{
      dt: number;
      main: {
        temp: number;
      };
      weather: Array<{
        icon: string;
      }>;
      pop: number;
    }>;
  };
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  // Get next 24 hours of forecast data (next 8 entries, every 3 hours)
  const hourlyData = data.list.slice(0, 8);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      hour12: true 
    });
  };

  const HourlyItem = ({ item }: { item: any }) => (
    <View className="bg-white/15 backdrop-blur rounded-2xl p-4 mr-3 items-center min-w-[80px] border border-white/20">
      <Text className="text-white/80 text-sm font-medium mb-2">
        {formatTime(item.dt)}
      </Text>
      
      <View className="bg-white/10 rounded-full p-2 mb-2">
        <Image 
          source={{ 
            uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` 
          }} 
          className="w-8 h-8" 
        />
      </View>
      
      <Text className="text-white text-lg font-bold mb-1">
        {Math.round(item.main.temp)}°
      </Text>
      
      <Text className="text-white/60 text-xs text-center">
        {Math.round(item.pop * 100)}%
      </Text>
    </View>
  );

  return (
    <View className="mt-6 mx-2">
      <View className="flex-row items-center mb-4">
        <ClockIcon size={20} color="#FFFFFF" opacity={0.8} />
        <Text className="text-white text-lg font-semibold ml-2">
          24-Hour Forecast
        </Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
        className="flex-row"
      >
        {hourlyData.map((item: any, index: number) => (
          <HourlyItem key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}