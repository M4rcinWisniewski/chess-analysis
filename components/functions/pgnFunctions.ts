import { Chess } from "chess.js";

/**
 * Convert a PGN string into an array of FENs (board positions after each move)
 * @param pgnString - The full PGN including metadata and moves.
 * @returns Array of FEN strings representing every position in the game.
 */
const getFENsFromPGN = (pgnString: string): string[] => {
  const chess = new Chess();
  const fenArray: string[] = [];

  // Step 1: Extract moves (remove headers and metadata)
  const movesOnly = pgnString
    .split("\n") // Split PGN into lines
    .filter(line => !line.startsWith("[") && line.trim() !== "") // Remove metadata lines
    .join(" ") // Recombine move lines into one string
    .replace(/\{.*?\}/g, "") // Remove in-game comments like `{ Black resigns. }`
    .replace(/\d+\./g, "") // Remove move numbers like `1. d4 g6`
    .trim()
    .split(/\s+/); // Split into an array of moves

  // Step 2: Remove game results if present (e.g., "1-0", "0-1", "1/2-1/2")
  const filteredMoves = movesOnly.filter(move => !["1-0", "0-1", "1/2-1/2"].includes(move));

  // Step 3: Apply each move and store the resulting FEN
  for (const move of filteredMoves) {
    const moveResult = chess.move(move);
    if (!moveResult) {
      console.warn(`Invalid move detected: ${move}`);
      break; // Stop processing if an invalid move is encountered
    }
    fenArray.push(chess.fen()); // Store FEN after each move
  }

  return fenArray;
};

export default getFENsFromPGN;