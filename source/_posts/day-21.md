---
title: Day 21
date: 2010-09-22 03:51
author: Admin
category: Creative Pact 2010
---

No sound today. I was thinking of making something that might look like a [Shepard's Tone](http://en.wikipedia.org/wiki/Shepard_tone) and I came up with this simple idea of a complex polygon that expands outwards into the viewer. I got it going and then I thought it would be cool for it to be endless. I will have to think how I can do that practically. I have a feeling it will borrow some waterfall code and test to see if vertices are out of visual range and then put them back into the pile. I think I will need to sleep on that one.
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0152.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-2772.jpg)
------------------------------------------------------------------------
```processing
import javax.media.opengl.*;
import processing.opengl.*;

int r;
int numberoflines = 9000;

float[] x = new float [numberoflines];
float[] y = new float [numberoflines];
float[] z = new float [numberoflines];

void setup(){
  size(720,480, OPENGL);
  hint(ENABLE_OPENGL_4X_SMOOTH);
  smooth();
  fill(240,30);
  stroke(140,40); // try 240,30
  
  for (int i = 0 ; i < numberoflines ; i++)
  {
    x[i] = random(-width/2, width/2);
    y[i] = random(-height/2, height/2);
    z[i] = random(0,500);
  }
}


void draw(){

  background(0);

  translate(width/2, height/2,-500);
  rotate((float)r++/800);
  //rotateY((float)r++/500); // comment out this line for better motion
  noFill();
  strokeWeight(4);
  beginShape();
  for (int i = 0; i < x.length; i++)
  {
    vertex( x[i], y[i], z[i]);
  }
  endShape(); 
  
  for (int i = 0; i < x.length; i++)
  {
    x[i] += random(-1,1);
    y[i] += random(-1,1);
    z[i] += random(-1,1);
    
    z[i] += random( (float) i * .001);
  }  
}

void mouseClicked(){
  saveFrame(); 
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY21/DAY21.pde)*
