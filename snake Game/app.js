const partyTable = document.querySelector('.party-table')
let foodY,foodX;
let snakeY = 15, snakeX = 20;
let velocityX = 0, velocityY = 0;
let score = 0;
let hightScore = 0;
let snakeBody = [];
let speedGame = 125;
let gameOver = false


function getFoodRandomPosition(){
    foodY= Math.floor(Math.random() * 30) + 1;
    foodX = Math.floor(Math.random() * 30) + 1;

}

function changeDirection(e){
    if(e.key === 'ArrowDown'){
        velocityY = 1;
        velocityX = 0;
    }else if(e.key === 'ArrowLeft'){
        velocityX = -1
        velocityY = 0
    }else if(e.key === 'ArrowUp'){
        velocityY = -1;
        velocityX = 0
    }else if(e.key === 'ArrowRight'){
        velocityX = 1
        velocityY = 0
    }

}
let i = 0;
function initGame(){
    let htmlMarker = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;
    if(snakeX === foodX && snakeY === foodY){
        getFoodRandomPosition();
        score++;
        updateScore(score);
        snakeBody.push([foodX,foodY]);
        
    }

    
    for(let i = snakeBody.length -1 ; i>0;i--){
        snakeBody[i] = snakeBody[i-1]
        
    }

    snakeBody[0] = [snakeX,snakeY];
    snakeX += velocityX;
    snakeY += velocityY;

    for(let i = 0; i < snakeBody.length;i++){
        htmlMarker += `<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`
        if(i != 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]){
           gameOver = true
           console.log('game')
        }
    }
    partyTable.innerHTML = htmlMarker;

    if(snakeBody.includes([snakeX,snakeY])){
        console.log("include")
    }

    if(snakeX > 31 || snakeX <0 || snakeY >31 || snakeY< 0 || gameOver === true ){
        alert('game over');
        snakeY = 15, snakeX = 20;
        getFoodRandomPosition();
        snakeBody = [];
        snakeBody[0] = [snakeX,snakeY];
        if(hightScore < score){
            hightScore = score;
            updateHightScore(hightScore)
        }
        score = 0;
        updateScore(score);
        gameOver = false
        
    }
}

function updateScore(x){
    const score = document.getElementById('score');
    score.textContent = x;
    if(score>=5 && score< 10){
        speedGame = 100;
    }else if(score>=10 && score < 20){
        speedGame = 75;
    }else if(score>=20 && score < 30){
        speedGame = 50
    }
    else if(score >= 30){
        speedGame = 20;
    }
}

function updateHightScore(x){
    const hightScore = document.getElementById('hight-score');
    hightScore.textContent = x;
}

updateHightScore(hightScore)
updateScore(score);
getFoodRandomPosition();
setInterval(initGame, speedGame)
document.addEventListener('keydown', changeDirection);
