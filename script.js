let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const gameBoard = document.getElementById("game-board");
const gameInfo = document.getElementById("game-info");

function renderBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, idx) => {
    const cellDiv = document.createElement("div");
    cellDiv.className = "cell";
    cellDiv.dataset.index = idx;
    cellDiv.innerText = cell;
    cellDiv.onclick = cellClick;
    gameBoard.appendChild(cellDiv);
  });
}

function cellClick(e) {
  const idx = e.target.dataset.index;
  if (!isGameActive || board[idx] !== "") return;

  board[idx] = currentPlayer;
  renderBoard();
  if (checkWinner()) {
    gameInfo.innerText = `Player ${currentPlayer} wins!`;
    isGameActive = false;
  } else if (board.every(cell => cell !== "")) {
    gameInfo.innerText = "It's a Draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.innerText = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winPatterns.some(pattern => 
    pattern.every(idx => board[idx] === currentPlayer)
  );
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  renderBoard();
  gameInfo.innerText = "Player X's turn";
}

// Initial load
renderBoard();
gameInfo.innerText = "Player X's turn";