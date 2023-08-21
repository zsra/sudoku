var button = document.querySelector(".start-box");
var table = document.querySelector(".sudoku-table");
var tableBody = document.querySelector(".sudoku-table-body");


button.addEventListener('click', () => {
    showTable();
});


function showTable() {  
    button.style.visibility = "collapse";
    table.style.visibility = "visible";
}

