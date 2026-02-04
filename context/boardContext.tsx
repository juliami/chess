import { Game as ChessGame, PieceSymbol } from 'js-chess-engine';
import { createContext, useEffect, useState } from "react";
         
interface ChessGameContextType {
    selectedSquare: string | null;
    pieces: Record<string, PieceSymbol>;
    moves: string[];
    turn: 'white' | 'black';

    selectSquare: (square: string | null) => void;
    makeMove: (from: string, to: string) => void;
}


export const ChessGameContext = createContext<ChessGameContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
    const [game] = useState(() => new ChessGame());  
    const [pieces, setPieces] = useState(() => game.exportJson().pieces);
    const [turn, setTurn] = useState(() => game.exportJson().turn);

    const [moves, setMoves] = useState<string[]>([]);
    
    useEffect(() => {
        if (selectedSquare) {
            const moves = game.moves(selectedSquare)[selectedSquare];
            setMoves(moves);
        }
    }, [selectedSquare]);


    const selectSquare = (square: string | null) => {
        setSelectedSquare(square);
    };


    const makeMove = (from: string, to: string) => {
        game.move(from, to);
        setPieces(game.exportJson().pieces);
        setMoves([]);
        setTurn(game.exportJson().turn);
        setSelectedSquare(null);
    };

    return (
        <ChessGameContext.Provider value={{ selectedSquare, pieces, moves, selectSquare, turn, makeMove }}>
            {children}
        </ChessGameContext.Provider>
    );
};