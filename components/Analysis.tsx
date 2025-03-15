"use client";
import Sidebar from "./Sidebar";
import dynamic from "next/dynamic";
import "../app/globals.css";
import React from "react";

const Chessboard = dynamic(() => import("react-chessboard").then((mod) => mod.Chessboard), { ssr: false });

export default function Analysis() {
    const [board, setBoard] = React.useState<string[]>([])
    return (
    <div className="flex justify-center items-center">
        <Chessboard boardWidth={560} customBoardStyle={{
            borderRadius: "10px"
        }}/>
        <Sidebar setBoard={setBoard}/>
    </div>

    )
}