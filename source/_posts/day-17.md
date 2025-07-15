---
title: Day 17
date: 2010-09-18 03:45
author: Admin
category: Creative Pact 2010
---

Today is a simple patch that does a spectral lissajous plot. Enjoy!
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0117.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0218.jpg)
------------------------------------------------------------------------
```processing
import javax.media.opengl.*;
import processing.opengl.*;
import ddf.minim.*;
import ddf.minim.analysis.*;


Minim minim;
AudioInput input;
FFT fft;

float a;

void setup()
{
  size(720,480,OPENGL); 
  hint(ENABLE_OPENGL_4X_SMOOTH);  
  
  minim = new Minim(this); 
  input = minim.getLineIn(Minim.STEREO);
  fft = new FFT(input.bufferSize(), input.sampleRate() );
  fft.linAverages(10);
  background(0);
  

}

void draw()
{
  fft.forward(input.mix);
  
  noStroke();
  fill(0,19);
  rect(0,0,width,height);
  
  stroke(255);
  strokeWeight(1);
  translate(width/2,height/2);
  beginShape();
  for (int i = 0 ; i < fft.avgSize(); i++)
  {
      vertex(sin (fft.getBand(i) * i/fft.avgSize()) * width/2 , cos(fft.getBand(i) * i/fft.avgSize()) * height/2 );

  }  
  endShape();
}

void stop()
{
  input.close();
  minim.stop();
  super.stop();
}

void keyPressed()
{
 if (key == ' ')
  saveFrame(); 
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY17/DAY17.pde)*
