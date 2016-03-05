/*
	DISAPPEARING BALL: DELETE FROM ARRAY EXAMPLE

	A quick and dirty example of deleting things from arrays, all in a single file.

	A DisappearingBall has a function, isInMe(), that returns true if the p5.Vector object passed in is a position inside the ball.

	The goal of this little project is to make the ball disappear if the mouse is clicked inside the ball. The p5.js function mousePressed() is called when the mouse is pressed down. (As opposed to mouseClicked(), which is called when the mouse is released after being pressed.) So you'll need to test if the mouse location when mousePressed() is called is inside the DisappearingBall, and, if so, delete the ball from the array using Array.splice().

	Feel free to adapt this code for Not Pacman—that's the point, here.

	Be aware, this repository has three branches:
	* one without a solution—you may wish to try to solve the problem on your own (master)
	* one with the solution coded functionally (functional)
	* one with the solution coded using loops (loop)

	The comments will guide you.
*/

var DisappearingBall = function(startingX, startingY) {
	this.startingX = startingX;
	this.startingY = startingY;
}

DisappearingBall.prototype = {

	radius: 20,
	speed: 2,

	initialize: function () {
		this.position = new p5.Vector(this.startingX, this.startingY);
		// this next line of code strings function calls together
		// when a function has a return value, you can call a function on that return value
		// so p5.Vector.random2D() returns a p5.Vector object, which has a setMag() function
		this.direction = p5.Vector.random2D().setMag(this.speed);
	},

	update: function () {
		this.bounce();
		this.position.add(this.direction);
	},

	display: function () {
		noStroke();
		fill(130, 120, 60, 128);
		ellipseMode(RADIUS); // make our life just a little easier: no this.radius * 2 args
		ellipse(this.position.x, this.position.y, this.radius, this.radius);
	},

	// isInMe() is relatively similar to the detectCollision() function we wrote together in Not Pacman.
	// note that it takes a p5.Vector object as its argument; we will have to pass it one below
	isInMe: function(thePosition) {
		var distance = dist(this.position.x, this.position.y, thePosition.x, thePosition.y);
		return (distance <= this.radius);
	},

	// bounce and bounced abstract just a little bit from our previously slightly cumbersome way of bouncing
	// it DRYs out our code by creating bounced() as a function that accepts arguments
	bounce: function() {
		if (this.bounced(this.position.x, width, this.radius)) this.direction.x *= -1;
		if (this.bounced(this.position.y, height, this.radius)) this.direction.y *= -1;
	},

	bounced: function(position, limit, size) {
		return (position < size || position > limit - size);
	},

};

// give ourselves some variables and helper functions
var balls = [];

var startingBalls = 30;

var currentMousePosition; // current mouse position will be usefully stored outside any functions

// initializeBall() and updateAndDisplay() are familiar
// they are each passed to balls.forEach() as the function to call with every element of the array
// the element in question is passed as the argument
var initializeBall = function (ball) { // ball here the first argument forEach()
	ball.initialize();
};

var updateAndDisplay = function (ball) {
	ball.update();
	ball.display();
};

setup = function () {

	createCanvas(600, 600);

	while (balls.length < startingBalls) balls.push(new DisappearingBall(width/2, height/2));

	balls.forEach(initializeBall);

	currentMousePosition = new p5.Vector(mouseX, mouseY);

};

draw = function () {

	background(0);

	currentMousePosition.set(mouseX, mouseY); // update current mouse position

	balls.forEach(updateAndDisplay);

};

mousePressed = function () {

	// as with the looping method, in the functional method, the use of splice() can lead to skipped elements
	// this is a more robust functional method

	// in both cases, this means creating a new array without the elements we want, instead of deleting them in place

	// there are, of course, multiple *functional* ways of doing this.
	// I've written three below, in robustForEach(), inlineReduce(), and separateReduce()

	// uncomment whichever line you'd like to test
	//robustForEach();
	robustFilter();

};

//This is the most straightforward functional method of deleting balls, using only tools we already have
var robustForEach = function () {

	// give ourselves an empty array
	var newBalls = [];

	// because we have created our new array in mousePressed(), we need to define the function forEach() will call here as well (i.e. we can't define it elsewhere for useful encapsulation, because then it won't have access to our shiny new array)
	balls.forEach(function addUnclickedBalls(ball) { // for each ball...
		// ...if the mouse isn't in it, then add it to the new array
		if (!ball.isInMe(currentMousePosition)) newBalls.push(ball);
	});

	// and store our new, slightly lighter array
	balls = newBalls;

};

// Another possibility is to use a different helper function on array, filter()
// filter() returns a new array composed only of the elements of the array that pass a test
// The test is a function which returns either true (truthy) or false (falsy)
// In this branch, I have added a filter() function to SimpleArray.
)
var robustFilter = function () {

	// because filter returns an array (composed of only the balls we want), we assign the returned array to the output of filter
	balls = balls.filter(mouseIsNotInBall);

};

// mouseIsNotInBall() returns true if the mouse is NOT in the ball, and false if the mouse is in the ball
var mouseIsNotInBall = function (ball) { // accepts the current element as the argument

	// this is the opposite of isInMe(), so we have to negate it
	return (!ball.isInMe(currentMousePosition)); // return true or false

};
