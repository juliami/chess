import { useChessboard } from "@/hooks/use-chess-game";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { PIECE_DESIGNS } from "./piece-design";

interface PieceProps {
  square: string;
}
const Piece = ({ square }: PieceProps) => {
  const {pieces}  = useChessboard();
  const piece = pieces[square]

  if (!piece) return null;


  return (
 
      <View
        style={[
          styles.piece,
        ]}
      >
        {/* <ThemedText>{piece}</ThemedText>   */}
       <Image source={PIECE_DESIGNS[piece]?.image} style={{width: 44, height: 44, }}/>
      </View>
  );
};
const styles = StyleSheet.create({
  pressable: {
    width: "100%",
    height: "100%",
  },
  piece: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "transparent",
    transform: [{ rotate: '90deg' }],
  },
});

export default Piece;
