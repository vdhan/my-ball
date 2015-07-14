var _canvas;
var _context;
var time = 20;

var _ball;
var _balls;
var _count = 0;

function Ball()
{
	this.radius = 20;
	this.speedX = 2;
	this.speedY = 2;
	this.begin = 0;
	this.end = Math.PI * 2;
}

Ball.prototype.move = function()
{
	this.cx += this.speedX;
	this.cy += this.speedY;
	
	this.left = this.cx - this.radius;
	this.right = this.cx + this.radius;
	this.top = this.cy - this.radius;
	this.bottom = this.cy + this.radius;
}

Ball.prototype.checkCollision = function()
{
	if(this.left <= 0 || this.right >= _canvas.width)
		this.speedX = -this.speedX;
	if(this.top <= 0 || this.bottom >= _canvas.height)
		this.speedY = -this.speedY;
}

Ball.prototype.draw = function(alpha)
{
	_context.fillStyle = "rgba(255, 0, 0, " + alpha + ")";	
	_context.beginPath();
	_context.arc(this.cx, this.cy, this.radius, this.begin, this.end, true);
	_context.closePath();
	_context.fill();
}

function traceBall(ball)
{
	var b = new Ball();
	b.cx = ball.cx;
	b.cy = ball.cy;
	
	_balls.push(b);
	if(_balls.length > 10)
	{
		_balls.splice(0,1);
	}
}

function draw()
{
	_context.clearRect(0, 0, _canvas.width, _canvas.height);
	
	for(i = 0; i < _balls.length; ++i)
	{
		_balls[i].draw(i / 20);
	}
	
	_ball.draw(1);
}

function update()
{
	_count += 1;
	if(_count == 5)
	{
		_count = 0;
		traceBall(_ball);
	}
	
	_ball.move();
	_ball.checkCollision();
}

window.onload = function()
{
	_canvas = document.getElementById("canvas");
	_context = _canvas.getContext("2d");
	
	_ball = new Ball();
	_ball.cx = _canvas.width/2;
	_ball.cy = _canvas.height/2;
	
	_balls = new Array();
	
	setInterval("update()",time);
	setInterval("draw()",time);
};