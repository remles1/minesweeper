

function createBoard(){
    const board = document.querySelector(".board");

    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 16; j++){
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

function cellLeftClicked(){
    if(!this.classList.contains("cell-flagged")){
        this.classList.remove("cell-closed");
        this.classList.add("cell-opened");
    }
}

function cellRightClicked(){
    this.classList.toggle("cell-closed");
    this.classList.toggle("cell-flagged");
}

createBoard()
