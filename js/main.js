const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "lightblue";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";

const unitSize = 25;

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;

let foodX;
let foodY;
let score = 0;

let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  nextTick();
}

function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  } else {
    displayGameOver();
  }
}

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
  const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

  foodX = rand(0, gameWidth / unitSize) * unitSize;
  foodY = rand(0, gameHeight / unitSize) * unitSize;
}

function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
  const head = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity,
  };

  snake.unshift(head);

  if (head.x === foodX && head.y === foodY) {
    score++;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}


const cj = document.getElementById('cj');
function drawSnake() {
  ctx.createPattern(cj, "repeat");
  ctx.strokeStyle = snakeBorder;

  snake.forEach((part) => {
    ctx.fillRect(part.x, part.y, unitSize, unitSize);
    ctx.strokeRect(part.x, part.y, unitSize, unitSize);
  });
}

function changeDirection(e) {
  const key = e.keyCode;

  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  if (key === LEFT && xVelocity !== unitSize) {
    xVelocity = -unitSize;
    yVelocity = 0;
  }
  if (key === RIGHT && xVelocity !== -unitSize) {
    xVelocity = unitSize;
    yVelocity = 0;
  }
  if (key === UP && yVelocity !== unitSize) {
    xVelocity = 0;
    yVelocity = -unitSize;
  }
  if (key === DOWN && yVelocity !== -unitSize) {
    xVelocity = 0;
    yVelocity = unitSize;
  }
}

function checkGameOver() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= gameWidth ||
    snake[0].y < 0 ||
    snake[0].y >= gameHeight
  ) {
    running = false;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      running = false;
    }
  }
}


const cjAudio = new Audio("./audio/ah-shit-here-we-go-again_jyHLMOg.mp3")
function displayGameOver() {
  ctx.textAlign = "center";
  ctx.font = "50px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
  cjAudio.play();
}

function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;

  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];

  gameStart();
}
