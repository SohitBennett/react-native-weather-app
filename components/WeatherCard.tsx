//trying new code 


import { View, Text, Image, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { MapPinIcon } from "react-native-heroicons/solid";

interface WeatherCardProps {
  data: {
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
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
    name: string;
  };
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [data]);

  const icon = data.weather[0].icon;
  const imageUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Animated.View 
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }]
      }}
      className="mt-12 mx-2"
    >
      <View className="bg-white/20 backdrop-blur rounded-3xl p-8 items-center border border-white/30 shadow-2xl">
      {/* <View className="bg-white/10 backdrop-blur-md rounded-3xl p-8 items-center border border-white/20 shadow-lg"> */}
        {/* Location and Time */}
        <View className="flex-row items-center mb-2">
          <MapPinIcon size={20} color="#FFFFFF" opacity={0.8} />
          <Text className="text-white text-xl font-bold ml-2 tracking-wide">
            {data.name}, {data.sys.country}
          </Text>
        </View>
        
        <Text className="text-white/80 text-base font-medium mb-1">
          {getCurrentDate()}
        </Text>
        
        <Text className="text-white/70 text-sm font-medium mb-6">
          {getCurrentTime()}
        </Text>

        {/* Weather Icon */}
        <View className="bg-white/10 rounded-full p-4 mb-4">
          <Image source={{ uri: imageUrl }} className="w-32 h-32" />
        </View>

        {/* Temperature */}
        <Text className="text-white text-7xl font-thin mb-2 tracking-tighter">
          {Math.round(data.main.temp)}°
        </Text>
        
        {/* Description */}
        <Text className="text-white text-xl font-medium capitalize mb-2 tracking-wide">
          {data.weather[0].description}
        </Text>
        
        {/* Feels Like */}
        <Text className="text-white/80 text-base font-medium">
          Feels like {Math.round(data.main.feels_like)}°C
        </Text>

        {/* Min/Max Temperature */}
        <View className="flex-row mt-4 bg-white/10 rounded-2xl px-6 py-3">
          <View className="items-center flex-1">
            <Text className="text-white/70 text-sm font-medium">Low</Text>
            <Text className="text-white text-lg font-bold">
              {Math.round(data.main.temp_min)}°
            </Text>
          </View>
          <View className="w-px bg-white/30 mx-4"></View>
          <View className="items-center flex-1">
            <Text className="text-white/70 text-sm font-medium">High</Text>
            <Text className="text-white text-lg font-bold">
              {Math.round(data.main.temp_max)}°
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}