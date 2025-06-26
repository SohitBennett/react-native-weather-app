// storage/index.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const CITY_KEY = "SELECTED_CITY";

export const saveCity = async (city: string) => {
  await AsyncStorage.setItem(CITY_KEY, city);
};

export const loadCity = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(CITY_KEY);
};
