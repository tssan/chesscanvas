import Canvas from "./lib/Canvas.js";
const fen1 = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const fen2 = "8/8/8/4p1K1/2k1P3/8/8/8 b - - 0 1";
const elementId1 = "board-canvas1";
const elementId2 = "board-canvas2";
const elementId3 = "board-canvas3";
const elementId4 = "board-canvas4";
const domElement1 = document.getElementById(elementId1);
const domElement2 = document.getElementById(elementId2);
const domElement3 = document.getElementById(elementId3);
const domElement4 = document.getElementById(elementId4);
const element1 = domElement1;
const element2 = domElement2;
const element3 = domElement3;
const element4 = domElement4;
const c1 = new Canvas(element1, fen1, 260);
const c2 = new Canvas(element2, fen1, 260, {
    flip: true
});
const c3 = new Canvas(element3, fen2, 350, {
    theme: {
        backgroundColor: "#D4F1F4",
        boardColor: "#189AB4",
        blackPiecesColor: "#05445E",
        whitePiecesColor: "#05445E"
    }
});
const c4 = new Canvas(element4, fen2, 350, {
    flip: true,
    theme: {
        backgroundColor: "#D4F1F4",
        boardColor: "#189AB4",
        blackPiecesColor: "#05445E",
        whitePiecesColor: "#05445E"
    }
});
