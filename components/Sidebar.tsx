'use client';
import { Textarea } from "./ui/textarea"
import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const PGNInput = ({ setBoard }: { setBoard: (fen: string) => void }) => {
  const [pgnText, setPgnText] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPgnText(event.target.value);
  };
  return (
    <div className="flex flex-col items-center p-4">
      <Textarea
        value={pgnText}
        onChange={handleInputChange}
        placeholder="Enter PGN here..."
        className="w-80 h-40 border p-2 rounded-md"
      />
      <button
        onClick={()=> handleClick}
   
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Get PGN as Array
      </button>
   
    </div>
  );
}

export default PGNInput