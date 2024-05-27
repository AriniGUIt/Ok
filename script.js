document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const paddle = document.getElementById('paddle');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    let blockSpeed = 3;
    let touchX = null;

    // Paddle Movement for touch devices
    gameContainer.addEventListener('touchstart', (event) => {
        touchX = event.touches[0].clientX;
    });

    gameContainer.addEventListener('touchmove', (event) => {
        if (touchX !== null) {
            const newTouchX = event.touches[0].clientX;
            const deltaX = newTouchX - touchX;
            touchX = newTouchX;

            const paddleRect = paddle.getBoundingClientRect();
            const newPaddleLeft = paddleRect.left + deltaX;
            if (newPaddleLeft >= 0 && newPaddleLeft <= gameContainer.clientWidth - paddleRect.width) {
                paddle.style.left = `${newPaddleLeft}px`;
            }
        }
    });

    gameContainer.addEventListener('touchend', () => {
        touchX = null;
    });

    // Falling Blocks
    setInterval(() => {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = `${Math.random() * (gameContainer.clientWidth - 20)}px`;
        gameContainer.appendChild(block);

        let blockInterval = setInterval(() => {
            const blockRect = block.getBoundingClientRect();
            const paddleRect = paddle.getBoundingClientRect();

            if (blockRect.top + blockRect.height >= gameContainer.clientHeight) {
                gameContainer.removeChild(block);
                clearInterval(blockInterval);
            } else if (
                blockRect.bottom >= paddleRect.top &&
                blockRect.right >= paddleRect.left &&
                blockRect.left <= paddleRect.right
            ) {
                gameContainer.removeChild(block);
                clearInterval(blockInterval);
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            } else {
                block.style.top = `${blockRect.top + blockSpeed}px`;
            }
        }, 20);
    }, 1000);
});
