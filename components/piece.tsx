import { useChessboard } from "@/hooks/use-chess-game";
import { getSquareByCoordinates, isPieceOfColor } from "@/utils";
import { useMemo } from "react";
import { Image, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";
import { PIECE_DESIGNS } from "./piece-design";

interface PieceProps {
  square: string;
  parentRef: any
}

// to do use measure
const TOP_OFFSET_MAGIC = 97;

const Piece = ({ square, parentRef }: PieceProps) => {
  const { pieces, selectSquare, turn } = useChessboard();
  const piece = pieces[square];

  const offsetX = useSharedValue<number>(0);
  const offsetY = useSharedValue<number>(0);
  const startX = useSharedValue<number>(0);
  const startY = useSharedValue<number>(0);
  const isDragging = useSharedValue<boolean>(false);

  const hasMovablePiece = useMemo(() => isPieceOfColor(piece, turn), [piece, turn]);


const snapToSquare = ({coordX, coordY }: {event: any, coordX: number, coordY: number}) => {
    const squareToSnapTo = getSquareByCoordinates(coordX, coordY - TOP_OFFSET_MAGIC);
    console.log({squareToSnapTo});
  };

  const pan = Gesture.Pan()
    .onBegin((event) => {
      runOnJS(selectSquare)(square);
      // Store the initial position
      startX.value = event.absoluteX;
      startY.value = event.absoluteY;
    })
    .onStart(() => {
      isDragging.value = true;
    })
    .onChange((event) => {
      // Calculate offset from the starting position
      offsetX.value = event.absoluteX - startX.value;
      offsetY.value = event.absoluteY - startY.value;

      isDragging.value = true;
    })
    .onFinalize((event) => {
      isDragging.value = false;
      const finalX = startX.value + event.translationX;
      const finalY = startY.value + event.translationY;
      

      runOnJS(snapToSquare)({coordX: finalX, coordY: finalY});
      offsetX.value = 0;
      offsetY.value = 0;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
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
    zIndex: 1000,
  },
  pieceImage: {
    width: 44,
    height: 44,
  },
});

export default Piece;