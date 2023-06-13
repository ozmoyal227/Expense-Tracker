import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function IconButton({ onPress, color, size, name }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && { opacity: 0.5 }}
    >
      <View style={styles.iconContainer}>
        <Ionicons size={size} color={color} name={name} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 24,
  },
});
