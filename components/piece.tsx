import { useChessboard } from "@/hooks/use-chess-game";
import { getSquareByCoordinates, isPieceOfColor } from "@/utils";
import { useCallback } from "react";
import { Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  AnimatedRef,
  measure,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { PIECE_DESIGNS } from "./piece-design";

interface PieceProps {
  square: string;
  boardRef: AnimatedRef<Animated.View>;
}

const Piece = ({ square, boardRef }: PieceProps) => {
  const { pieces, selectSquare, turn, makeMove, moves } = useChessboard();
  const piece = pieces[square];

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const isMovable = isPieceOfColor(piece, turn);

  const handleDrop = useCallback(
    (x: number, y: number) => {
      const target = getSquareByCoordinates(x, y);
      if (target && moves.includes(target) && target !== square) {
        makeMove(square, target);
      }
    },
    [moves, square, makeMove],
  );

  const pan = Gesture.Pan()
    .enabled(isMovable)
    .onBegin(() => {
      scheduleOnRN(selectSquare, square);
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
      isDragging.value = true;
    })
    .onFinalize((e) => {
      isDragging.value = false;
      const layout = measure(boardRef);

      if (layout) {
        const relativeX = e.absoluteX - layout.pageX;
        const relativeY = e.absoluteY - layout.pageY;
        scheduleOnRN(handleDrop, relativeX, relativeY);
      }

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    zIndex: isDragging.value ? 100 : 0,
  }));

  if (!piece) return null;

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.piece, animatedStyle]}>
        <Image source={PIECE_DESIGNS[piece]} style={styles.pieceImage} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  piece: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  pieceImage: {
    width: 44,
    height: 44,
  },
});

export default Piece;
