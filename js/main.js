'use strict';
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

function BouncingBall(x, y, radius, color) {
  this.context = context;
  this.dx = x;
  this.dy = y;
  this.radius = radius;
  this.color = color;
  this.velocity = 0;
  this.gravity = 1;
  this.bounce = .8;
  this.rockBottom = canvas.height - this.radius;
  this.draw = function() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(this.dx, this.dy, this.radius, 0, Math.PI * 2);
	this.context.closePath();
    this.context.fill();
    // draw white dot
    this.context.beginPath();
    this.context.fillStyle = 'white';
    this.context.arc(this.dx + 10, this.dy - 15, this.radius - 25, 0, Math.PI *
      2);
	this.context.closePath();
    this.context.fill();
  };
  this.update = function() {
    this.velocity += this.gravity;
    this.dy += this.velocity;
    if (this.dy > this.rockBottom) {
      this.dy = this.rockBottom;
      this.velocity = -(this.velocity * this.bounce);
    }
  };
}

var myBall = new BouncingBall(canvas.width / 2, 0, 30, 'lightblue');

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  myBall.draw();
  myBall.update();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

canvas.addEventListener('mousedown', function() {
  myBall.velocity += -34;
});
