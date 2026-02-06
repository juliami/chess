import Board from "@/components/board";
import { BoardProvider } from "@/context/boardContext";
import { ImageBackground, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <BoardProvider>
      <GestureHandlerRootView>
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

  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

  },
});
