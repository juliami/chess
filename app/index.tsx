import Board from "@/components/board";
import { BoardProvider } from "@/context/boardContext";
import { ImageBackground, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <BoardProvider>
      <GestureHandlerRootView style={styles.container}>
        <ImageBackground
          source={require("@/assets/images/wood7.png")}
          style={styles.background}
          resizeMode="repeat"
        >
          <Board />
        </ImageBackground>
      </GestureHandlerRootView>
    </BoardProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  background: {
    width: "100%",
    height: "100%",

  },
});
