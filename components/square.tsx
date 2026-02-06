import { MOVE_COLOR, SELECTED_COLOR, SQUARE_SIZE } from "@/constants/board";
import { useChessboard } from "@/hooks/use-chess-game";
import { isWhiteSquare } from "@/utils";
import { memo } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const whiteTileImage = require("@/assets/images/tile13.png");
const blackTileImage = require("@/assets/images/tile14.png");

interface SquareProps {
  square: string;
}

const Square = ({ square }: SquareProps) => {
  const { moves, selectedSquare } = useChessboard();

  const isSelected = selectedSquare === square;
  const isValidMove = moves.includes(square);

  const tileImage = isWhiteSquare(square) ? whiteTileImage : blackTileImage;

  return (
    <ImageBackground source={tileImage} style={styles.square}>
      {(isValidMove || isSelected) && (
        <View
          style={[
            styles.indicator,
            isSelected ? styles.selected : styles.move,
          ]}
        />
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
    // 3. CSS Simplification: Use generic flex/margin instead of explicit math
    flex: 1,
    margin: 2,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: SELECTED_COLOR,
    opacity: 0.4,
  },
  move: {
    backgroundColor: MOVE_COLOR,
    opacity: 0.7,
  },
});

export default memo(Square);