import Board from "@/components/board";
import { ThemedView } from "@/components/themed-view";
import { BoardProvider } from "@/context/boardContext";
import { ImageBackground, StyleSheet } from "react-native";

export default function MainScreen() {
  return (
    <BoardProvider>
      <ThemedView style={styles.container}>
        <ImageBackground
          source={require("@/assets/images/wood7.png")}
          style={styles.background}
          resizeMode="repeat"
        >
          <Board />
        </ImageBackground>
      </ThemedView>
    </BoardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
