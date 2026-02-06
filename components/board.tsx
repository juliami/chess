import ChessPiece from "@/components/piece";
import Square from "@/components/square";
import { SQUARES, SQUARE_SIZE } from "@/constants/board";
import { useChessboard } from "@/hooks/use-chess-game";
import { memo } from "react";
import { StyleSheet, View } from "react-native";


const BoardBackground = memo(() => (
  <View style={styles.layer}>
    {SQUARES.map((square) => (
      <Square key={square} square={square} />
    ))}
  </View>
));

const Board = () => {
  const { pieces } = useChessboard();

  return (
    <View style={styles.container}>
      <BoardBackground />
      <View style={[styles.layer, { zIndex: 10 }]}>
        {SQUARES.map((square) =>
          pieces[square] ? (
            <ChessPiece square={square} key={square} />
          ) : (
            <View key={square} style={styles.emptySquare} pointerEvents="none" />
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SQUARE_SIZE * 8,
    height: SQUARE_SIZE * 8,
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emptySquare: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
  },
});

export default Board;