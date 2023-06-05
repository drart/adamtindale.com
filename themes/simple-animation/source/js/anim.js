var canvas  = document.getElementById("myCanvas");

var i = 0;
var phi = 0.0;

function animate() {
	reqAnimFrame = window.requestAnimationFrame;
    if (!reqAnimFrame){
        reqAnimFrame = window.mozRequestAnimationFrame    ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame     ||
		window.oRequestAnimationFrame ;	
    }
    
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

	var i = 0;

	context.lineWidth=0.3;
	context.strokeStyle="#64";

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo( i,  canvasHeight/2 + canvasHeight/2* i/canvasWidth* Math.cos( phi/3 + 2 * Math.PI *  i/canvasWidth) + 0.5 ); 
	context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo( i,  canvasHeight/2 + canvasHeight/2* i/canvas.width* Math.sin( phi/2 + 2 * Math.PI *  i/canvas.width) + 0.5  );  
	context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo( canvas.width-i,  canvasHeight/2 + canvasHeight/2* i/canvas.width* Math.sin( phi + 2 * Math.PI *  i/canvas.width * i/canvas.width) + 0.5  );  
    context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo(canvas.width-i,  canvasHeight/2 + canvasHeight/2* i/canvas.width* Math.sin( phi/2 + 2 * Math.PI *  i/canvas.width * i/canvas.width) + 0.5 );  
    context.stroke();

	context.beginPath();
	for(i=0;i<canvas.width+4;i++)
		context.lineTo(i,  canvasHeight/2 + canvasHeight/4* i/canvas.width* Math.sin( phi + 2 * Math.PI *  i/canvas.width * i/canvas.width) + 0.5 );  
    context.stroke();

    phi += 0.02;
}
animate();

// triggers the css fadein
canvas.style.opacity = 1;
