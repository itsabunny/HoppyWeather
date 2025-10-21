import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useWeather } from "@/context/weather-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router } from "expo-router";
import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";

export default function FavouritesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const {
    favorites,
    removeFavorite,
    setCurrentWeather,
    convertTemperature,
    temperatureUnit,
  } = useWeather();

  const handleCityPress = (favorite: (typeof favorites)[0]) => {
    // Sätt vädret och navigera till huvudsidan
    setCurrentWeather({
      city: favorite.city,
      temperature: favorite.temperature,
      description: favorite.description,
      icon: "cloud.sun.fill",
    });
    router.push("/");
  };

  const renderFavoriteItem = ({ item }: { item: (typeof favorites)[0] }) => (
    <TouchableOpacity
      style={[styles.favoriteItem, { borderColor: colors.icon }]}
      onPress={() => handleCityPress(item)}
    >
      <View style={styles.favoriteContent}>
        <View style={styles.favoriteInfo}>
          <ThemedText style={styles.cityName}>{item.city}</ThemedText>
          <ThemedText style={styles.weatherInfo}>
            {convertTemperature(item.temperature)}°
            {temperatureUnit === "celsius" ? "C" : "F"} • {item.description}
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: "#ff4444" }]}
          onPress={() => removeFavorite(item.id)}
        >
          <IconSymbol name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Favorites</ThemedText>
        <ThemedText style={styles.subtitle}>
          Tap a city to view its weather
        </ThemedText>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconSymbol name="heart" size={64} color={colors.icon} />
          <ThemedText style={styles.emptyText}>No favorites yet</ThemedText>
          <ThemedText style={styles.emptySubtext}>
            Add cities from the home screen
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  favoriteItem: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  favoriteContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favoriteInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  weatherInfo: {
    fontSize: 16,
    opacity: 0.7,
  },
  deleteButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: "center",
  },
});
