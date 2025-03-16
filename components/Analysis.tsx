"use client";
import Sidebar from "./Rightbar";
import dynamic from "next/dynamic";
import "../app/globals.css";
import React from "react";

const Chessboard = dynamic(() => import("react-chessboard").then((mod) => mod.Chessboard), { ssr: false });

export default function Analysis() {
    const [board, setBoard] = React.useState<string>('start')
    return (
    <div className="flex justify-center items-center">
        <Chessboard boardWidth={560} customBoardStyle={{
            borderRadius: "10px"
            
        }}
        position={board}
        />
        <Sidebar setBoard={setBoard} board={board}/>
    </div>

    )
}