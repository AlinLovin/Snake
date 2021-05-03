arrayGrid = [];

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
	console.log(arrayGrid);
}


var snake = document.getElementById('snake');
var leftMove = 0;
var bottom = 280;

function moveSnake(e) {
	//alert(e.keyCode);

	if (e.keyCode == 38 && bottom < 280) { // up
		bottom += 20;
		document.getElementById('snake').style.bottom = bottom + 'px';
		//bottom += 20;
	}

	if (e.keyCode == 40 && bottom > 0) { // down
		bottom -= 20;
		document.getElementById('snake').style.bottom = bottom + 'px';
		//bottom -= 20;
	}

	if (e.keyCode == 39 && leftMove < 320) { // right
		leftMove += 20;
		document.getElementById('snake').style.left = leftMove + 'px';
	}

	if (e.keyCode == 37 && leftMove > 0) { // left
		leftMove -= 20;
		document.getElementById('snake').style.left = leftMove + 'px';
	}
}

document.onkeydown = moveSnake;