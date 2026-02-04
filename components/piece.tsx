import { useChessboard } from "@/hooks/use-chess-game";
import { isPieceOfColor } from "@/utils";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

interface PieceProps {
  square: string;
}
const Piece = ({ square }: PieceProps) => {
  const {pieces}  = useChessboard();
  const piece = pieces[square]

  if (!piece) return null;

  const backgroundColor = isPieceOfColor(piece, 'white') ? "beige" : "dimgray";

  return (
 
      <View
        style={[
          styles.piece,
          {
            backgroundColor,
          },
        ]}
      >
        <ThemedText>{piece}</ThemedText>
      </View>
  );
};
const styles = StyleSheet.create({
  pressable: {
    width: "100%",
    height: "100%",
  },
  piece: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "transparent",
  },
});

export default Piece;
