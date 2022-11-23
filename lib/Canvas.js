const DefaultColorTheme = {
    backgroundColor: "#eeeeee",
    boardColor: "#5577dd",
    piecesColor: "#111111"
};
const DefaultBoardOptions = {
    theme: DefaultColorTheme
};
const FenPieceToChar = {
    "P": "♙", "K": "♔", "Q": "♕", "R": "♖", "B": "♗", "N": "♘",
    "p": "♟", "k": "♚", "q": "♛", "r": "♜", "b": "♝", "n": "♞"
};
export class Canvas {
    constructor(element, fen, size, options) {
        this.el = element;
        this.fen = fen;
        this.size = size;
        this.options = Object.assign(Object.assign({}, DefaultBoardOptions), options);
        this.el.style.width = `${size}px`;
        this.el.style.height = `${size}px`;
        this.el.style.backgroundColor = this.options.theme.backgroundColor;
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.boardPadding = 0.05 * size;
        this.squareSize = (size - 2 * this.boardPadding) / 8;
        this.filesSpaceSize = 6;
        this.boardFontSize = Math.max(this.boardPadding - this.filesSpaceSize / 2, 6);
        this.piecesFontSize = 0.75 * this.squareSize;
        this.el.appendChild(this.canvas);
        this.render();
    }
    render() {
        const ctx = this.canvas.getContext('2d');
        ctx.strokeStyle = this.options.theme.boardColor;
        ctx.fillStyle = this.options.theme.boardColor;
        // draw squares
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (i % 2 == 0 && j % 2 != 0) {
                    this.drawSquare(ctx, i, j);
                }
                else if (i % 2 != 0 && j % 2 == 0) {
                    this.drawSquare(ctx, i, j);
                }
            }
        }
        // draw border
        ctx.strokeRect(this.boardPadding, this.boardPadding, this.size - 2 * this.boardPadding, this.size - 2 * this.boardPadding);
        // draw ranks and files
        this.drawRanksAndFiles(ctx);
        // draw pieces
        this.drawPieces(ctx);
    }
    drawRanksAndFiles(ctx) {
        const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse();
        ctx.font = `${this.boardFontSize}px serif`;
        for (let i = 0; i < files.length; i++) {
            const charWidth = ctx.measureText(files[i]).width;
            const fileX = i * this.squareSize + this.squareSize - this.boardPadding / 2 + charWidth / 2;
            const fileY = this.boardFontSize - this.filesSpaceSize / 2;
            ctx.fillText(files[i], fileX, fileY);
        }
        for (let j = 0; j < ranks.length; j++) {
            const charWidth = ctx.measureText(ranks[j]).width;
            const rankX = this.boardPadding / 2 - charWidth / 2;
            const rankY = j * this.squareSize + 2 * this.boardPadding + this.boardFontSize / 2;
            ctx.fillText(ranks[j], rankX, rankY);
        }
    }
    drawSquare(ctx, x, y) {
        ctx.fillRect(x * this.squareSize + this.boardPadding, y * this.squareSize + this.boardPadding, this.squareSize, this.squareSize);
    }
    drawPieces(ctx) {
        const pieces = this.fenToPieces();
        ctx.font = `${this.piecesFontSize}px serif`;
        ctx.fillStyle = this.options.theme.piecesColor;
        for (let i = 0; i < pieces.length; i++) {
            for (let j = 0; j < pieces[i].length; j++) {
                const piece = FenPieceToChar[pieces[j][i]];
                if (piece) {
                    const charWidth = ctx.measureText(piece).width;
                    ctx.fillText(piece, i * this.squareSize + this.squareSize - this.boardPadding / 2 - charWidth / 4, j * this.squareSize + this.squareSize + this.piecesFontSize / 4);
                }
            }
        }
        ctx.fillStyle = this.options.theme.boardColor;
    }
    fenToPieces() {
        const pieces = [];
        const ranks = this.fen.split(" ")[0].split("/");
        for (const row of ranks) {
            const rowNumber = Number(row);
            if (isNaN(rowNumber)) {
                pieces.push(row.split(""));
            }
            else {
                pieces.push(Array(rowNumber).fill(""));
            }
        }
        return pieces;
    }
}
