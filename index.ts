import Canvas from "./lib/Canvas.js"

const fen1: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const fen2: string = "8/8/8/4p1K1/2k1P3/8/8/8 b - - 0 1";

const elementId1: string = "board-canvas1"
const elementId2: string = "board-canvas2"
const elementId3: string = "board-canvas3"
const elementId4: string = "board-canvas4"

const domElement1 = document.getElementById(elementId1) as HTMLInputElement
const domElement2 = document.getElementById(elementId2) as HTMLInputElement
const domElement3 = document.getElementById(elementId3) as HTMLInputElement
const domElement4 = document.getElementById(elementId4) as HTMLInputElement

const element1: HTMLElement = domElement1;
const element2: HTMLElement = domElement2;
const element3: HTMLElement = domElement3;
const element4: HTMLElement = domElement4;

const c1 = new Canvas(element1, fen1, 260)
const c2 = new Canvas(element2, fen1, 260, {
    flip: true
})
const c3 = new Canvas(element3, fen2, 350, {
    theme: {
        backgroundColor: "#D4F1F4",
        boardColor: "#189AB4",
        blackPiecesColor: "#05445E",
        whitePiecesColor: "#05445E"
    }
})
const c4 = new Canvas(element4, fen2, 350, {
    flip: true,
    theme: {
        backgroundColor: "#D4F1F4",
        boardColor: "#189AB4",
        blackPiecesColor: "#05445E",
        whitePiecesColor: "#05445E"
    }
})
