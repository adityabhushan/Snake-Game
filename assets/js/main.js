const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let primary = '#AF1E2D';
let secondary = '#FFCE00';

const grid = 32;
let count = 0;
let score = 0;

let snake = {
	x: grid * 5,
	y: grid *5,

	vx: grid,
	vy:0,

	cells: [],

	maxCells: 4
};

let apple = {
	x: grid * 10,
	y: grid * 10
}

function update() {
	requestAnimationFrame(update);

	if(++count < 4) {
		return;
	}
	count = 0;
  //Score Painting
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.font = '42px Helvetica';
	ctx.fillStyle = 'rgba(255,255,255,0.25)';
	ctx.fillText(score, canvas.width /2, canvas.height /2);

	snake.x += snake.vx;
	snake.y += snake.vy;

	if (snake.x < 0){
		snake.x = canvas.width - grid;
	} else if (snake.x >= canvas.width){
		snake.x = 0;
	}
	
	if (snake.y < 0){
		snake.y = canvas.height - grid;
	} else if (snake.y >= canvas.height){
		snake.y = 0;
	}
	
	/* Modular arithmatic for above code
	snake.x = (snake.x + snake.vx + canvas.width) % canvas.width;
	snake.y = (snake.y + snake.vy + canvas.height) % canvas.height;  */

	snake.cells.unshift({x: snake.x, y: snake.y})

	if (snake.cells.length > snake.maxCells) {
		snake.cells.pop();
	}

	//Draw Apple
	ctx.fillStyle = secondary;
	ctx.fillRect(apple.x, apple.y, grid-1, grid-1);

	//Draw Snake
	ctx.fillStyle = primary;
	snake.cells.forEach(function(cell, index){
		ctx.fillRect(cell.x, cell.y, grid-1, grid-1);

		if(cell.x === apple.x && cell.y === apple.y){
			snake.maxCells++;
			score++;

			apple.x = getRandomInt(0,24) * grid;
			apple.y = getRandomInt(0,14) * grid;
		}

		for(let i = index + 1; i < snake.cells.length; i++){
			if(cell.x === snake.cells[i].x && cell.y === snake.cells[i].y ){
				window.location.reload();
			}
		}
	})
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('keydown', function(evt){
	if(evt.which === 37 && snake.vx === 0) {
		snake.vx = -grid;
		snake.vy = 0;
	} else if (evt.which === 38 && snake.vy === 0) {
		snake.vy = -grid;
		snake.vx = 0;
	} else if (evt.which === 39 && snake.vx === 0) {
		snake.vx = grid;
		snake.vy = 0;
		console.log(snake.vx)
		console.log(snake.vy)
	}  else if (evt.which === 40 && snake.vy === 0) {
		snake.vy = grid;
		snake.vx = 0;
	}
})

//Start the game
requestAnimationFrame(update);
