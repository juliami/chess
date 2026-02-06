import { Game as ChessGame, PieceSymbol } from 'js-chess-engine';
import { createContext, useMemo, useRef, useState } from "react";

interface ChessGameContextType {
  selectedSquare: string | null;
  pieces: Record<string, PieceSymbol>;
  moves: string[];
  turn: "white" | "black";
  selectSquare: (square: string | null) => void;
  makeMove: (from: string, to: string) => void;
}

export const ChessGameContext = createContext<ChessGameContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const game = useRef(new ChessGame());

  const [gameState, setGameState] = useState(game.current.exportJson());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  const moves = useMemo(() => {
    if (!selectedSquare) return [];
    const validMoves = game.current.moves(selectedSquare);
    return validMoves[selectedSquare] || [];
  }, [selectedSquare, gameState]);

  const makeMove = (from: string, to: string) => {
    game.current.move(from, to);
    setGameState(game.current.exportJson());
    setSelectedSquare(null);
  };

  return (
    <ChessGameContext.Provider
      value={{
        selectedSquare,
        selectSquare: setSelectedSquare,
        pieces: gameState.pieces,
        turn: gameState.turn as "white" | "black",
        moves,
        makeMove,
      }}
    >
      {children}
    </ChessGameContext.Provider>
  );
};