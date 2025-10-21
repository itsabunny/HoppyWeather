import { StyleSheet, TextInput, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import * as Location from "expo-location";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { useWeather } from "@/app/context/weather-context";
import { useFetchWeather } from "@/hooks/use-fetch-weather";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { 
    currentWeather, 
    setCurrentWeather,
    addFavorite, 
    isFavorite, 
    convertTemperature, 
    temperatureUnit 
  } = useWeather();
  const { getWeatherByCity, getWeatherByCoordinates, isLoading, error } = useFetchWeather();

  const handleAddFavorite = () => {
    if (currentWeather) {
      addFavorite({
        id: Date.now().toString(),
        city: currentWeather.city,
        temperature: currentWeather.temperature,
        description: currentWeather.description,
      });
      Alert.alert("Success", `${currentWeather.city} added to favorites!`);
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      Alert.alert("Error", "Please enter a city name");
      return;
    }

    const weatherData = await getWeatherByCity(city);
    if (weatherData) {
      setCurrentWeather(weatherData);
      setCity("");
    } else {
      Alert.alert("Error", error || "Failed to fetch weather data");
    }
  };

  const handleGPS = async () => {
    try {
      // Be om tillstånd
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to use GPS");
        return;
      }

      // Hämta position
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Hämta väder baserat på koordinater
      const weatherData = await getWeatherByCoordinates(latitude, longitude);
      if (weatherData) {
        setCurrentWeather(weatherData);
      } else {
        Alert.alert("Error", error || "Failed to fetch weather data");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to get location");
      console.error(err);
    }
  };

  // Placeholder väderdata om ingen data finns
  const weatherData = currentWeather || {
    city: "Search for a city",
    temperature: 0,
    description: "No data available",
    icon: "cloud.sun.fill",
  };

  const isCurrentCityFavorite = currentWeather ? isFavorite(weatherData.city) : false;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Weather App</ThemedText>
        </View>

        {/* Sökfält och GPS-knapp */}
        <View style={styles.searchContainer}>
          <View style={[styles.inputWrapper, { borderColor: colors.icon }]}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.icon} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Search for a city..."
              placeholderTextColor={colors.icon}
              value={city}
              onChangeText={setCity}
              onSubmitEditing={handleSearch}
              editable={!isLoading}
            />
          </View>
          <TouchableOpacity 
            style={[styles.gpsButton, { backgroundColor: colors.tint }]}
            onPress={handleGPS}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <IconSymbol name="location.fill" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        {/* Vädervisning */}
        <View style={[styles.weatherCard, { backgroundColor: colors.tint }]}>
          <View style={styles.weatherHeader}>
            <ThemedText style={styles.cityName}>{weatherData.city}</ThemedText>
            {currentWeather && (
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={handleAddFavorite}
              >
                <IconSymbol 
                  name={isCurrentCityFavorite ? "heart.fill" : "heart"} 
                  size={28} 
                  color="#fff" 
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.weatherContent}>
            <IconSymbol name={weatherData.icon} size={80} color="#fff" />
            {currentWeather && (
              <ThemedText style={styles.temperature}>
                {convertTemperature(weatherData.temperature)}°{temperatureUnit === "celsius" ? "C" : "F"}
              </ThemedText>
            )}
          </View>

          <ThemedText style={styles.description}>
            {weatherData.description}
          </ThemedText>

          {currentWeather && currentWeather.humidity && currentWeather.windSpeed && (
            <View style={styles.extraInfo}>
              <View style={styles.infoItem}>
                <IconSymbol name="humidity" size={20} color="#fff" />
                <ThemedText style={styles.infoItemText}>
                  {currentWeather.humidity}%
                </ThemedText>
              </View>
              <View style={styles.infoItem}>
                <IconSymbol name="wind" size={20} color="#fff" />
                <ThemedText style={styles.infoItemText}>
                  {currentWeather.windSpeed} m/s
                </ThemedText>
              </View>
            </View>
          )}
        </View>

        {/* Info text */}
        <View style={styles.infoContainer}>
          <ThemedText style={styles.infoText}>
            {currentWeather 
              ? "Add to favorites or search for another city" 
              : "Search for a city or use GPS to get current weather"}
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 15,
    gap: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  gpsButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  weatherCard: {
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
  },
  weatherHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cityName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  favoriteButton: {
    padding: 5,
  },
  weatherContent: {
    alignItems: "center",
    marginBottom: 20,
  },
  temperature: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  description: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    textTransform: "capitalize",
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.3)",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoItemText: {
    fontSize: 16,
    color: "#fff",
  },
  infoContainer: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
  },
  infoText: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.7,
  },
});
