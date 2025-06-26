// import { View, TextInput, TouchableOpacity } from "react-native";
// import { useState } from "react";
// import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

// export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
//   const [query, setQuery] = useState("");

//   return (
//     <View className="flex-row items-center bg-white rounded-xl px-4 py-2 shadow-md">
//       <TextInput
//         placeholder="Enter city..."
//         value={query}
//         onChangeText={setQuery}
//         className="flex-1 text-base"
//       />
//       <TouchableOpacity
//         onPress={() => {
//           if (query.trim()) onSearch(query.trim());
//         }}
//       >
//         <MagnifyingGlassIcon size={24} color="#3b82f6" />
//       </TouchableOpacity>
//     </View>
//   );
// }


//trying claude code 



import { View, TextInput, TouchableOpacity, Animated } from "react-native";
import { useState, useRef } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(scaleAnim, {
      toValue: 1.02,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
      // Add a little bounce animation on search
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.98, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ]).start();
    }
  };

  return (
    <Animated.View 
      style={{ transform: [{ scale: scaleAnim }] }}
      className="mx-2"
    >
      <View 
        className={`flex-row items-center bg-white/90 backdrop-blur rounded-2xl px-5 py-4 shadow-lg border ${
          isFocused ? 'border-white' : 'border-white/50'
        }`}
      >
        <MagnifyingGlassIcon 
          size={20} 
          color={isFocused ? "#3B82F6" : "#6B7280"} 
        />
        <TextInput
          placeholder="Search for a city..."
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          className="flex-1 text-gray-800 text-base font-medium ml-3"
          style={{ fontSize: 16 }}
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={handleSearch}
            className="bg-blue-500 rounded-full p-2 ml-2"
            activeOpacity={0.7}
          >
            <MagnifyingGlassIcon size={16} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}