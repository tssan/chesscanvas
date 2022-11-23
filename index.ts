import { Canvas } from "./lib/Canvas.js"

const fen1: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

const elementId1: string = "board-canvas1"
const elementId2: string = "board-canvas1"
const domElement1 = document.getElementById(elementId1) as HTMLInputElement
const domElement2 = document.getElementById(elementId2) as HTMLInputElement
const element1: HTMLElement = domElement1;
const element2: HTMLElement = domElement2;

const c1 = new Canvas(element1, fen1, 300)
const c2 = new Canvas(element2, fen1, 300, {
    theme: {
        backgroundColor: "#eeeeee",
        boardColor: "#7727dd",
        piecesColor: "#22dddd"
    }
})
