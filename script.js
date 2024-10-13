let character = document.getElementById("character");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let score = 0;
let isJumping = false;

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }
});

// For mobile touch support
document.addEventListener('touchstart', function () {
    jump();
});

function jump() {
    if (!isJumping) {
        isJumping = true;
        character.classList.add("jump");

        setTimeout(function () {
            character.classList.remove("jump");
            isJumping = false;
        }, 500);
    }
}

// Game loop to check for collisions
let gameInterval = setInterval(function () {
    let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    // Collision detection
    if (obstacleLeft < 110 && obstacleLeft > 50 && characterBottom <= 70) {
        alert("Game Over! Score: " + score);
        score = 0;
        obstacle.style.animation = "none";
        obstacle.offsetHeight; // Force reflow (restarts animation)
        obstacle.style.animation = "move 3s infinite linear";
    } else if (obstacleLeft < 50) {
        score++;
        scoreDisplay.innerHTML = "Score: " + score;
    }
}, 10);

// Speed up obstacle as score increases
setInterval(function () {
    if (score > 0 && score % 5 === 0) {
        let currentSpeed = parseFloat(window.getComputedStyle(obstacle).getPropertyValue("animation-duration"));
        obstacle.style.animationDuration = (currentSpeed - 0.1) + 's';
    }
}, 1000);
