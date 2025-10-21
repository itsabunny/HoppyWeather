import { StyleSheet, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { useWeather } from "@/app/context/weather-context";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const { 
    currentWeather, 
    addFavorite, 
    isFavorite, 
    convertTemperature, 
    temperatureUnit 
  } = useWeather();

  const handleAddFavorite = () => {
    if (currentWeather) {
      addFavorite({
        id: Date.now().toString(),
        city: currentWeather.city,
        temperature: currentWeather.temperature,
        description: currentWeather.description,
      });
    }
  };

  const handleSearch = () => {
    console.log("Search for:", city);
    // Detta kommer att implementeras med API senare
  };

  const handleGPS = () => {
    console.log("GPS pressed");
    // Detta kommer att implementeras med location senare
  };

  // Placeholder väderdata om ingen data finns
  const weatherData = currentWeather || {
    city: "Stockholm",
    temperature: 15,
    description: "Partly cloudy",
    icon: "cloud.sun.fill",
  };

  const isCurrentCityFavorite = isFavorite(weatherData.city);

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
            />
          </View>
          <TouchableOpacity 
            style={[styles.gpsButton, { backgroundColor: colors.tint }]}
            onPress={handleGPS}
          >
            <IconSymbol name="location.fill" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Vädervisning */}
        <View style={[styles.weatherCard, { backgroundColor: colors.tint }]}>
          <View style={styles.weatherHeader}>
            <ThemedText style={styles.cityName}>{weatherData.city}</ThemedText>
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
          </View>

          <View style={styles.weatherContent}>
            <IconSymbol name={weatherData.icon} size={80} color="#fff" />
            <ThemedText style={styles.temperature}>
              {convertTemperature(weatherData.temperature)}°{temperatureUnit === "celsius" ? "C" : "F"}
            </ThemedText>
          </View>

          <ThemedText style={styles.description}>
            {weatherData.description}
          </ThemedText>
        </View>

        {/* Info text */}
        <View style={styles.infoContainer}>
          <ThemedText style={styles.infoText}>
            Search for a city or use GPS to get current weather
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

// ... existing code ...
