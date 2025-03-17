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


const getPlayersNames = (pgnString: string): string[][] => {
  const metadataOnly = pgnString
  .split("\n") 
  .filter(line => line.startsWith("[") && line.trim() !== "") 
  .join("\n"); 
  const whiteMatch = metadataOnly.match(/\[White\s"([^"]+)"\]/);
  const blackMatch = metadataOnly.match(/\[Black\s"([^"]+)"\]/);
  const whiteEloMatch = metadataOnly.match(/\[WhiteElo\s"(\d+)"\]/);
  const blackEloMatch = metadataOnly.match(/\[BlackElo\s"(\d+)"\]/);

  const whitePlayer = whiteMatch ? whiteMatch[1] : "";
  const blackPlayer = blackMatch ? blackMatch[1] : "";
  const whiteElo = whiteEloMatch ?` (${whiteEloMatch[1]})` : "";
  const blackElo = blackEloMatch ? ` (${blackEloMatch[1]})` : "";

  return [[whitePlayer, whiteElo], [blackPlayer, blackElo]]
}

const getOpeningData = (pgnString: string): string => {
  const metadataOnly = pgnString
  .split("\n") 
  .filter(line => line.startsWith("[") && line.trim() !== "") 
  .join("\n"); 
  const openingMatch = metadataOnly.match(/\[Opening\s"([^"]+)"\]/)
  const opening = openingMatch ? openingMatch[1] : "";
  return opening
}
export {
  getFENsFromPGN,
  getPlayersNames,
  getOpeningData
  
};