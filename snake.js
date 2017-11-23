//Global vars

var canvasHandler = document.getElementById("canvas");
var ccontext = canvasHandler.getContext('2d');
var score = 0;
var snake;
var size = 10;
var height = 300;
var width = 300;
var dir = 'down';
var foodArr;
var gameloop;


var drawModule = (function() {

    var snakeBody = function (x, y) {
        ccontext.fillStyle = 'green';
        ccontext.fillRect(x * size, y * size, size, size);
        ccontext.strokeStyle = 'darkgreen';
        ccontext.strokeRect(x * size, y * size, size, size)
    };

    var drawFood = function(x, y) {
        ccontext.fillStyle = 'red';
        ccontext.fillRect(x * size, y * size, size, size);
        ccontext.strokeStyle = 'darkred';
        ccontext.strokeRect(x * size, y * size, size, size);
    };

    var scoreText = function() {
        var score_txt = "Score: " + score;
        ccontext.fillStyle = 'blue';
        ccontext.fillText(score_txt, 45, height-5)

    };

    var food = function() {
        var posX = Math.floor((Math.random() * 29) + 1);
        var posY = Math.floor((Math.random() * 29) + 1);
        foodArr = {x:posX, y:posY};
        drawFood(foodArr.x, foodArr.y);
    };

    var drawSnake = function() {
        var length = 4;
        snake = [];

        for(var i = 0 ; i < length ; ++i) {
            snake.push({x:i, y:0})
        }
    };

    var checkCollision = function(x, y, array) {
        for(var i = 0 ; i < array.length ; ++i) {
            if(x === array[i].x && y === array[i].y)
                return true;
        }
        return false;
    };

    var refresh = function() {
        ccontext.fillStyle = 'lightgrey';
        ccontext.fillRect(0, 0 , width, height);

        btn.setAttribute('disabled', true);

        var posX = snake[0].x;
        var posY = snake[0].y;

        switch(dir) {
            case 'up': posY--;
                break;
            case 'down': posY++;
                break;
            case 'left': posX--;
                break;
            case 'right': posX++;
                break;
        }

        if ( posX === -1 || posX > width/size -1 || posY === -1 || posY > height/size -1 || checkCollision(posX, posY, snake)) {
            btn.removeAttribute('disabled', true);

            dir = 'down';
            ccontext.clearRect(0, 0, width, height);
            gameloop = clearInterval(gameloop);
        }

        if(posX === foodArr.x && posY === foodArr.y) {
            var tail = {x: posX, y: posY};
            ++score;
            console.log("Score updated");
            food();

        } else {
            var tail = snake.pop();
            tail.x = posX;
            tail.y = posY;
        }
        snake.unshift(tail);

        for(var i = 0 ; i < snake.length ; ++i) {
            snakeBody(snake[i].x, snake[i].y)
        }


        drawFood(foodArr.x, foodArr.y);
        scoreText()
    };

    var init = function() {
        drawSnake();
        food();
        score = 0;
        gameloop = setInterval(refresh, 80)
    };

    return {
        init : init
    }


}());

(function (window, document, drawModule, undefined) {

    var btn = document.getElementById('btn');
    btn.addEventListener("click", function(){drawModule.init()});

    document.onkeydown = function (event) {
        var keyCode = event.keyCode;

        switch(keyCode) {
            case 37:
                if(dir !== 'right') {
                    dir = 'left'
                }
                break;
            case 38:
                if(dir !== 'down') {
                    dir = 'up'
                }
                break;
            case 39:
                if(dir !== 'left') {
                    dir = 'right'
                }
                break;
            case 40:
                if(dir !== 'up') {
                    dir = 'down'
                }
                break;
        }

    }
})(window, document, drawModule);