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

const SQUARE_SIZE = 45;


/**
 * Converts screen coordinates to chess square notation (e.g., "a1", "h8")
 * @param absoluteX - Absolute X coordinate on screen
 * @param absoluteY - Absolute Y coordinate on screen
 * @param boardX - Board's X offset on screen (default 0)
 * @param boardY - Board's Y offset on screen (default 0)
 * @param boardOrientation - "white" (default) or "black" for flipped board
 * @returns Chess square notation (e.g., "e4") or null if outside board
 */
export const getSquareByCoordinates = (
  absoluteX: number,
  absoluteY: number,
  boardX: number = 0,
  boardY: number = 0,
  boardOrientation: "white" | "black" = "white"
): string | null => {
  // Convert to board-relative coordinates
  const relativeX = absoluteX - boardX;
  const relativeY = absoluteY - boardY;

  console.log('Absolute:', absoluteX, absoluteY);
  console.log('Board offset:', boardX, boardY);
//   console.log('Relative:', relativeX, relativeY);

  // Calculate which file (column) and rank (row)
  const file = Math.floor(relativeX / SQUARE_SIZE);
  const rank = Math.floor(relativeY / SQUARE_SIZE);

  console.log('File/Rank:', file, rank);

  // Check if coordinates are within the board (0-7 for both)
  if (file < 0 || file > 7 || rank < 0 || rank > 7) {
    return null;
  }

  // Convert to chess notation
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
  if (boardOrientation === "white") {
    // White's perspective: a1 is bottom-left
    const fileLetter = files[file];
    const rankNumber = 8 - rank; // Invert because y=0 is top
    return `${fileLetter}${rankNumber}`;
  } else {
    // Black's perspective: h8 is bottom-left
    const fileLetter = files[7 - file];
    const rankNumber = rank + 1;
    return `${fileLetter}${rankNumber}`;
  }
};

// Example usage:
// getSquareByCoordinates(0, 315) → "a1" (white perspective)
// getSquareByCoordinates(45, 0) → "b8" (white perspective)
// getSquareByCoordinates(40, 40) → "a8" (white perspective)