import { StyleSheet, View, TouchableOpacity, Switch } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { useWeather } from "@/app/context/weather-context";

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
                style={[
                  styles.unitText,
                  isCelsius && styles.unitTextActive,
                ]}
              >
                °C
              </ThemedText>
              <ThemedText
                style={[
                  styles.unitLabel,
                  isCelsius && styles.unitLabelActive,
                ]}
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
                style={[
                  styles.unitText,
                  !isCelsius && styles.unitTextActive,
                ]}
              >
                °F
              </ThemedText>
              <ThemedText
                style={[
                  styles.unitLabel,
                  !isCelsius && styles.unitLabelActive,
                ]}
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
              onValueChange={(value) => setTemperatureUnit(value ? "fahrenheit" : "celsius")}
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

// ... existing code ...
