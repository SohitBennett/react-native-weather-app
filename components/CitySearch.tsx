// components/CitySearch.tsx
import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { saveCity } from "../storage";

export default function CitySearch({ onSearch }: { onSearch: (city: string) => void }) {
  const [city, setCity] = useState("");

  return (
    <View className="flex-row gap-2 items-center p-4">
      <TextInput
        className="border px-4 py-2 rounded w-2/3"
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <Button
        title="Search"
        onPress={() => {
          saveCity(city);
          onSearch(city);
        }}
      />
    </View>
  );
}
