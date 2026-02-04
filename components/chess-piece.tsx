import { usePieces } from "@/hooks/use-pieces";
import { useSelectedPiece } from "@/hooks/use-selected-piece";
import { isWhitePiece } from "@/utils";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

interface ChessPieceProps {
    square: string;
}
const ChessPiece = ({ square }: ChessPieceProps) => {
    const { selectedPiece, setSelectedPiece } = useSelectedPiece();
    const { pieces } = usePieces();
    const piece = pieces[square];

    if (!piece) return null;

    const backgroundColor = isWhitePiece(piece) ? 'beige' : 'dimgray';


    return (
        <Pressable onPressIn={() => {
            setSelectedPiece(square);  
        }} style={styles.pressable}>
            <View style={[styles.piece, {
                backgroundColor,
                borderColor: selectedPiece === square ? 'deeppink' : 'transparent'
            }]}>
                <ThemedText>{piece}</ThemedText>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    pressable: {
        width: '100%',
        height: '100%',
    },
    piece: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 999,
        borderWidth: 4,
        borderColor: 'transparent',
    }

})

export default ChessPiece;

