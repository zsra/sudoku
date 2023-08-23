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
  const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let i = 0; i < 9; i += 3) {
    fillSubgrid(grid, i, i, nums);
  }
}

function fillSubgrid(grid, row, col, nums) {
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
  if (grid[row].includes(num)) {
    return false;
  }

  if (grid.some(r => r[col] === num)) {
    return false;
  }

  const subgridStartRow = Math.floor(row / 3) * 3;
  const subgridStartCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[subgridStartRow + i][subgridStartCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

function removeNumbers(grid, difficulty) {
  const totalCells = 81;
  const cellsToRemove = Math.floor(totalCells * difficulty);

  for (let i = 0; i < cellsToRemove; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (grid[row][col] !== 0) {
      const temp = grid[row][col];
      grid[row][col] = 0;

      const copy = grid.map(row => [...row]);

      if (!solveSudoku(copy)) {
        grid[row][col] = temp;
        i--;
      }
    } else {
      i--;
    }
  }

  return grid;
}