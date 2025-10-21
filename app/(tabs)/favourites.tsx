import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export default function FavouritesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Placeholder favoriter
  const favorites = [
    { id: "1", city: "Stockholm", temperature: 15, description: "Cloudy" },
    { id: "2", city: "Gothenburg", temperature: 12, description: "Rainy" },
    { id: "3", city: "Malmö", temperature: 14, description: "Sunny" },
  ];

  const renderFavoriteItem = ({ item }: { item: typeof favorites[0] }) => (
    <TouchableOpacity
      style={[styles.favoriteItem, { borderColor: colors.icon }]}
      onPress={() => console.log("Navigate to", item.city)}
    >
      <View style={styles.favoriteContent}>
        <View style={styles.favoriteInfo}>
          <ThemedText style={styles.cityName}>{item.city}</ThemedText>
          <ThemedText style={styles.weatherInfo}>
            {item.temperature}°C • {item.description}
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: "#ff4444" }]}
          onPress={() => console.log("Delete", item.city)}
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
