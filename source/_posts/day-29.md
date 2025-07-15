---
title: Day 29
date: 2010-09-30 04:54
author: Admin
category: Creative Pact 2010
---

Today I played a bit more with the peakiness function but I went back a simple particle system that will evolve over longer periods of time. I borrowed some of the code from yesterday and tried to make it a bit more gradual and I got some interesting results.

I also spent some time today digging into the Java API and found some nice features of Arrays. Sorting is actually quite a nice algorithm and also fill is a great way to just fill up an array with a value. Hooray for not having to write simple things over and over!

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0025.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-2910.jpg)

------------------------------------------------------------------------

```processing
import javax.media.opengl.*;
import processing.opengl.*;
import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
AudioInput in;
FFT fft;

int numberofparticles = 10000;
float[] x = new float[numberofparticles];
float[] y = new float[numberofparticles];

void setup()
{
  size(720, 480, OPENGL);
  background ( 0 ) ;
  smooth();
  
  
  for (int i = 0; i < x.length ; i++)
    x[i] = (float) i / x.length *  width;
  Arrays.fill(y, height/2);
  
  
  minim = new Minim(this);
  in = minim.getLineIn(Minim.STEREO, 512);
  fft = new FFT(in.bufferSize(), in.sampleRate());
  fft.noAverages();
}

void draw()
{
  ///------------------------
  // SPECTRAL PEAKINESS
  ///------------------------
  // made this up. not accurate but gives interesting data
  fft.forward(in.mix);
  float sum = fft.getBand(0);
  int peak = 0;
  float centroid = 0;
  
  for( int i = 1 ; i < fft.specSize() ; i++)
  {
    sum += fft.getBand(i);
    centroid += i * fft.getBand(i);
    peak = ( fft.getBand(i) > fft.getBand(peak) ) ? i : peak ;    
  }
  centroid /= sum ;
  float peakiness = (float) peak / centroid;
  ///------------------------

  noStroke();
  fill(0,6);
  rect ( 0,0, width, height );
  
  fill(200,60);
  
  for ( int i = 0 ; i < x.length ; i++)
  {
    ellipse(x[i],y[i],1,1);
    
    y[i] += random(-peakiness,peakiness);
  }
  
}

void stop()
{
  in.close();
  minim.stop();
  super.stop();
}

void mouseClicked()
{
   saveFrame(); 
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY29/DAY29.pde)*
