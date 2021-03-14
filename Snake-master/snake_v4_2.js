document.addEventListener("DOMContentLoaded", function(event){
//Loading this function when website is ready
// ####################### GAME FIELD ########################//
var field = document.getElementById('game_field');
var game = {
	// game is object representing the field where game happens
	height: 500,
	width: 500,
	color: '#98CA98',
	play: function(){
		//play function sets 'game field' div dimensions and colors
		field.style.height = this.height;
		field.style.width = this.width;
		field.style.background = this.color;
		field.style.position = 'relative';
		field.style.border = '.1px solid black';
	}
}

// ####################### GLOBAL VARIABLES ##################//
var head_positions = []; //collects snake head position
var apple_div = document.getElementById('apple'); //apple div 
var intervalFunctionRight; //ids of interval functions
var intervalFunctionLeft;
var intervalFunctionUp;
var intervalFunctionDown;
var snake_head = document.getElementById('snake_head'); //get snake head div
snake_head.style.top = '250px'; //initial position for snake head
snake_head.style.left = '250px';
var count_apples=1; // this number actually represents how many 'parts' of snake exist, initial have to be 1 
//because head of the snake exists from the beginning
var current_direction; // it stores current direction - where snake is moving - left,right,top,down
var scoreNumber = document.getElementById('score-num');

// ####################### OBJECT SNAKE #####################//
// ################### CONCERNS SNAKE HEAD ##################//
var snake = {
			snake_height: 10, //height of the block
			snake_width: 10, //width of the block
			snake_position_Y: 250, //initial position of snake head
			snake_position_X: 250,
			snake_step_X: 10, //width of the field
			snake_step_Y: 10, //height of the field
			snake_interval: 100, //time interval for moving 

			go: function(direction){
				//function go() is responsible for motor activity of snake-head
				var that = this;

				switch(direction) {
					case "right":
					stop_for_right();
					intervalFunctionRight = setInterval (function(){right()}, this.snake_interval);
					break;
					case "left":
					stop_for_left();
					intervalFunctionLeft = setInterval (function(){left()}, this.snake_interval);
					break;
					case "up":
					stop_for_up();
					intervalFunctionUp = setInterval (function(){up()}, this.snake_interval);
					break;
					case "down":
					stop_for_down();
					intervalFunctionDown = setInterval (function(){down()}, this.snake_interval);
					break;
				}

				function right(){
					//When 'right' is selected by action listener
					that.snake_position_X = that.snake_position_X + that.snake_step_X; //move coordinates by one field
					snake_head.style.top=that.snake_position_Y + "px"; //change div position
					snake_head.style.left=that.snake_position_X + "px"; 
					check_borders_X(that.snake_position_X); //check if snake didn't exit the game field
					check_apple(that.snake_position_X, that.snake_position_Y, apple.Apple_X, apple.Apple_Y); //check if snake head position equals apple position
					get_position_2_array(that.snake_position_X, that.snake_position_Y); //store snake head position in array in order to make its tail following function
					if (count_apples > 2) {
						//check whether snake head doesn't cross tail of the snake for all tail elements
						for (var i=2 ; i <= count_apples; i++) {
							var pos=[];
							pos[i] = head_positions[head_positions.length-i];
							var tail_X = pos[i][0];
							var tail_Y = pos[i][1];
							check_tail_position(that.snake_position_X, that.snake_position_Y, tail_X, tail_Y); //check the head vs tail position for 1 div
						}
					}
				}

				function left(){
					//When 'left' is selected - all sub functions adequate as in 'right' function -> see their description there
					that.snake_position_X = that.snake_position_X - that.snake_step_X;
					snake_head.style.top=that.snake_position_Y + "px";
					snake_head.style.left=that.snake_position_X + "px";
					check_borders_X(that.snake_position_X);
					check_apple(that.snake_position_X, that.snake_position_Y, apple.Apple_X, apple.Apple_Y);
					get_position_2_array(that.snake_position_X, that.snake_position_Y);
					if (count_apples > 2) {
						for (var i=2 ; i <= count_apples; i++) {
							var pos=[];
							pos[i] = head_positions[head_positions.length-i];
							var tail_X = pos[i][0];
							var tail_Y = pos[i][1];
							check_tail_position(that.snake_position_X, that.snake_position_Y, tail_X, tail_Y);
						}
					}
				}

				function up(){
					//When 'up' is selected - all sub functions adequate as in 'right' function -> see their description there
					that.snake_position_Y = that.snake_position_Y + that.snake_step_Y;
					snake_head.style.top=that.snake_position_Y + "px";
					snake_head.style.left=that.snake_position_X + "px";
					check_borders_Y(that.snake_position_Y);
					check_apple(that.snake_position_X, that.snake_position_Y, apple.Apple_X, apple.Apple_Y);
					get_position_2_array(that.snake_position_X, that.snake_position_Y);
					if (count_apples > 2) {
						for (var i=2 ; i <= count_apples; i++) {
							var pos=[];
							pos[i] = head_positions[head_positions.length-i];
							var tail_X = pos[i][0];
							var tail_Y = pos[i][1];
							check_tail_position(that.snake_position_X, that.snake_position_Y, tail_X, tail_Y);
						}
					}
				}

				function down(){
					//When 'down' is selected - all sub functions adequate as in 'right' function -> see their description there
					that.snake_position_Y = that.snake_position_Y - that.snake_step_Y;
					snake_head.style.top=that.snake_position_Y + "px";
					snake_head.style.left=that.snake_position_X + "px";
					check_borders_Y(that.snake_position_Y);
					check_apple(that.snake_position_X, that.snake_position_Y, apple.Apple_X, apple.Apple_Y);
					get_position_2_array(that.snake_position_X, that.snake_position_Y);
					if (count_apples > 2) {
						for (var i=2 ; i <= count_apples; i++) {
							var pos=[];
							pos[i] = head_positions[head_positions.length-i];
							var tail_X = pos[i][0];
							var tail_Y = pos[i][1];
							check_tail_position(that.snake_position_X, that.snake_position_Y, tail_X, tail_Y);
						}
					}
				}

				function stop_for_right(){
					//stops moving snake-head in different directions than direction selected by user
					clearInterval(intervalFunctionLeft);
					clearInterval(intervalFunctionUp);
					clearInterval(intervalFunctionDown);
				}

				function stop_for_left(){
					clearInterval(intervalFunctionRight);
					clearInterval(intervalFunctionUp);
					clearInterval(intervalFunctionDown);
				}

				function stop_for_up(){
					clearInterval(intervalFunctionRight);
					clearInterval(intervalFunctionLeft);
					clearInterval(intervalFunctionDown);
				}

				function stop_for_down(){
					clearInterval(intervalFunctionRight);
					clearInterval(intervalFunctionLeft);
					clearInterval(intervalFunctionUp);
				}		

				function check_borders_X(position_X){
					// checking if snake crosses border of the 'game field'
					var position_X;

					if (position_X >= game.width || position_X < 0) {
						clearInterval(intervalFunctionRight);
						clearInterval(intervalFunctionLeft);
						clearInterval(intervalFunctionUp);
						clearInterval(intervalFunctionDown);
						alert("You lost! Click ok to play again.");
						location.reload();
					}
				}	

				function check_borders_Y(position_Y){
					var position_Y;

					if (position_Y >= game.height || position_Y < 0) {
						clearInterval(intervalFunctionRight);
						clearInterval(intervalFunctionLeft);
						clearInterval(intervalFunctionUp);
						clearInterval(intervalFunctionDown);
						alert("You lost! Click ok to play again.");
						location.reload();
					}
				}

				function check_apple(position_X, position_Y, apple_X, apple_Y) {
					//checking snake-head position and apple position
					var position_X;
					var position_Y;
					var apple_X;
					var apple_Y;
					if (position_X === apple_X && position_Y === apple_Y) {
						apple.position_apple();
						count_apples=count_apples+1;
						tail.append_tail(count_apples);
						scoreNumber.innerHTML = count_apples -1;
					}
				}

				function get_position_2_array(position_X, position_Y) {
					//storing head position in array in order to provide it to the tail
					var position_X;
					var position_Y;
					var pair=[position_X, position_Y];
					head_positions.push(pair);
					//if (head_positions.length > 100) {
						//head_positions=head_positions.splice(1,50);
					//}
					//console.log('Length' + head_positions.length);
				}

				function check_tail_position(position_X, position_Y, tail_X, tail_Y) {
					//checking if head position is not the same as tail position
					var position_X;
					var position_Y;
					var tail_X;
					var tail_Y;
					if (position_X === tail_X && position_Y === tail_Y) {
						alert('You lost! Click ok to play again.')
						location.reload();
					}


				}
			}

		}
// ####################### OBJECT APPLE #####################//
var apple = {
		Apple_X:250,
		Apple_Y:250,
		position_apple: function(){
			//function position_apple generates random coordinates for an apple within game field
			this.Apple_Y = (Math.floor(Math.random() * (game.height/snake.snake_height)))*snake.snake_height;
			this.Apple_X = (Math.floor(Math.random() * (game.width/snake.snake_width)))*snake.snake_width;
			apple_div.style.top=this.Apple_Y;
			apple_div.style.left=this.Apple_X;
			var Apple_X = this.Apple_X;
			var Apple_Y = this.Apple_Y;
			return Apple_X;
			return Apple_Y;
		}
}
// ##################### OBJECT SNAKE TAIL ###################//
var tail = {
	append_tail: function(i) {
		//append tail create additional div with its unique id number, this div will become snake tail
		var i;
		var tail = document.createElement("div");
		tail.id = 'tail_' + i;
		tail.class = 'tail';
		var div_tail = [];
		var pos= [];
		var update_tail_id= [];
		document.getElementById('game_field').appendChild(tail);
		div_tail[i] = document.getElementById('tail_'+ i);
		div_tail[i].style.background='black';
		div_tail[i].style.width=snake.snake_width;
		div_tail[i].style.height=snake.snake_height;
		div_tail[i].style.position='absolute';
		update_tail_id[i] = setInterval(function update_tail(){
			pos[i] = head_positions[head_positions.length-i];
			div_tail[i].style.left = pos[i][0] + 'px';
			div_tail[i].style.top = pos[i][1] + 'px';
		}, snake.snake_interval/100)

		}

}
//Initializng snake-head dimensions and apple position in html file
game.play()
snake_head.style.height=snake.snake_height + 'px';
snake_head.style.width=snake.snake_width + 'px';
snake_head.style.background= 'black';
apple.position_apple();



// ####################### CONTROL PANEL #####################//
document.addEventListener("keydown", function(event){
	switch (event.which) {
		case 37:
		if (current_direction !== 'left' && current_direction !== 'right') {
			snake.go('left');
			current_direction='left';
		}
		break;
		case 40:
		if (current_direction !== 'up' && current_direction !== 'down') {		
			snake.go('up');
			current_direction='up';
		}
		break;
		case 39:
		if (current_direction !== 'right' && current_direction !== 'left') {
			snake.go('right');
			current_direction='right';
		}
		break;
		case 38:
		if (current_direction !== 'down' && current_direction !== 'up') {		
			snake.go('down');
			current_direction='down';
		}
		break;
	}
});
	
});
