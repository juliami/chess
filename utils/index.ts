import { SQUARE_SIZE } from "@/constants/board";
import { PieceSymbol } from "js-chess-engine";

export const isWhiteSquare = (cell: string) => {
    const col = cell.charCodeAt(0) - 'A'.charCodeAt(0);
    const row = 8 - parseInt(cell.charAt(1));
    return (col + row) % 2 === 1;
}

export const isPieceOfColor = (piece: PieceSymbol, color: 'white' | 'black'): boolean => {
    const isWhite = piece.toUpperCase() === piece;
    return color === 'white' ? isWhite : !isWhite;
};


export const getSquareByCoordinates = (
  absoluteX: number,
  absoluteY: number,
): string | null => {


  const column = Math.floor(absoluteX / SQUARE_SIZE);
  const row = Math.floor(absoluteY / SQUARE_SIZE);


  if (column < 0 || column > 7 || row < 0 || row > 7) {
    console.log('Outside board');
    return null;
  }

  const rowLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
  return `${rowLetters[row]}${column + 1}`;


};

