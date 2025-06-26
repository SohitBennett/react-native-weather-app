import { View, Text } from "react-native";
import { 
  EyeIcon, 
  CloudIcon, 
  SunIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from "react-native-heroicons/outline";

interface WeatherDetailsProps {
  data: {
    main: {
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg?: number;
    };
    visibility?: number;
    sys: {
      sunrise: number;
      sunset: number;
    };
  };
}

export default function WeatherDetails({ data }: WeatherDetailsProps) {
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
  };

  const getPressureStatus = (pressure: number) => {
    if (pressure > 1020) return { status: "High", color: "text-green-400" };
    if (pressure < 1000) return { status: "Low", color: "text-red-400" };
    return { status: "Normal", color: "text-blue-400" };
  };

  const getVisibilityStatus = (visibility: number) => {
    const km = visibility / 1000;
    if (km > 10) return { status: "Excellent", color: "text-green-400" };
    if (km > 5) return { status: "Good", color: "text-blue-400" };
    if (km > 2) return { status: "Moderate", color: "text-yellow-400" };
    return { status: "Poor", color: "text-red-400" };
  };

  const pressureInfo = getPressureStatus(data.main.pressure);
  const visibilityInfo = getVisibilityStatus(data.visibility || 10000);
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const DetailCard = ({ icon, title, value, subtitle, color = "text-white" }: any) => (
    <View className="bg-white/15 backdrop-blur rounded-2xl p-4 flex-1 mx-1 border border-white/20">
      <View className="flex-row items-center mb-2">
        {icon}
        <Text className="text-white/80 text-sm font-medium ml-2">{title}</Text>
      </View>
      <Text className={`text-xl font-bold ${color} mb-1`}>{value}</Text>
      {subtitle && <Text className="text-white/60 text-xs">{subtitle}</Text>}
    </View>
  );

  return (
    <View className="mt-6 mx-2">
      {/* Wind & Humidity Row */}
      <View className="flex-row mb-4">
        <DetailCard
          icon={<CloudIcon size={20} color="#FFFFFF" opacity={0.8} />}
          title="Wind"
          value={`${Math.round(data.wind.speed)} m/s`}
          subtitle={`${getWindDirection(data.wind.deg || 0)} direction`}
        />
        <DetailCard
          icon={<EyeIcon size={20} color="#FFFFFF" opacity={0.8} />}
          title="Humidity"
          value={`${data.main.humidity}%`}
          subtitle={data.main.humidity > 70 ? "High" : data.main.humidity > 40 ? "Moderate" : "Low"}
        />
      </View>

      {/* Pressure & Visibility Row */}
      <View className="flex-row mb-4">
        <DetailCard
          icon={<ArrowUpIcon size={20} color="#FFFFFF" opacity={0.8} />}
          title="Pressure"
          value={`${data.main.pressure} hPa`}
          subtitle={pressureInfo.status}
          color={pressureInfo.color}
        />
        <DetailCard
          icon={<EyeIcon size={20} color="#FFFFFF" opacity={0.8} />}
          title="Visibility"
          value={`${Math.round((data.visibility || 10000) / 1000)} km`}
          subtitle={visibilityInfo.status}
          color={visibilityInfo.color}
        />
      </View>

      {/* Sunrise & Sunset Row */}
      <View className="flex-row">
        <DetailCard
          icon={<SunIcon size={20} color="#FDE047" />}
          title="Sunrise"
          value={sunrise}
          subtitle="Morning"
        />
        <DetailCard
          icon={<SunIcon size={20} color="#FB923C" />}
          title="Sunset"
          value={sunset}
          subtitle="Evening"
        />
      </View>
    </View>
  );
}