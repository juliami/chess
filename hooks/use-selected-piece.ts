import { ChessGameContext } from "@/context/boardContext";
import { useContext } from "react";

export const useSelectedPiece = () => {
    const { selectedPiece, setSelectedPiece } = useContext(ChessGameContext);
    return { selectedPiece, setSelectedPiece } as const;
}

export const useSetSelectedPiece = () => {
    const { setSelectedPiece } = useContext(ChessGameContext);
    return setSelectedPiece;
}

