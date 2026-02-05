import { useChessboard } from "@/hooks/use-chess-game";
import { isPieceOfColor, isWhiteSquare } from "@/utils";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";

interface SquareProps {
    square: string;
    children: React.ReactNode;
}
const Square = ({ square, children }: SquareProps) => {
    const { selectedSquare } = useChessboard();
    const { pieces, turn, makeMove, moves, selectSquare } = useChessboard();
    const pieceOnSquare = pieces[square];

    const isValidMove = moves.includes(square);
    const isSelected = selectedSquare === square;
    const hasMovablePiece = !!pieceOnSquare && isPieceOfColor(pieceOnSquare, turn);

    const handlePress = () => {
        if (hasMovablePiece) {
            selectSquare(square);
        }
        if (isValidMove && selectedSquare) {
            makeMove(selectedSquare, square);
        }
    };
    return (
        <Pressable onPressIn={handlePress}>

            <ImageBackground
                source={isWhiteSquare(square) ? require('@/assets/images/tile13.png') : require('@/assets/images/tile14.png')}
                style={styles.square}
            >
                {isValidMove && <View style={[styles.indicator, styles.moveIndicator]} />}
                {isSelected && <View style={[styles.indicator, styles.selectedIndicator]} />}

                {children}
            </ImageBackground>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    square: {
        width: 45,
        height: 45,
    },
    indicator: {
        width: 41,
        height: 41,
        position: "absolute",
        top: 2,
        left: 2,
        borderRadius: 5,
    },

    selectedIndicator: {
        backgroundColor: "#BE5A1C",
        opacity: 0.4,
    },
    moveIndicator: {

        backgroundColor: "#548550",
        opacity: 0.7,
    },
});

export default Square;
