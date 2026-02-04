import { ChessGameContext } from "@/context/boardContext";
import { useContext } from "react";


const useChessGame = () => {
    const context = useContext(ChessGameContext);
    if (!context) {
        throw new Error('useChessGame must be used within BoardProvider');
    }
    return context;
};


export const useChessboard = () => {
    const { pieces, turn, makeMove, moves, selectedSquare, selectSquare } = useChessGame();
    return { pieces, turn, makeMove, moves, selectedSquare, selectSquare };
};  
