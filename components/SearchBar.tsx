import { View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <View className="flex-row items-center bg-white rounded-xl px-4 py-2 shadow-md">
      <TextInput
        placeholder="Enter city..."
        value={query}
        onChangeText={setQuery}
        className="flex-1 text-base"
      />
      <TouchableOpacity
        onPress={() => {
          if (query.trim()) onSearch(query.trim());
        }}
      >
        <MagnifyingGlassIcon size={24} color="#3b82f6" />
      </TouchableOpacity>
    </View>
  );
}
