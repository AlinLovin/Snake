var arrayGrid = [];
var timing, divTail, way, gameOver;
var snake, candy, score, record = 0;
var xPosSnake, yPosSnake, xPosCandy, yPosCandy;
document.onkeydown = ways;

// Create table.
window.onload = function() {
	var area = document.getElementById("table");
	var dash = "-";
	var color = 1;

	for (let i = 0; i < 15; ++i) {
		arrayGrid[i] = new Array(17);
	}

	for (let row = 0; row < 15; ++row) {
		for (let col = 0; col < 17; ++col) {
			area.innerHTML += '<div class="cell" id="' + row + dash + col + '">&nbsp</div>';
			if (color == 1) {
				document.getElementById('' + row + dash + col).style.backgroundColor = "#ccd9ff";
				color = 0;
			} else {
				document.getElementById('' + row + dash + col).style.backgroundColor = "#e6ecff";
				color = 1;
			}
		}
	}

	snake = document.getElementById("0");
	candy = document.getElementById("candy");
	play();
}

// I put the snake and the food on the table.
function play() {
	for (let i = 1; i <= score; ++i) {
		var removeTail = document.getElementById(i);
		removeTail.remove();
	}

	gameOver = 1;
	xPosSnake = 60;
	yPosSnake = 140;
	xPosCandy = 240;
	yPosCandy = 140;
	way = "";
	divTail = 0;
	score = 0;

	snake.style.left = xPosSnake + 'px';
	snake.style.top = yPosSnake + 'px';
	snake.style.width = 20 + 'px';
	snake.style.height = 20 + 'px';
	snake.style.position = "absolute";
	snake.style.backgroundColor = "red";

	candy.style.top = yPosCandy + 'px';
	candy.style.left = xPosCandy + 'px';

	clearTimeout(timing);
	document.getElementById("btn").style.display = "none";
	document.getElementById("gameState").innerHTML = "";
	document.getElementById("score").innerHTML = "Score: " + score;
}

// Directs the snake.
function ways(e) {
	if ((e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) && gameOver == 1) {
		if (way != e.keyCode) {
			if (way == "") {
				moveSnake(e);
				way = e.keyCode;
			} else if ((way == 37 || way == 38) && (e.keyCode != way + 2)) {
				clearTimeout(timing);
				moveSnake(e);
				way = e.keyCode;
			} else if ((way == 39 || way == 40) && (e.keyCode != way - 2)) {
				clearTimeout(timing);
				moveSnake(e);
				way = e.keyCode;
			}
		}
	}
}

// Change the direction of the snake.
// I'm checking to see if the snake ate its tail or its food.
function moveSnake(e) {
	if (gameOver == 1) {
		timing = setTimeout(function() {moveSnake(e)}, 100);
	}

	for (let i = score; i >= 1; --i) {
		document.getElementById(i).style.left = document.getElementById(i - 1).style.left;
		document.getElementById(i).style.top = document.getElementById(i - 1).style.top;
		if (i % 2 != 0) {
			document.getElementById(i).style.backgroundColor = "#ff8080";
		} else {
			document.getElementById(i).style.backgroundColor = "#ff6666";
		}
	}

	if (e.keyCode == 38) { // up
		yPosSnake -= 20;
	}

	if (e.keyCode == 40) { // down
		yPosSnake += 20;
	}

	if (e.keyCode == 39) { // right
		xPosSnake += 20;
	}

	if (e.keyCode == 37) { // left
		xPosSnake -= 20;
	}

	for (let j = 4; j <= score; ++j) {
		if (document.getElementById(0).style.left === document.getElementById(j).style.left) {
			if (document.getElementById(0).style.top === document.getElementById(j).style.top) {
				gameOver = 0;
				document.getElementById("gameState").innerHTML = "GAME OVER";
				document.getElementById("btn").style.display = "block";
			}
		}
	}

	if (xPosSnake < 0 || xPosSnake > 320 || yPosSnake < 0 || yPosSnake > 280) {
		clearTimeout(timing);
		gameOver = 0;
		document.getElementById("gameState").innerHTML = "GAME OVER";
		document.getElementById("btn").style.display = "block";
	} else if (gameOver == 1) {
		snake.style.left = xPosSnake + 'px';
		snake.style.top = yPosSnake + 'px';
	}

	if (xPosSnake == xPosCandy && yPosSnake == yPosCandy) {
		placeFood();
		grow(xPosSnake, yPosSnake);
	}
}

// Place the food on the table so that it does not fall on the snake's tail
function placeFood() {
	var place = 0;
	var x;
	var y;
	while (place == 0) {
		xPosCandy = Math.round((Math.random() * 160) / 10) * 20; 
		yPosCandy = Math.round((Math.random() * 140) / 10) * 20;

		for (let i = 0; i <= score; ++i) {
			x = document.getElementById(i).style.left;
			y = document.getElementById(i).style.top;
			place = 1;

			if (x == xPosCandy + "px" && y == yPosCandy + "px") {
				place = 0;
				break;
			}
		}
 	}

	candy.style.top = yPosCandy + 'px';
	candy.style.left = xPosCandy + 'px';
	++score;
	document.getElementById("score").innerHTML = "Score: " + score;

	if (score > record) {
		record = score;
		document.getElementById("record").innerHTML = "Record: " + record;
	}
}

// Increase the length of the snake
function grow(x, y) {
	++divTail;
	area = document.getElementById("snakeTail");
	area.innerHTML += '<div class="tail" id="'+ divTail +'">';

	document.getElementById(divTail).style.left = x +'px';
	document.getElementById(divTail).style.top = y +'px';
	area.innerHTML += '</div>';
}
