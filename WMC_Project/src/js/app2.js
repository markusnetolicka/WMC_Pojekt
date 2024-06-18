const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");
const scoreDisplay = document.getElementById("score");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
let jumping = 0;
let score = 0;
let gameInterval;
let gameRunning = false;

hole.addEventListener('animationiteration', () => {
  let random = -((Math.random() * 300) + 150);
  hole.style.top = random + "px";
  score++;
  scoreDisplay.innerHTML = "Score: " + score;
});

function startGame() {
  startScreen.style.display = 'none';
  gameOverScreen.style.display = 'none';
  gameRunning = true;
  character.style.top = "100px";
  score = 0;
  scoreDisplay.innerHTML = "Score: " + score;
 scoreDisplay.classList.add("score");
  block.style.animation = 'block 2s infinite linear';
  hole.style.animation = 'block 2s infinite linear';

  gameInterval = setInterval(gameLoop, 10);
}

function restartGame() {
  gameOverScreen.style.display = 'none';
  startScreen.style.display = 'flex';
  clearInterval(gameInterval);
  gameRunning = false;
  block.style.animation = 'none';
  hole.style.animation = 'none';
}

function gameLoop() {
  let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  if (jumping === 0) {
    character.style.top = (characterTop + 3) + "px";
  }
  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  let charTop = -(500 - characterTop);
  if ((characterTop > 500) || ((blockLeft < 15) && (blockLeft > -50) && ((charTop < holeTop) || (charTop > holeTop + 180)))) {
    gameOver();
  }
}

function gameOver() {
  clearInterval(gameInterval);
  gameRunning = false;
  finalScore.innerHTML = "Score: " + score;
  gameOverScreen.style.display = 'flex';
  scoreDisplay.innerHTML = "";
  block.style.animation="none";
  hole.style.animation="none";
}

function jump() {
  if (!gameRunning) return;
  jumping = 1;
  let jumpCount = 0;
  let jumpInterval = setInterval(function () {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if (characterTop > 6) {
      character.style.top = (characterTop - 5) + "px";
    }
    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10);
}

// Event listener for the jump function (you may need to adjust this based on your controls)
document.body.onkeydown = function (e) {
  if (e.keyCode == 32) { // Space key
    jump();
  }
};

// Show the start screen initially
startScreen.style.display = 'flex';
