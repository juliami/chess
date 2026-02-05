import { MOVE_COLOR, SELECTED_COLOR, SQUARE_SIZE } from "@/constants/board";
import { useChessboard } from "@/hooks/use-chess-game";
import { isWhiteSquare } from "@/utils";
import { useMemo } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const whiteTileImage = require("@/assets/images/tile13.png");
const blackTileImage = require("@/assets/images/tile14.png");

interface SquareProps {
  square: string;
}
const Square = ({ square }: SquareProps) => {
  const { makeMove, moves, selectedSquare } =
    useChessboard();

  const isSelected = selectedSquare === square;

  const isValidMove = useMemo(() => moves.includes(square), [moves, square]);

  const tileImage = isWhiteSquare(square) ? whiteTileImage : blackTileImage;

  const handlePress = () => {
    if (isValidMove && selectedSquare) {
      makeMove(selectedSquare, square);
    }
  };
  return (
    <ImageBackground source={tileImage} style={styles.square}>
      <Text>{square}</Text>
      {isValidMove && <View style={[styles.indicator, styles.moveIndicator]} />}
      {isSelected && (
        <View style={[styles.indicator, styles.selectedIndicator]} />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
  },
  indicator: {
    width: SQUARE_SIZE - 4,
    height: SQUARE_SIZE - 4,
    position: "absolute",
    top: 2,
    left: 2,
    borderRadius: 5,
  },

  selectedIndicator: {
    backgroundColor: SELECTED_COLOR,
    opacity: 0.4,
  },
  moveIndicator: {
    backgroundColor: MOVE_COLOR,
    opacity: 0.7,
  },
});

export default Square;
