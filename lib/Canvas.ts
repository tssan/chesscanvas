type ColorTheme = {
    backgroundColor: string,
    boardColor: string,
    blackPiecesColor: string,
    whitePiecesColor: string
}

const DefaultColorTheme: ColorTheme = {
    backgroundColor: "#e7e7e7",
    boardColor: "#a7a7a7",
    blackPiecesColor: "#131313",
    whitePiecesColor: "#5b7731"
}

type PieceChar = {
    [key: string]: string;
};


type BoardOptions = {
    theme?: ColorTheme,
    flip?: boolean
}


const DefaultBoardOptions: BoardOptions = {
    theme: DefaultColorTheme,
    flip: false
}


const FenPieceToChar: PieceChar = {
    "P": "♙", "K": "♔", "Q": "♕", "R": "♖", "B": "♗", "N": "♘",
    "p": "♟", "k": "♚", "q": "♛", "r": "♜", "b": "♝", "n": "♞"
}

export default class Canvas {
    el: HTMLElement
    fen: string
    size: number
    canvas: HTMLCanvasElement
    options: BoardOptions

    private squareSize: number
    private boardPadding: number
    private boardFontSize: number
    private piecesFontSize: number
    private filesSpaceSize: number

    constructor(element: HTMLElement, fen: string, size: number, options?: BoardOptions) {
        this.el = element
        this.fen = fen
        this.size = size
        this.options = {...DefaultBoardOptions, ...options}

        this.el.style.width = `${size}px`
        this.el.style.height = `${size}px`
        this.el.style.backgroundColor = this.options.theme!.backgroundColor

        this.canvas = document.createElement("canvas")
        this.canvas.width = size
        this.canvas.height = size

        this.boardPadding = 0.05 * size
        this.squareSize = (size - 2 * this.boardPadding) / 8
        this.filesSpaceSize = 6
        this.boardFontSize = Math.max(this.boardPadding - this.filesSpaceSize / 2, 6)
        this.piecesFontSize = 0.75 * this.squareSize

        this.el.appendChild(this.canvas)
        this.render()
    }

    public render(): void {
        const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        // draw background rect
        ctx.fillStyle = this.options.theme!.backgroundColor
        ctx.fillStyle = this.options.theme!.backgroundColor
        ctx.fillRect(0, 0, this.size, this.size)

        ctx.strokeStyle = this.options.theme!.boardColor
        ctx.fillStyle = this.options.theme!.boardColor
        // draw squares
        for(let i=0; i<8; i++) {
            for(let j=0; j<8; j++) {
                if(i % 2 == 0 && j % 2 != 0) {
                    this.drawSquare(ctx, i, j)
                } else if(i % 2 != 0 && j % 2 == 0){
                    this.drawSquare(ctx, i, j)
                }
            }
        }

        // draw border
        ctx.strokeRect(this.boardPadding, this.boardPadding, this.size - 2 * this.boardPadding, this.size - 2 * this.boardPadding)

        // draw ranks and files
        this.drawRanksAndFiles(ctx)

        // draw pieces
        this.drawPieces(ctx)
    }

    private drawRanksAndFiles(ctx: CanvasRenderingContext2D): void {
        const files = ["a", "b", "c", "d", "e", "f", "g", "h"]
        const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse()

        if(this.options.flip) {
            files.reverse()
            ranks.reverse()
        }

        ctx.font = `${this.boardFontSize}px serif`

        for(let i=0; i<files.length; i++) {
            const charWidth: number = ctx.measureText(files[i]).width
            const fileX: number = i * this.squareSize + this.squareSize - this.boardPadding / 2 + charWidth / 2
            const fileY: number = this.boardFontSize - this.filesSpaceSize / 2
            ctx.fillText(files[i], fileX, fileY)
        }

        for(let j=0; j<ranks.length; j++) {
            const charWidth: number = ctx.measureText(ranks[j]).width
            const rankX: number = this.boardPadding / 2 - charWidth / 2
            const rankY: number = j * this.squareSize + 2 * this.boardPadding + this.boardFontSize / 2
            ctx.fillText(ranks[j], rankX, rankY)
        }
    }

    private getPieceColor(pieceChar: string): string {
        if(pieceChar == pieceChar.toUpperCase()) {
            return this.options.theme!.whitePiecesColor
        } else {
            return this.options.theme!.blackPiecesColor
        }
    }

    private drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.fillRect(x * this.squareSize + this.boardPadding, y * this.squareSize + this.boardPadding, this.squareSize, this.squareSize)
    }

    private drawPieces(ctx: CanvasRenderingContext2D): void {
        const pieces: Array<Array<string>> = this.fenToPieces()

        ctx.font = `${this.piecesFontSize}px serif`

        for(let i: number=0; i<pieces.length; i++) {
            for(let j: number=0; j<pieces[i].length; j++) {
                const piece: string = FenPieceToChar[pieces[j][i]]
                if(piece) {
                    const charWidth: number = ctx.measureText(piece).width
                    ctx.fillStyle = this.getPieceColor(pieces[j][i])
                    ctx.fillText(
                        piece,
                        i * this.squareSize + this.squareSize - this.boardPadding / 2 - charWidth / 4,
                        j * this.squareSize + this.squareSize + this.piecesFontSize / 4
                    )
                }
            }
        }
        ctx.fillStyle = this.options.theme!.boardColor
    }

    private parseFenRow(row: string): Array<string> {
        const files = row.split("")
        let filesChars: Array<string> = []

        for(let symbol of files) {
            if(isNaN(Number(symbol))) {
                filesChars.push(symbol)
            } else {
                filesChars = [...filesChars, ...Array(Number(symbol)).fill("")]
            }
        }
        if(this.options.flip) {
            filesChars.reverse()
        }
        return filesChars
    }

    private fenToPieces(): Array<Array<string>> {
        const pieces: Array<Array<string>> = []
        const ranks: Array<string> = this.fen.split(" ")[0].split("/")

        if(this.options.flip) {
            ranks.reverse()
        }

        for(const row of ranks) {
            pieces.push(this.parseFenRow(row))
        }
        return pieces
    }
}
