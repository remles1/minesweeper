

function createHtmlBoard(rows,cols){

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add("cell-closed");
            cell.id = "id" + i + "-" + j;
            cell.addEventListener("click",cellLeftClicked); 
            cell.addEventListener("contextmenu",cellRightClicked); 
            board.appendChild(cell);
        }
    }
}

function createLogicBoard(rows,cols,mineCount){
    const logicBoard = [];

    for(let i = 0; i < rows; i++){
        const row = [];
        for(let j = 0; j < cols; j++){
            row.push(0);
        }
        logicBoard.push(row);
    }

    populateLogicBoardWithMines(logicBoard,mineCount)
    calculateCellValues(logicBoard);

    return logicBoard;
}



function populateLogicBoardWithMines(logicBoard,mineCount){
    let minesToPlace = mineCount;
    let rows = logicBoard.length;
    let cols = logicBoard[0].length;

    while(minesToPlace > 0){
        i = Math.floor(Math.random() * rows);
        j = Math.floor(Math.random() * cols);

        if(logicBoard[i][j] === 0){
            logicBoard[i][j] = -1;
            minesToPlace--;
        }
    }
}

function calculateCellValues(logicBoard){ //oblicza ile jest bomb w sasiedztwie
    const rows = logicBoard.length;
    const cols = logicBoard[0].length;

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            if(logicBoard[i][j] === 0){
                logicBoard[i][j] = calculateNeighborhood(logicBoard,rows,cols,i,j);
            }
                
        } 
    }
}

function calculateNeighborhood(logicBoard, rows, cols, i, j){
    let sum = 0;
    for(let di = -1; di <= 1; di++){
        let currentRow = i + di;
        if(currentRow < 0 || currentRow >= rows) continue;

        for(let dj = -1; dj <= 1; dj++){
            let currentCol = j + dj;

            if(currentCol < 0 || currentCol >= cols) continue;
            if(di == 0 && dj == 0) continue;

            if(logicBoard[currentRow][currentCol] === -1){
                sum++;
            }
        }
    }
    return sum;
}

function cellLeftClicked(){
    if(!(this.classList.contains("cell-flagged") || this.classList.contains("cell-opened"))){
        this.classList.remove("cell-closed");
        this.classList.add("cell-opened");
        const split = this.id.split('-');
        const celli = Number(split[0].substring(2));
        const cellj = Number(split[1]);
        const cellValue = logicBoard[celli][cellj];
        if(cellValue === -1){
            //tutaj co jak sie kliknie w bombe
            //to ponizej tymczasowe
            this.classList.add("cell-mine");
        }
        else{
            this.classList.add("cell-" + cellValue);
            if(cellValue === 0){
                //tutaj otwieramy okolice
                openFreeCells(celli,cellj);
            }
        }
        

        checkWin();
    }
}

function checkWin(){
    let noClosedCellsLeft = !(Array.from(board.children).some(cell => cell.classList.contains("cell-closed")));
    if(noClosedCellsLeft && mineCount == flaggedMines){
        alert("you win!");
    }
}

function cellRightClicked(){
    if(!this.classList.contains("cell-opened")){
        this.classList.toggle("cell-closed");
        this.classList.toggle("cell-flagged");

        const split = this.id.split('-');
        const celli = Number(split[0].substring(2));
        const cellj = Number(split[1]);

        if(logicBoard[celli][cellj] === -1){
            if(this.classList.contains("cell-flagged")){
                flaggedMines++;
            }
            else{
                flaggedMines--;
            }
        }
    }
}

function openFreeCells(celli,cellj){
    if(traversed[celli][cellj]){
        return;
    }

    traversed[celli][cellj] = true;
    const id = "id" + celli + "-" + cellj;
    const cell = document.querySelector("#" + id);
    const cellValue = logicBoard[celli][cellj]
    if(!(cellValue === 0)){
        cell.classList.remove("cell-closed");
        cell.classList.add("cell-opened");
        cell.classList.add("cell-" + cellValue);
    }
    else{
        //rows i cols maja byc zmiennymi globalnymi w tym momencie, niemozliwe inaczej
        
        for(let di = -1; di <= 1; di++){
            let currentRow = celli + di;
            if(currentRow < 0 || currentRow >= rows) continue;
    
            for(let dj = -1; dj <= 1; dj++){
                let currentCol = cellj + dj;
    
                if(currentCol < 0 || currentCol >= cols) continue;
                if(di == 0 && dj == 0) continue;
                
                
                cell.classList.remove("cell-closed");
                cell.classList.add("cell-opened");
                openFreeCells(currentRow,currentCol);
            }
        }
    }
}

let rows = 16;
let cols = 16;
let mineCount = 40;

let flaggedMines = 0;

const board = document.querySelector(".board");
createHtmlBoard(rows,cols);
const logicBoard = createLogicBoard(rows,cols,mineCount);

const traversed = [];
    for(let i = 0; i < rows; i++){
        const row = [];
        traversed.push(row);
        for(let j = 0; j < cols; j++){
            traversed[i][j] = false;
        }
    }