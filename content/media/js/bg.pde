void setup()
{
    size (window.innerWidth, window.innerHeight);
    frameRate(20);
}

float phi = 0;

void draw()
{
  background(255);

  stroke(100);
  noFill();
  strokeWeight(0.5);
  
  pushMatrix();
  translate(0,height/2);

  beginShape();
  for(int i=0;i<width+4;i++)
  { curveVertex( i,  (float)i/width * height/2*cos((float)i/width* (float)i/width* TWO_PI + phi/3 )); }
  endShape();

  beginShape();
  for(int i=0;i<width+4;i++)
  { curveVertex( width-i,  (float)i/width * height/2*cos((float)i/width* (float)i/width* TWO_PI + phi  )); }
  endShape();
  
  beginShape();
  for(int i=-4;i<width+4;i++)
  { curveVertex( width-i,  (float)i/width * height/2*sin((float)i/width* (float)i/width* TWO_PI + phi/2 )); }
  endShape();

  beginShape();
  for(int i=-4;i<width+4;i++)
  { curveVertex( i,  (float)i/width * height/2*sin((float)i/width* (float)i/width* TWO_PI + phi  )); }
  endShape();

  beginShape();
  for(int i=-4;i<width+4;i++)
  { curveVertex( i,  (float)i/width * height/4*sin((float)i/width* (float)i/width* TWO_PI + phi  )); }
  endShape();

  popMatrix();

  phi += 0.05;
}
