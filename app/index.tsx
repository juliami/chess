import Board from "@/components/chess-board";
import { ThemedView } from "@/components/themed-view";
import { BoardProvider } from "@/context/boardContext";
import { StyleSheet } from "react-native";

export default function MainScreen() {
  return (
    <BoardProvider>
      <ThemedView style={styles.container}>
        <Board />
      </ThemedView>
    </BoardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});
