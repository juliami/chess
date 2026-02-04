import useMoves from "@/hooks/use-moves";
import { isWhiteSquare } from "@/utils";
import { StyleSheet, View } from "react-native";

interface SquareProps {
  square: string;
  children: React.ReactNode;
}
const Square = ({ square, children }: SquareProps) => {
  const moves = useMoves();
  const isWhite = isWhiteSquare(square);
  const isMove = moves.includes(square);
  return (
    <View style={[styles.square, isWhite && styles.white, isMove && styles.move]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 45,
    height: 45,
    backgroundColor: "#514B40",
  },
  white: {
    backgroundColor: "#ece1cd",
  },
  move: {
    borderColor: "green",
    borderWidth: 6,
    borderStyle: "solid",
  },
});

export default Square;
