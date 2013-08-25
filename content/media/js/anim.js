var canvas  = document.getElementById("myCanvas");
var i = 0;
var phi = 0.0;
var sin1 = new Array(1024); //precompute buffer
for (i = 0; i < 1024; i++)
	sin1[i] = Math.sin(2 * Math.PI *  i / canvas.width);

function animate() {
	reqAnimFrame = window.mozRequestAnimationFrame    ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame     ||
		window.oRequestAnimationFrame
		;
	reqAnimFrame(animate);
	draw();
}

function draw() {
	canvas.height = window.innerHeight;
	canvas.width= window.innerWidth;
    var canvasHeight = window.innerHeight;
    var canvasWidth = window.innerWidth;
	var context = canvas.getContext("2d");
	i =0;

	context.clearRect(0, 0, canvasWidth, canvasHeight);
	context.lineWidth=0.4;
	context.strokeStyle="#64";

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo( i,  canvasHeight/2 + canvasHeight/2* i/canvasWidth* Math.cos( phi/3 + 2 * Math.PI *  i/canvasWidth)  ); 
	context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo( i,  canvas.height/2 + canvas.height/2* i/canvas.width* Math.sin( phi/2 + 2 * Math.PI *  i/canvas.width)  );  
	context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo( canvas.width-i,  canvas.height/2 + canvas.height/2* i/canvas.width* Math.sin( phi + 2 * Math.PI *  i/canvas.width * i/canvas.width)  );  
    context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo(canvas.width-i,  canvas.height/2 + canvas.height/2* i/canvas.width* Math.sin( phi/2 + 2 * Math.PI *  i/canvas.width * i/canvas.width)  );  
    context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo(i,  canvas.height/2 + canvas.height/4* i/canvas.width* Math.sin( phi + 2 * Math.PI *  i/canvas.width * i/canvas.width)  );  
    context.stroke();

    phi += 0.01;
}
animate();
