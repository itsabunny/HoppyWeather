import { StyleSheet, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export default function HomeScreen() {
  const [city, setCity] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Placeholder väderdata
  const weatherData = {
    city: "Stockholm",
    temperature: 15,
    description: "Partly cloudy",
    icon: "cloud.sun.fill",
  };

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
            />
          </View>
          <TouchableOpacity 
            style={[styles.gpsButton, { backgroundColor: colors.tint }]}
            onPress={() => console.log("GPS pressed")}
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
              onPress={() => console.log("Favorite pressed")}
            >
              <IconSymbol name="heart" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.weatherContent}>
            <IconSymbol name={weatherData.icon} size={80} color="#fff" />
            <ThemedText style={styles.temperature}>
              {weatherData.temperature}°C
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
