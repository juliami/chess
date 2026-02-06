import { useChessboard } from "@/hooks/use-chess-game";
import { getSquareByCoordinates, isPieceOfColor } from "@/utils";
import { useCallback, useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { PIECE_DESIGNS } from "./piece-design";


// TODO: Replace with dynamic measurement
const TOP_OFFSET_MAGIC = 97;

interface PieceProps {
  square: string;
}

const Piece = ({ square }: PieceProps) => {
  const { pieces, selectSquare, turn, makeMove, moves } = useChessboard();
  const piece = pieces[square];

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const isMovable = useMemo(() => isPieceOfColor(piece, turn), [piece, turn]);
 
  const handleDrop = useCallback((absoluteX: number, absoluteY: number) => {
    const targetSquare = getSquareByCoordinates(absoluteX, absoluteY - TOP_OFFSET_MAGIC);

    if (targetSquare && moves.includes(targetSquare) && targetSquare !== square) {
      if (pieces[targetSquare]) {
        console.log('Captured piece');
      }
      makeMove(square, targetSquare);
    }
  }, [moves, square, makeMove]);

  const pan = Gesture.Pan()
    .enabled(!!isMovable) 
    .onBegin((event) => {
      runOnJS(selectSquare)(square);
      startX.value = event.absoluteX;
      startY.value = event.absoluteY;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      isDragging.value = true;
    })
    .onFinalize((event) => {
      isDragging.value = false;
      
      const finalX = startX.value + event.translationX;
      const finalY = startY.value + event.translationY;
    
      runOnJS(handleDrop)(finalX, finalY);

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    zIndex: isDragging.value ? 1000 : 0,
    
  }));

  if (!piece) return null;

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.piece, animatedStyles]}>
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
    borderRadius: 22,
  },
  pieceImage: {
    width: 44,
    height: 44,
  },
});

export default Piece;