import { useChessboard } from "@/hooks/use-chess-game";
import { Image, StyleSheet, View } from "react-native";
import { PIECE_DESIGNS } from "./piece-design";

interface PieceProps {
  square: string;
}

const Piece = ({ square }: PieceProps) => {
  const { pieces } = useChessboard();
  const piece = pieces[square];
  if (!piece) return null;

  return (
    <View style={styles.piece}>
      <Image source={PIECE_DESIGNS[piece]} style={styles.pieceImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  piece: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 22,
    transform: [{ rotate: "90deg" }],
  },
  pieceImage: {
    width: 44,
    height: 44,
  },
});

export default Piece;
