document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const paddle = document.getElementById('paddle');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    let blockSpeed = 3;
    let isTouching = false;

    // Paddle Movement for touch devices
    gameContainer.addEventListener('touchstart', (event) => {
        isTouching = true;
        movePaddle(event.touches[0].clientX);
    });

    gameContainer.addEventListener('touchmove', (event) => {
        if (isTouching) {
            movePaddle(event.touches[0].clientX);
        }
    });

    gameContainer.addEventListener('touchend', () => {
        isTouching = false;
    });

    function movePaddle(touchX) {
        const paddleRect = paddle.getBoundingClientRect();
        const containerRect = gameContainer.getBoundingClientRect();
        const newLeft = touchX - containerRect.left - paddleRect.width / 2;

        if (newLeft >= 0 && newLeft <= gameContainer.clientWidth - paddleRect.width) {
            paddle.style.left = `${newLeft}px`;
        }
    }

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
