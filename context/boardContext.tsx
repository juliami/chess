import { Game, PieceSymbol } from 'js-chess-engine';
import { createContext, useEffect, useState } from "react";
         
export const ChessGameContext = createContext({
    selectedPiece: null as string | null,
    setSelectedPiece: (piece: string | null) => {},
    pieces: {} as Record<string, PieceSymbol>,
    setPieces: (pieces: Record<string, PieceSymbol>) => {},
    game: null as Game | null,
    moves: [] as string[],
});

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
    const [game] = useState(() => new Game());  
    const [pieces, setPieces] = useState(() => game.exportJson().pieces);
    const [moves, setMoves] = useState<string[]>([]);

    useEffect(() => {
        if (selectedPiece) {
            const moves = game.moves(selectedPiece)[selectedPiece];
            setMoves(moves);
        }
    }, [selectedPiece]);


    return (
        <ChessGameContext.Provider value={{ selectedPiece, setSelectedPiece, pieces, setPieces, moves }}>
            {children}
        </ChessGameContext.Provider>
    );
};