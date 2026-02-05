import ChessPiece from "@/components/piece";
import Square from "@/components/square";
import { SQUARES, SQUARE_SIZE } from "@/constants/board";
import { useChessboard } from "@/hooks/use-chess-game";
import { StyleSheet, View } from "react-native"; // Import Game class and stateless functions

const Board = () => {
  const { pieces } = useChessboard();
  return (
    <View style={styles.board}>
      {SQUARES.map((square) => (
        <Square key={square} square={square} />
      ))}
      <View style={[styles.board, styles.draggingLayer]}>
        {SQUARES.map((square) => {
          if (pieces[square]) {
            return <ChessPiece square={square} key={square} />;
          }
          return <View key={square} style={styles.emptySquare} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: SQUARE_SIZE * 8,
    height: SQUARE_SIZE * 8,
  },
  draggingLayer: {
    zIndex: 1000,
    elevation: 1000,
    ...StyleSheet.absoluteFillObject,
  },
  emptySquare: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
  },
});

export default Board;
