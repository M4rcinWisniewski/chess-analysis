"use client";
import Rightbar from "./Rightbar";
import dynamic from "next/dynamic";
import "../app/globals.css";
import React from "react";
import { getPlayersNames, extractMetadata} from "./functions/engineFunctions";

const Chessboard = dynamic(() => import("react-chessboard").then((mod) => mod.Chessboard), { ssr: false });

export default function Analysis() {
    const [board, setBoard] = React.useState<string>('start')
    const [pgnText, setPgnText] = React.useState<string>("");
    // const playerName = getPlayersNames(pgnText);
    const whiteName = extractMetadata(pgnText, "White");
    const blackName = extractMetadata(pgnText, "Black");
    const whiteElo = extractMetadata(pgnText, "WhiteElo");
    const blackElo = extractMetadata(pgnText, "BlackElo");
    return (
    <div className="flex justify-center items-center">
        <div className="flex flex-col gap-5 text-white">
        <p className="flex gap-3 text-lg">{blackName} {whiteElo}</p>
        <Chessboard boardWidth={560} customBoardStyle={{
            borderRadius: "10px"
            
        }}
        position={board}
        arePiecesDraggable={false}
        />
        <p className="flex gap-3 text-lg">{whiteName} {blackElo}</p>
        </div>
        <Rightbar setBoard={setBoard} setPgnText={setPgnText} pgnText={pgnText}/>
    </div>

    )
}