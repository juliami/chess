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