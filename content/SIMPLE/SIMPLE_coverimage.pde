size (1920,1080);
smooth();
background(255);
line(0, height/2, width, height/2);
noFill();
beginShape();
for (int i = 0; i < width/2; i++)
  vertex(i+width/4, height*cos((float)i/(width/2)*(TWO_PI*3/4))*0.4 + height/2   );
endShape();
save("SIMPLEHD.jpg");
