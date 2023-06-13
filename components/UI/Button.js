import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/style";

export default function Button({ style, children, mode, onPress }) {
  return (
    <View style={style}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <View
          style={[
            styles.buttonContainer,
            mode === "flat" && styles.flatContainer,
          ]}
        >
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    minWidth: 120,
    borderRadius: 4,
  },
  text: {
    color: GlobalStyles.colors.primary50,
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: GlobalStyles.colors.primary200,
    borderRadius: 4,
  },
  flatContainer: {
    backgroundColor: "transparent",
  },
});
