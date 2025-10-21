import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useWeather } from "@/context/weather-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { temperatureUnit, setTemperatureUnit } = useWeather();
  const isCelsius = temperatureUnit === "celsius";
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Settings</ThemedText>
        <ThemedText style={styles.subtitle}>
          Customize your weather app
        </ThemedText>
      </View>

      <View style={styles.content}>
        {/* Temperature Unit Setting */}
        <View style={[styles.settingCard, { borderColor: colors.icon }]}>
          <View style={styles.settingHeader}>
            <IconSymbol name="thermometer" size={24} color={colors.tint} />
            <ThemedText style={styles.settingTitle}>
              Temperature Unit
            </ThemedText>
          </View>

          <View style={styles.unitSelector}>
            <TouchableOpacity
              style={[
                styles.unitButton,
                isCelsius && { backgroundColor: colors.tint },
                !isCelsius && { borderColor: colors.icon, borderWidth: 2 },
              ]}
              onPress={() => setTemperatureUnit("celsius")}
            >
              <ThemedText
                style={[styles.unitText, isCelsius && styles.unitTextActive]}
              >
                °C
              </ThemedText>
              <ThemedText
                style={[styles.unitLabel, isCelsius && styles.unitLabelActive]}
              >
                Celsius
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.unitButton,
                !isCelsius && { backgroundColor: colors.tint },
                isCelsius && { borderColor: colors.icon, borderWidth: 2 },
              ]}
              onPress={() => setTemperatureUnit("fahrenheit")}
            >
              <ThemedText
                style={[styles.unitText, !isCelsius && styles.unitTextActive]}
              >
                °F
              </ThemedText>
              <ThemedText
                style={[styles.unitLabel, !isCelsius && styles.unitLabelActive]}
              >
                Fahrenheit
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.switchContainer}>
            <ThemedText style={styles.switchLabel}>
              {isCelsius ? "Celsius" : "Fahrenheit"}
            </ThemedText>
            <Switch
              value={!isCelsius}
              onValueChange={(value) =>
                setTemperatureUnit(value ? "fahrenheit" : "celsius")
              }
              trackColor={{ false: colors.tint, true: colors.tint }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <ThemedText style={styles.infoTitle}>About</ThemedText>
          <ThemedText style={styles.infoText}>
            Weather data provided by OpenWeatherMap
          </ThemedText>
          <ThemedText style={styles.infoText}>Version 1.0.0</ThemedText>
        </View>
      </View>
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
  content: {
    padding: 20,
    paddingTop: 0,
  },
  settingCard: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  settingHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  settingTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  unitSelector: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
  unitButton: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  unitText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  unitTextActive: {
    color: "#fff",
  },
  unitLabel: {
    fontSize: 14,
  },
  unitLabelActive: {
    color: "#fff",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 128, 128, 0.2)",
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  infoSection: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 5,
  },
});
