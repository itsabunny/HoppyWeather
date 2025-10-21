import React, { createContext, useContext, useState, ReactNode } from "react";

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
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("celsius");

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
