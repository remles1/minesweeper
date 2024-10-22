

function createHtmlBoard(rows,cols){
    const board = document.querySelector(".board");

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add("cell-closed");
            cell.id = "" + i + "-" + j;
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

function calculateCellValues(logicBoard){ //TODO ma obliczac ile jest bomb w sasiedztwie
    let rows = logicBoard.length;
    let cols = logicBoard[0].length;

    
}

function cellLeftClicked(){
    if(!this.classList.contains("cell-flagged")){
        this.classList.remove("cell-closed");
        this.classList.add("cell-opened");
    }
}

function cellRightClicked(){
    if(!this.classList.contains("cell-opened")){
        this.classList.toggle("cell-closed");
        this.classList.toggle("cell-flagged");
    }
    
}


rows = 16;
cols = 16;
mineCount = 40;

createHtmlBoard(rows,cols);
const logicBoard = createLogicBoard(rows,cols,mineCount);