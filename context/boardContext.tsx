import { Game, PieceSymbol } from 'js-chess-engine';
import { createContext, useState } from "react";
         
export const ChessGameContext = createContext({
    selectedPiece: null as string | null,
    setSelectedPiece: (piece: string | null) => {},
    pieces: {} as Record<string, PieceSymbol>,
    setPieces: (pieces: Record<string, PieceSymbol>) => {},
});

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
    const [game] = useState(() => new Game());  
    const [pieces, setPieces] = useState(() => game.exportJson().pieces);
    
    return (
        <ChessGameContext.Provider value={{ selectedPiece, setSelectedPiece, pieces, setPieces }}>
            {children}
        </ChessGameContext.Provider>
    );
};