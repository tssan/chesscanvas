import { Canvas } from "./lib/Canvas.js";
const fen1 = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const elementId1 = "board-canvas1";
const elementId2 = "board-canvas1";
const domElement1 = document.getElementById(elementId1);
const domElement2 = document.getElementById(elementId2);
const element1 = domElement1;
const element2 = domElement2;
const c1 = new Canvas(element1, fen1, 300);
const c2 = new Canvas(element2, fen1, 300, {
    theme: {
        backgroundColor: "#eeeeee",
        boardColor: "#7727dd",
        piecesColor: "#22dddd"
    }
});
