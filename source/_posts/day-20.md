---
title: Day 20 
date: 2010-09-21 01:40
author: Admin
category: Creative Pact 2010
---

Today I was so close to not making something but then I looked into logarithmic scales in FFTs and it was very easy to adapt yesterday's code. I played a little bit more with the camera in OPENGL. Who knows what tomorrow will bring.

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0659.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0948.jpg)

------------------------------------------------------------------------

```processing
import ddf.minim.*;
import ddf.minim.analysis.*;
import javax.media.opengl.*;
import processing.opengl.*;

Minim minim;
AudioInput input;
FFT fft;

float[][] spectra;
int pointer;

int r;

void setup()
{  
  size(720,480,OPENGL); 
  hint(ENABLE_OPENGL_4X_SMOOTH);

  smooth();
  minim = new Minim(this); 
  input = minim.getLineIn(Minim.STEREO);
  fft = new FFT(input.bufferSize(), input.sampleRate() ); 
  
  fft.logAverages(22, 2);
  
  spectra = new float[50][fft.avgSize()];
  
  colorMode(HSB,1000);
}

void draw()
{
  camera(width/2.0, height/10.0 + cos (r++/TWO_PI)*100, (height/2.0) / tan(PI*60.0 / 360.0) , width/2.0, height/2.0, 0,    0, 1, 0);
  
  fft.forward(input.mix);
  
  for (int i = 0 ; i < fft.avgSize() ; i++)
    spectra[ pointer ][i] = fft.getAvg(i);
  
  background(0);
  
  noFill();
  
  translate(0,height - 100);
  
  for ( int q = 1 ; q <= 50 ; q++)
  {  
    stroke(200,1000 - (q*20), 1000 - (q*20) );  

    beginShape();
    for (int i = 0 ; i < fft.avgSize() ; i++)
      curveVertex(i * (float)width/fft.avgSize() , spectra[ (pointer+q) % 50 ][i] * height );
    endShape();  
    translate(0,0, -200);
  }
  
  pointer = (pointer + 1) % 50;
}

void keyPressed()
{
  if (key == ' ')
    saveFrame(); 
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY20/DAY20.pde)*
