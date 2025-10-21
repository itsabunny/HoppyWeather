import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type WeatherData = {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity?: number;
  windSpeed?: number;
};

export type Favorite = {
  id: string;
  city: string;
  temperature: number;
  description: string;
};

type TemperatureUnit = "celsius" | "fahrenheit";

type WeatherContextType = {
  currentWeather: WeatherData | null;
  setCurrentWeather: (weather: WeatherData | null) => void;
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (city: string) => boolean;
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  convertTemperature: (temp: number) => number;
  isLoading: boolean;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const FAVORITES_KEY = "@weather_favorites";
const TEMPERATURE_UNIT_KEY = "@temperature_unit";

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [temperatureUnit, setTemperatureUnitState] = useState<TemperatureUnit>("celsius");
  const [isLoading, setIsLoading] = useState(true);

  // Ladda favoriter och inställningar vid start
  useEffect(() => {
    loadData();
  }, []);

  // Spara favoriter när de ändras
  useEffect(() => {
    if (!isLoading) {
      saveFavorites();
    }
  }, [favorites]);

  // Spara temperaturenhet när den ändras
  useEffect(() => {
    if (!isLoading) {
      saveTemperatureUnit();
    }
  }, [temperatureUnit]);

  const loadData = async () => {
    try {
      const [favoritesData, unitData] = await Promise.all([
        AsyncStorage.getItem(FAVORITES_KEY),
        AsyncStorage.getItem(TEMPERATURE_UNIT_KEY),
      ]);

      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }

      if (unitData) {
        setTemperatureUnitState(unitData as TemperatureUnit);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const saveTemperatureUnit = async () => {
    try {
      await AsyncStorage.setItem(TEMPERATURE_UNIT_KEY, temperatureUnit);
    } catch (error) {
      console.error("Error saving temperature unit:", error);
    }
  };

  const setTemperatureUnit = (unit: TemperatureUnit) => {
    setTemperatureUnitState(unit);
  };

  const addFavorite = (favorite: Favorite) => {
    setFavorites((prev) => {
      // Kontrollera om staden redan finns
      if (prev.some((f) => f.city.toLowerCase() === favorite.city.toLowerCase())) {
        return prev;
      }
      return [...prev, favorite];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const isFavorite = (city: string) => {
    return favorites.some((f) => f.city.toLowerCase() === city.toLowerCase());
  };

  const convertTemperature = (temp: number) => {
    if (temperatureUnit === "fahrenheit") {
      return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
  };

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        setCurrentWeather,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        temperatureUnit,
        setTemperatureUnit,
        convertTemperature,
        isLoading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
