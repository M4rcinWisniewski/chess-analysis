"use client";
import Rightbar from "./Rightbar";
import dynamic from "next/dynamic";
import "../app/globals.css";
import React from "react";
import { getPlayersNames } from "./functions/engineFunctions";

const Chessboard = dynamic(() => import("react-chessboard").then((mod) => mod.Chessboard), { ssr: false });

export default function Analysis() {
    const [board, setBoard] = React.useState<string>('start')
    const [pgnText, setPgnText] = React.useState<string>("");
    const playerName = getPlayersNames(pgnText);
    return (
    <div className="flex justify-center items-center">
        <div className="flex flex-col gap-5 text-white">
        <p className="flex gap-3 text-lg">{playerName[1][0]} {playerName[1][1]}</p>
        <Chessboard boardWidth={560} customBoardStyle={{
            borderRadius: "10px"
            
        }}
        position={board}
        arePiecesDraggable={false}
        />
        <p className="flex gap-3 text-lg">{playerName[0][0]} {playerName[0][1]}</p>
        </div>
        <Rightbar setBoard={setBoard} setPgnText={setPgnText} pgnText={pgnText}/>
    </div>

    )
}