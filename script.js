var arrayGrid = [];
var t;
var test = 0;
var aux = 0;
var snake;
var candy;
var score = 0;
var record = 0;
var xPosSnake = 60;
var yPosSnake = 140;
var xPosCandy = 240;
var yPosCandy = 140;
var way = "";
var gameOver = 1;

// Creez tabela si pozitionez sarpele si mancarea
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
			arrayGrid[row][col] = 0;
		}
	}
	snake = document.getElementById("0");
	candy = document.getElementById("candy");

	candy.style.top = yPosCandy + 'px';
	candy.style.left = xPosCandy + 'px';

	snake.style.width = 20 + 'px';
	snake.style.height = 20 + 'px';
	snake.style.left = xPosSnake + 'px';
	snake.style.top = yPosSnake + 'px';
}
document.onkeydown = ways;

// Schimb directia sarpelui
// Verific daca si-a mancat coada
// Verific daca a mancat 
function moveSnake(e) {

	if (gameOver == 1) {
		t = setTimeout(function() {moveSnake(e)}, 100);
	}

	for (let i = score; i >= 1; --i) {
		document.getElementById(i).style.left = document.getElementById(i - 1).style.left;
		document.getElementById(i).style.top = document.getElementById(i - 1).style.top;
	}

	if (e.keyCode == 38) { // up 38
		yPosSnake -= 20;
	}

	if (e.keyCode == 40) { // down 40
		yPosSnake += 20;
	}

	if (e.keyCode == 39) { // right 39
		xPosSnake += 20;
	}

	if (e.keyCode == 37) { // left 37
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
		clearTimeout(t);
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
// document.onkeydown = ways;

function ways(e) {
	if ((e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) && gameOver == 1) {
		if (way != e.keyCode) {
			if (way == "") {
				moveSnake(e);
				way = e.keyCode;
			} else if ((way == 37 || way == 38) && (e.keyCode != way + 2)) {
				clearTimeout(t);
				moveSnake(e);
				way = e.keyCode;
			} else if ((way == 39 || way == 40) && (e.keyCode != way - 2)) {
				clearTimeout(t);
				moveSnake(e);
				way = e.keyCode;
			}
		}
	}
}

// Plasez mancarea pe tabela astfel incat ea sa nu se plaseze pe coada sarpelui
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

// Lungesc sarpele
function grow(x, y) {
	++aux;
	area = document.getElementById("snakeTail");
	area.innerHTML += '<div class="tail" id="'+ aux +'">';

	document.getElementById(aux).style.left = x +'px';
	document.getElementById(aux).style.top = y +'px';

	area.innerHTML += '</div>';
	
}

// Incep alt joc
function hideShow() {
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
	aux = 0;
	score = 0;

	snake.style.left = xPosSnake + 'px';
	snake.style.top = yPosSnake + 'px';

	candy.style.top = yPosCandy + 'px';
	candy.style.left = xPosCandy + 'px';
	clearTimeout(t);
	document.getElementById("btn").style.display = "none";
	document.getElementById("gameState").innerHTML = "";
	document.getElementById("score").innerHTML = "Score: " + score;
}

// sa fac scorul
// sa dau restart la joc cu ajutoul butonului
// sa ascund butonul cat timp jocul merge