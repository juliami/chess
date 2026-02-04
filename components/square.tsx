import { isWhiteSquare } from "@/utils";
import { StyleSheet, View } from "react-native";

interface SquareProps {
    square: string;
    children: React.ReactNode;
}
const Square = ({ square, children }: SquareProps) => {
    const isWhite = isWhiteSquare(square);
    return <View style={[styles.square, isWhite && styles.white]}>
        {children}
    </View>
}

const styles = StyleSheet.create({
    square: {
        width: 45,
        height: 45,
        backgroundColor: '#514B40',
    },
    white: {
        backgroundColor: '#ece1cd',
    },

});

export default Square;