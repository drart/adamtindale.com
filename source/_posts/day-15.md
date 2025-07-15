---
title: Day 15
date: 2010-09-16 01:43
author: Admin
category: Creative Pact 2010
---

Whew! Here is a quick patch based upon a circle that draws brightness based on the level according to FFT analysis. I can see this moving and rotating in the future but for today I have something done.

I think I am going to start looking at saving frames and doing waterfall like displays so you can see into the past. That should be fun.

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0983.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-1529.jpg)

------------------------------------------------------------------------

```processing
import javax.media.opengl.*;
import processing.opengl.*;
import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
FFT fft;
AudioInput input;

float[] points;

int numberofpoints;

void setup()
{
  size(720,480,OPENGL); 
  hint(ENABLE_OPENGL_4X_SMOOTH);  

  minim = new Minim(this);
  input = minim.getLineIn(Minim.STEREO, 512);
  fft = new FFT(input.bufferSize(), input.sampleRate() );

  numberofpoints = fft.specSize();
  
  points = new float[numberofpoints];  
  for ( int i = 0 ; i < numberofpoints/2; i++)  
  {    
    points[i] = sin( (float)i/numberofpoints*2 * TWO_PI) * height/2 + width/2;
    points[i+numberofpoints/2] = cos( (float)i/numberofpoints*2 * TWO_PI) * height/2 + height/2;
  }

  noStroke();
  fill(0);
  rect(0,0,width,height); 
}

void draw()
{
  
  fill(0,5);
  noStroke();
  rect(0,0,width,height);
  fill(255);
  
  float audiolevel = input.mix.level();
  fft.forward(input.mix);
  
  strokeWeight(5);
  
  for ( int i = 0 ; i < numberofpoints/2; i++)  
  {  
    stroke( fft.getBand(i) * 100);
    point( points[i] , points[i+numberofpoints/2] );
  }  
}

void mousePressed()
{
   noStroke();
   fill(255);
   rect(0,0,width,height); 
}

void keyPressed()
{
  if (key == ' ')
    saveFrame();
}

void stop()
{
  input.close();
  minim.stop();
  super.stop();
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY15/DAY15.pde)*
