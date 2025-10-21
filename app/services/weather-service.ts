import endpoints from "@/constants/endpoints";

const API_KEY = "YOUR_API_KEY_HERE"; // Användaren behöver lägga till sin egen API-nyckel

export type WeatherResponse = {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
};

export async function fetchWeatherByCity(city: string): Promise<WeatherResponse> {
  try {
    const url = `${endpoints.weather}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather by city:", error);
    throw error;
  }
}

export async function fetchWeatherByCoordinates(
  latitude: number,
  longitude: number
): Promise<WeatherResponse> {
  try {
    const url = `${endpoints.weather}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error);
    throw error;
  }
}

export function mapWeatherIconToSymbol(iconCode: string): string {
  // Mappar OpenWeatherMap ikoner till SF Symbols
  const iconMap: { [key: string]: string } = {
    "01d": "sun.max.fill",
    "01n": "moon.stars.fill",
    "02d": "cloud.sun.fill",
    "02n": "cloud.moon.fill",
    "03d": "cloud.fill",
    "03n": "cloud.fill",
    "04d": "smoke.fill",
    "04n": "smoke.fill",
    "09d": "cloud.rain.fill",
    "09n": "cloud.rain.fill",
    "10d": "cloud.sun.rain.fill",
    "10n": "cloud.moon.rain.fill",
    "11d": "cloud.bolt.fill",
    "11n": "cloud.bolt.fill",
    "13d": "snow",
    "13n": "snow",
    "50d": "cloud.fog.fill",
    "50n": "cloud.fog.fill",
  };
  
  return iconMap[iconCode] || "cloud.sun.fill";
}
