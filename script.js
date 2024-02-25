document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('snakeCanvas')
    const ctx = canvas.getContext('2d')

    const box = 25
    let snake = []
    let direction = ''
    let food = {}
    let power = {}
    let score = 0
    let level = 1
    let speed = 150
    let game
    
    document.getElementById('startButton').addEventListener('click', startGame)

    function startGame() {
        snake = []
        snake[0] = { x: 10 * box, y: 10 * box }
        direction = ''
        createFood()
        score = 0
        level = 1
        speed = 150
        clearInterval(game)
        game = setInterval(draw, speed)
        draw()
    }

    function createFood() {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        }
    }
    function createPower() {
        power = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    }
    //ADICIONAR ESSA FUNCIONALIDADE DEPOIS, ESTÁ CAUSANDO MUITOS BUGS
    /*
        function superPower() {
            createPower(); 
            ctx.fillStyle = 'yellow';
            ctx.fillRect(power.x, power.y, box, box);
            
            const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
            let rainbowIndex = 0;
            
            const rainbowEffect = setInterval(() => {
                ctx.strokeStyle = rainbowColors[rainbowIndex];
                ctx.strokeRect(0, 0, canvas.width, canvas.height);
                rainbowIndex = (rainbowIndex + 1) % rainbowColors.length;
            }, 100); 
            
    
            setTimeout(() => {
                clearInterval(rainbowEffect);
                ctx.clearRect(power.x, power.y, box, box); 
                power = {};
            }, 5000); 
        }
    */
    document.addEventListener('keydown', directionControl) //UTILIZAÇÃO DE VERIFICAÇÃO DE TECLAS PELO KEYCODE

    function directionControl(event) {
        //PARTE DAS SETINHAS
        if (event.keyCode == 37 && direction != 'right') direction = 'left'
        else if (event.keyCode == 38 && direction != 'down') direction = 'up'
        else if (event.keyCode == 39 && direction != 'left') direction = 'right'
        else if (event.keyCode == 40 && direction != 'up') direction = 'down'

        //PARTE DO WASD
        if (event.keyCode == 65 && direction != 'right') direction = 'left'
        else if (event.keyCode == 68 && direction != 'left') direction = 'right'
        else if (event.keyCode == 83 && direction != 'up') direction = 'down'
        else if (event.keyCode == 87 && direction != 'down') direction = 'up'
    }

    //CASO O USUÁRIO PREFEIR COMEÇAR NO ENTER O JOGO
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            startGame()
        }
    })

    function draw() {


        var imgGameOver = new Image()
        imgGameOver.src = 'img/gameoverREAL.JPG'
        imgGameOver.onload = function () {
        }
        const backgroundImage = new Image();
        backgroundImage.src = 'img/naosei.jpeg';
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 0.5
        ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height)
        ctx.globalAlpha = 1.0
        ctx.drawImage(imgGameOver, food.x, food.y, box, box)
        ctx.fillRect(imgGameOver, food.x, food.y, box, box)




        //FUNCAO PARA DESENHAR A COBRINHA
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i === 0) ? 'cyan' : 'white'
            ctx.fillRect(snake[i].x, snake[i].y, box, box)

            ctx.strokeStyle = 'black'
            ctx.strokeRect(snake[i].x, snake[i].y, box, box)
        }



        // SCORE DO JOGADOR
        ctx.fillStyle = 'black'
        ctx.font = '20px Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', 'Arial', 'sans-serif'
        ctx.fillText('SCORE: ' + score, box, box)

        // VELOCIDADE AUMENTANDO A CADA NÍVEL QUE SE PASSA
        if (score > 0 && score % 10 === 0) {
            level++
            speed += 10
        }

        // MOVIMENTAÇÃO
        let snakeX = snake[0].x
        let snakeY = snake[0].y

        if (direction === 'left') snakeX -= box
        if (direction === 'up') snakeY -= box
        if (direction === 'right') snakeX += box
        if (direction === 'down') snakeY += box

        if (direction === 'a') snakeX -= box
        if (direction === 'w') snakeY -= box
        if (direction === 'd') snakeX += box
        if (direction === 's') snakeY += box

        if (snakeX === food.x && snakeY === food.y) {
            score += 100
            createFood()
        } else {
            snake.pop()
        }
        //PARTES DO SUPERPOWER
        /*
        if (snakeX === power.x && snakeY === power.y) {
            score += 100
            superPower()
            power = {}
        }*/

        //NOVA PARTE DA COBRINHA
        let newHead = {
            x: snakeX,
            y: snakeY
        }

        // PARTE DO FIM
        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game)
            alert('PERDEU KKKKKKKKKKKKK, SUA PONTUAÇÃO: ' + score)
        } else {
            snake.unshift(newHead)
        }
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true
            }
        }
        return false
    }
})
