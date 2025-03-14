// 获取画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 游戏配置
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let speed = 10;

// 蛇的初始位置和速度
let snake = [
    { x: 10, y: 10 }
];
let dx = 0;
let dy = 0;

// 食物位置
let food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
};

// 游戏状态
let score = 0;
let gameOver = false;
let gameStarted = false;
let gameLoop = null;

// 获取DOM元素
const scoreElement = document.getElementById('score');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

// 事件监听器
document.addEventListener('keydown', changeDirection);
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

// 改变方向
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (!gameStarted) return;

    const keyPressed = event.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

// 开始游戏
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        gameLoop = setInterval(gameMain, 1000 / speed);
        startBtn.disabled = true;
    }
}

// 重启游戏
function restartGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    gameOver = false;
    gameStarted = false;
    clearInterval(gameLoop);
    startBtn.disabled = false;
    generateFood();
    drawGame();
}

// 生成食物
function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
    
    // 确保食物不会生成在蛇身上
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
        }
    }
}

// 游戏主循环
function gameMain() {
    if (gameOver) {
        clearInterval(gameLoop);
        return;
    }

    drawGame();
    moveSnake();
    checkCollision();
}

// 移动蛇
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        generateFood();
        // 每得50分增加速度
        if (score % 50 === 0) {
            speed++;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameMain, 1000 / speed);
        }
    } else {
        snake.pop();
    }
}

// 检查碰撞
function checkCollision() {
    const head = snake[0];

    // 检查墙壁碰撞
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver = true;
    }

    // 检查自身碰撞
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

// 绘制游戏
function drawGame() {
    // 清空画布
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    // 绘制蛇
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#2ecc71' : '#27ae60';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // 游戏结束显示
    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over!', canvas.width / 4, canvas.height / 2);
    }
}

// 初始绘制
drawGame(); 