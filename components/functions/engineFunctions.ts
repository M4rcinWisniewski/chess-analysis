import { Chess } from "chess.js";

const getFENsFromPGN = (pgnString: string): string[] => {
  const chess = new Chess();
  const fenArray: string[] = [];

  const movesOnly = pgnString
    .split("\n") // Split PGN into lines
    .filter(line => !line.startsWith("[") && line.trim() !== "") // Remove metadata lines
    .join(" ") // Recombine move lines into one string
    .replace(/\{.*?\}/g, "") // Remove in-game comments like `{ Black resigns. }`
    .replace(/\d+\./g, "") // Remove move numbers like `1. d4 g6`
    .trim()
    .split(/\s+/); // Split into an array of moves


  const filteredMoves = movesOnly.filter(move => !["1-0", "0-1", "1/2-1/2"].includes(move));

  

  for (const move of filteredMoves) {
    const moveResult = chess.move(move);
    if (!moveResult) {
      console.warn(`Invalid move detected: ${move}`);
      break; 
    }
    fenArray.push(chess.fen()); 
  }

  return fenArray
};

const getOnlyMetadata = (pgnString: string) => {
  return pgnString
  .split("\n") 
  .filter(line => line.startsWith("[") && line.trim() !== "") 
  .join("\n"); 

}

function extractMetadata(pgnString: string, key: string) {
  const metadataOnly = getOnlyMetadata(pgnString);
  const match = metadataOnly.match(new RegExp(`\\[${key}\\s"([^"]+)"\\]`));
  return match ? match[1] : "";
}
const getOpeningData = (pgnString: string): string => {
  const metadataOnly = getOnlyMetadata(pgnString);
  const openingMatch = metadataOnly.match(/\[Opening\s"([^"]+)"\]/)
  const opening = openingMatch ? openingMatch[1] : "";
  return opening
}
export {
  getFENsFromPGN,
  getOpeningData,
  extractMetadata
};