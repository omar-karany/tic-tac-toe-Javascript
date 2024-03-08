let currentPlayer = "x";
const NUMBER_OF_ROWS = 3;
let counter = 0;
const numberOfAttempts = NUMBER_OF_ROWS **2;

board = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_'],
  ];

  const resetBoard = () => {
    document.querySelector('.board').remove();
    board = [
        ['_', '_', '_'],
        ['_', '_', '_'],
        ['_', '_', '_'],
      ];
      createBoard();
      currentPlayer = "x"
      counter = 0;
};

const checkWin = (currentPlayer) => {
   if(
     checkRows(currentPlayer) ||
     checkColumns(currentPlayer) ||
     checkDiagonals(currentPlayer) ||
     checkReverseDiagonals(currentPlayer)
    ) return true;
}

const checkRows = (currentPlayer) => {
    let column = 0;
  
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      while (column < NUMBER_OF_ROWS) {
        if (board[row][column] !== currentPlayer) {
          column = 0;
          break;
        }
        column++;
      }
  
      if (column === NUMBER_OF_ROWS) {
        return true;
      }
    }
  };
  
  const checkColumns = () => {
    let row = 0;
  
    for (let column = 0; column < NUMBER_OF_ROWS; column++) {
      while (row < NUMBER_OF_ROWS) {
        if (board[row][column] !== currentPlayer) {
          row = 0;
          break;
        }
        row++;
      }
  
      if (row === NUMBER_OF_ROWS) {
        return true;
      }
    }
  };
  
  const checkDiagonals = () => {
    let count = 0;
  
    while (count < NUMBER_OF_ROWS) {
      if (board[count][count] !== currentPlayer) {
        count = 0;
        break;
      }
      count++;
    }
  
    if (count === NUMBER_OF_ROWS) {
      return true;
    }
  };
  
  const checkReverseDiagonals = () => {
    let count = 0;
  
    while (count < NUMBER_OF_ROWS) {
      if (board[count][NUMBER_OF_ROWS - 1 - count] !== currentPlayer) {
        count = 0;
        break;
      }
      count++;
    }
  
    if (count === NUMBER_OF_ROWS) {
      return true;
    }
  };


const winAlert = (player) => {
    setTimeout(() => {alert(`${player} "Win!"`);
    resetBoard();
},100);
};

const drawAlert = () => {
    setTimeout(() => {alert("Draw!");
    resetBoard();
},100);

};

const updateBoard = (cell) => {
        cell.querySelector(".value").textContent = currentPlayer;
        cell.classList.add(`cell--${currentPlayer}`);
  };


  const getCell = (index, numberOfRows) => {
    const row = Math.floor(index / numberOfRows);
    const col = index % numberOfRows;
  
    return [row, col];
  };


const cellClickHanler = (event, index) => {
    
const cell = event.target;
const [row,col] = getCell (index,NUMBER_OF_ROWS)

if(board[row][col] === "_") {
    board[row][col] = currentPlayer;
    counter++;
    updateBoard(cell);

    if (checkWin(currentPlayer)){
        winAlert(currentPlayer);

    } else if (counter === numberOfAttempts) {
        drawAlert();
       
    } else {
        if (currentPlayer === 'x') {
        currentPlayer = 'o';
    }else {
        currentPlayer = 'x';
    }

}
}
}

const creatCell = (index) => {
    const cellElementString = `<div class="cell" role="button" tabindex="${index + 1}"><span class="value"></span></div>`;
    const cellElement = document.createRange().createContextualFragment(cellElementString);

    cellElement.querySelector(".cell").onclick = (event) => cellClickHanler(event, index);
    
    return cellElement;
}



const createBoard = () => {

const container = document.querySelector(".container");
const board = document.createElement('div');  
board.classList.add('board');

for(let i=0; i < numberOfAttempts; i++) {
    const cellElement = creatCell(i)
    board.appendChild(cellElement);
    document.documentElement.style.setProperty(' --grid-rows', NUMBER_OF_ROWS)
    //to access  "root" in css and over right css variable : 'grid rows'
}
container.insertAdjacentElement('afterbegin', board);

}
createBoard();


const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetBoard); 