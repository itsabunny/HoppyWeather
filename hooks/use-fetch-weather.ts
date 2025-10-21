import { WeatherData } from "@/context/weather-context";
import { fetchWeatherByCity, fetchWeatherByCoordinates, mapWeatherIconToSymbol } from "@/services/weather-service";
import { useState } from "react";

export function useFetchWeather() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWeatherByCity = async (city: string): Promise<WeatherData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCity(city);
      
      const weatherData: WeatherData = {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: mapWeatherIconToSymbol(data.weather[0].icon),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };

      return weatherData;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherByCoordinates = async (
    latitude: number,
    longitude: number
  ): Promise<WeatherData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCoordinates(latitude, longitude);
      
      const weatherData: WeatherData = {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: mapWeatherIconToSymbol(data.weather[0].icon),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };

      return weatherData;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getWeatherByCity,
    getWeatherByCoordinates,
    isLoading,
    error,
  };
}
