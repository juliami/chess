export const isWhiteSquare = (cell: string) => {
    const col = cell.charCodeAt(0) - 'A'.charCodeAt(0);
    const row = 8 - parseInt(cell.charAt(1));
    return (col + row) % 2 === 1;
}

export const isWhitePiece = (piece: string) => {
    return piece.toUpperCase() === piece;
}