const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const roketImage = new Image();
roketImage.src = 'img/roket.png'; 
const ufoImage = new Image();
ufoImage.src = 'img/ufo.png';

let scoreGap = 0;
let score = 0;

const roket = {
    x: 50,
    y: canvas.height - 100,
    width: 135,
    height: 50,
    speed: 5,
    jumping: false,
};

const obstacles = [];

function drawroket() {
    //ctx.fillStyle = "#f7f7f7";
    //ctx.fillRect(roket.x, roket.y, roket.width, roket.height);
    ctx.drawImage(roketImage, roket.x, roket.y, roket.width, roket.height);
}

function drawObstacles() {
    for (let obstacle of obstacles) {
        if (obstacle.y > canvas.height) {
            obstacle.y = canvas.height - obstacle.height;
        }
        ctx.drawImage(ufoImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

let jumpCount = 0;
const jumpDuration = 15; 

function updateGameArea() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (roket.jumping) {
        if (jumpCount <= jumpDuration) {
            roket.y -= roket.speed;
            jumpCount++ ;
        } else {
            roket.jumping = false;
            jumpCount = 0;
        }
        
    } else {
        roket.y += roket.speed;
    }

    if (roket.y >= canvas.height - roket.height) {
        roket.y = canvas.height - roket.height;
        roket.jumping = false;
    }

    if (roket.y < 0) {
        roket.y = 0;
    }

    drawroket();

    for (let obstacle of obstacles) {
        obstacle.x -= roket.speed;
    }

    // let step_count = 0;
    // if (step_count % 10 == 0){
        
    // }
    drawObstacles();

    checkCollision();

    scoreGap++ ;

    score = Math.round(scoreGap / 50);

    const scoreLabel = document.querySelector(".score-label");
    scoreLabel.innerHTML = `
    Score : ${score}
    `;

    if (Math.random() < 0.01) {
        const obstacle = {
            x: canvas.width,
            y: Math.random() * canvas.height,
            width: 120,
            height: 80,
        };
        obstacles.push(obstacle);
    }
    
    requestAnimationFrame(updateGameArea);
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 32 && !roket.jumping) {
        roket.jumping = true;
    }
});

updateGameArea();

function checkCollision() {
    for (let obstacle of obstacles) {
        const centerXRocket = roket.x + roket.width / 2;
        const centerYRocket = roket.y + roket.height / 2;
        const centerXUFO = obstacle.x + obstacle.width / 2;
        const centerYUFO = obstacle.y + obstacle.height / 2;

        const deltaX = Math.abs(centerXRocket - centerXUFO);
        const deltaY = Math.abs(centerYRocket - centerYUFO);

        if (deltaX < (roket.width + obstacle.width) / 2 && deltaY < (roket.height + obstacle.height) / 2) {
            // Terjadi tabrakan antara roket dan obstacle UFO
            gameOver();
        }
    }
}

function gameOver() {
    alert("Game Over! Score : " + score + "\n\nKlik restart/f5 lalu enter untuk mengulang");
}
