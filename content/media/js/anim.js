var canvas  = document.getElementById("myCanvas");

var i = 0;
var phi = 0.0;
var sin1 = new Array(1024); //precompute buffer

function animate() {
	reqAnimFrame = window.mozRequestAnimationFrame    ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame     ||
		window.oRequestAnimationFrame
		;	
	setTimeout(function(){
	reqAnimFrame(animate);
   	}, 1000 / 25);

	draw();
}

function draw() {
	canvas.height = window.innerHeight;
	canvas.width= window.innerWidth;
    	var canvasHeight = window.innerHeight;
	var canvasWidth = window.innerWidth;
	var context = canvas.getContext("2d");
	var i =0;

	//for (i = 0; i < 1024; i++)
	//	sin1[i] = i/canvasWidth * Math.sin(2 * Math.PI *  i / canvasWidth);
	//context.clearRect(0, 0, canvasWidth, canvasHeight);
	context.lineWidth=0.3;
	context.strokeStyle="#64";

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo( i,  canvasHeight/2 + canvasHeight/2* i/canvasWidth* Math.cos( phi/3 + 2 * Math.PI *  i/canvasWidth) ); 
	context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo( i,  canvasHeight/2 + canvasHeight/2* i/canvas.width* Math.sin( phi/2 + 2 * Math.PI *  i/canvas.width)  );  
	context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo( canvas.width-i,  canvasHeight/2 + canvasHeight/2* i/canvas.width* Math.sin( phi + 2 * Math.PI *  i/canvas.width * i/canvas.width)  );  
    context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo(canvas.width-i,  canvasHeight/2 + canvasHeight/2* i/canvas.width* Math.sin( phi/2 + 2 * Math.PI *  i/canvas.width * i/canvas.width)  );  
    context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo(i,  canvasHeight/2 + canvasHeight/4* i/canvas.width* Math.sin( phi + 2 * Math.PI *  i/canvas.width * i/canvas.width)  );  
    context.stroke();

    phi += 0.02;
}
animate();
