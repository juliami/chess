import { useChessboard } from "@/hooks/use-chess-game";
import { isPieceOfColor, isWhiteSquare } from "@/utils";
import { Pressable, StyleSheet, View } from "react-native";

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
        if (hasMovablePiece){
            selectSquare(square);
        } 
        if (isValidMove && selectedSquare){
            makeMove(selectedSquare, square);
        }
    };
    return (
        <Pressable onPressIn={handlePress}>
            <View style={[
                styles.square, 
                isWhiteSquare(square) && styles.white, 
                isValidMove && styles.move, 
                isSelected && styles.selected]}
                >
                    {children}
            </View>
        </Pressable>
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
    selected: {
        borderColor: "deeppink",
        borderWidth: 6,
        borderStyle: "solid",
    },

    move: {
        borderColor: "green",
        borderWidth: 6,
        borderStyle: "solid",
    },
});

export default Square;
