import ChessPiece from "@/components/piece";
import Square from "@/components/square";
import { SQUARES } from "@/constants/board";
import { StyleSheet, View } from "react-native"; // Import Game class and stateless functions

const Board = () => (
    <View style={styles.board}>
        {SQUARES.map((square) => (
            <Square key={square} square={square}>
                <ChessPiece square={square} />
            </Square>
        ))}
    </View>
);


const styles = StyleSheet.create({
    board: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});

export default Board;
