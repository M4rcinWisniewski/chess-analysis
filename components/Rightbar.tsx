'use client';
import { Textarea } from "./ui/textarea"
import { useState } from "react";
import {getFENsFromPGN, getOpeningData} from './functions/engineFunctions' // translate PGN array into FENS of all positions that apeared in the specific game
import IconButton from "./IconButton";
import { Button } from "./ui/button";
import { AiFillCaretRight, AiFillCaretLeft, AiFillBackward, AiFillForward} from "react-icons/ai";

interface PGNInputTypes {
  setBoard: (fen: string) => void
  pgnText: string
  setPgnText: (text: string)  => void
}
const PGNInput = ({ setBoard, pgnText, setPgnText}: PGNInputTypes) => {
  
  const [fenArray, setFenArray] = useState<string[]>([]);
  const [currentMove, setCurrentMove] = useState<number>(0); // Track move index

  // Handle text input
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPgnText(event.target.value);
  };
  
  const handleClick = () => {
    const fens = getFENsFromPGN(pgnText);
    setFenArray(fens);
    setBoard(fens[0]); 
    setCurrentMove(0); 
  };

  const nextMove = () => {
    if (currentMove < fenArray.length - 1) { 
      setCurrentMove(currentMove + 1);
      setBoard(fenArray[currentMove + 1]);
    }
  };


  const previousMove = () => {
    if (currentMove <= fenArray.length - 1) { 
      setCurrentMove(currentMove - 1);
      setBoard(fenArray[currentMove - 1]);
    }


  };
  const firstMove = () => {
    setBoard('start');
    setCurrentMove(-1);
  }; 

  const lastMove = () => {
    setBoard(fenArray[fenArray.length - 1]);
    setCurrentMove(fenArray.length - 1)
  }
  const opening = getOpeningData(pgnText)
  return (
    <div className="flex flex-col items-center p-4 gap-10 ">
      <p className="text-white">{opening}</p>
      <Textarea
        value={pgnText}
        onChange={handleInputChange}
        placeholder="Enter PGN here..."
        className="w-80 h-40 border rounded-sm p-2 text-white"
      />
      <Button
        onClick={handleClick}
   
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Get PGN as Array
      </Button>
      
      
      <div className="flex justify-center items-center gap-5">
        <IconButton onClick={firstMove} icon={<AiFillBackward />}/>
        <IconButton onClick={previousMove} icon={<AiFillCaretLeft />}/>
        <IconButton onClick={nextMove} icon={<AiFillCaretRight />}/>
        <IconButton onClick={lastMove} icon={<AiFillForward />}/>
      </div>
    </div>
  );
}

export default PGNInput

