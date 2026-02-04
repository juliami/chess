import { ChessGameContext } from "@/context/boardContext";
import { useContext } from "react";

export const usePieces = () => {
    const { pieces, setPieces } = useContext(ChessGameContext);
    return { pieces, setPieces } as const;
}

export const useSetPieces = () => {
    const { setPieces } = useContext(ChessGameContext);
    return setPieces;
}