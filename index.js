// Get the canvas element
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Ball properties
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 10;

// Paddle properties
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

// Brick properties
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Draw the ball on the canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Draw the paddle on the canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Draw the bricks on the canvas
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx
        .closePath();
    }
    }
    }
    }
    
    // Handle collision detection
    function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
    let b = bricks[c][r];
    if (b.status === 1) {
    if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
    dy = -dy;
    b.status = 0;
    }
    }
    }
    }
    }
    
    // Handle paddle movement
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
    }
    }
    
    function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
    }
    }
    
    function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    
    // Move the ball
    x += dx;
    y += dy;
    
    // Bounce the ball off the walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    }
    if (y + dy < ballRadius) {
    dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
    dy = -dy;
    } else {
        reload();
    }
    }
    
    // Move the paddle
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
    }
    
    requestAnimationFrame(draw);
    }
    
    draw();