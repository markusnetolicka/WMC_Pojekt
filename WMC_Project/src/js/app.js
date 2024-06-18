const block = document.getElementById("block");
const hole = document.getElementById("hole");
const character = document.getElementById("character");
const scoreDisplay = document.getElementById("score");
let jumping = 0;
let score = 0;

hole.addEventListener('animationiteration', () => {
  let random = -((Math.random()*300)+150);
  hole.style.top = random + "px";
  score++;
  scoreDisplay.innerHTML = "Score: " + score;
});
setInterval(function (){
  let characterTop = parseInt( window.getComputedStyle(character).getPropertyValue("top"));
  if (jumping === 0) {
    character.style.top = (characterTop + 3) + "px";
  }
  let blockLeft =  parseInt( window.getComputedStyle(block).getPropertyValue("left"));
  let holeTop = parseInt( window.getComputedStyle(hole).getPropertyValue("top"));
  let charTop = -(500-characterTop);
  if ((characterTop > 500)||((blockLeft < 15 )&& (blockLeft > -50)&&((charTop<holeTop)||(charTop>holeTop+180)))){
    alert("Game Over! Score: " + score);
    character.style.top = 100 + "px";
    score = 0;
    scoreDisplay.innerHTML = "Score: " + score;
  }
},10);
function jump(){
jumping = 1;
let jumpCount = 0;
let jumpinterval = setInterval(function (){
  let characterTop = parseInt( window.getComputedStyle(character).getPropertyValue("top"));
  if (characterTop > 6) {
    character.style.top = (characterTop - 5) + "px";
  }
  if (jumpCount > 20){
    clearInterval(jumpinterval);
    jumping = 0;
    jumpCount = 0;
  }
  jumpCount++;
})
}
