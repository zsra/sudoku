var button = document.querySelector(".start-box");
var table = document.querySelector(".sudoku-table");
var tableBody = document.querySelector(".sudoku-table-body");


button.addEventListener('click', () => {
    showTable();

    let puzzle = generateSudoku();

    createCells(puzzle);
});


function showTable() {  
    button.style.visibility = "collapse";
    table.style.visibility = "visible";
}

function createCells(puzzle) {
    for(let i = 0; i < 9; i++) {
        let row = table.insertRow(i);

        for(let j = 0; j < 9; j++) {
            let cell = row.insertCell(j);

            if(puzzle[i][j] !== 0) {
                cell.innerHTML = puzzle[i][j];
            }
        }
    }
}

function generateSudoku() {
    let grid = Array.from({ length: 9 }, () => Array(9).fill(0));

    fillDiagonalSubgrids(grid);
    solveSudoku(grid);
    
    return removeNumbers(grid, 0.5);
}

function fillDiagonalSubgrids(grid) {
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
        fillSubgrid(grid, row, col);
        }
    }
}

function fillSubgrid(grid, row, col) {
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let index = 0;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[row + i][col + j] = nums[index++];
      }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function solveSudoku(grid) {
    const emptyCell = findEmptyCell(grid);
  
    if (!emptyCell) {
      return true;
    }
  
    const [row, col] = emptyCell;
  
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(grid, row, col, num)) {
        grid[row][col] = num;
  
        if (solveSudoku(grid)) {
          return true;
        }
  
        grid[row][col] = 0;
      }
    }
  
    return false;
}
  
function findEmptyCell(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
}
  
function isValidMove(grid, row, col, num) {
    return (
      !isInRow(grid, row, num) &&
      !isInCol(grid, col, num) &&
      !isInSubgrid(grid, row - (row % 3), col - (col % 3), num)
    );
}

function isInRow(grid, row, num) {
    return grid[row].includes(num);
}
  
function isInCol(grid, col, num) {
    return grid.some(row => row[col] === num);
}
  
function isInSubgrid(grid, startRow, startCol, num) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] === num) {
          return true;
        }
      }
    }
    return false;
}
  
function removeNumbers(grid, difficulty) {
    const totalCells = 81;
    const cellsToRemove = Math.floor(totalCells * difficulty);
  
    for (let i = 0; i < cellsToRemove; i++) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
  
      if (grid[row][col] !== 0) {
        grid[row][col] = 0;
      } else {
        i--; 
      }
    }
  
    return grid;
}
  
  