---
title: Day 28
date: 2010-09-29 03:00
author: Admin
category: Creative Pact 2010
---

I am getting quite interested in developing some analysis tools for sound in Java. I am wanting to find the ratio of centre frequency to noise. Today I made a crude algorithm that looks for the peak frequency bin and then uses that in a ratio between spectral centroid. If the peak is off from the centroid then you can assume a distribution that is noisier (aka less pitched). The problems with this algorithm is that it is not normalized to volume and that a centroid of fftsize/2 is noise so if there is a peak at this place then you will get erroneous data. That will take me a little while to find a good solution around this but if was a fun thought experiment.

Today's patch uses my peakiness measure to draw big bubbles across the screen. More noisy means more crazy drawing. It is actually responding in generally the right way and is kind of interesting to watch. I will definitely be expanding on this idea.

Also today I left in some comments in the code for things that I tried and abandoned. You can see a bit more into my process with these.

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0611.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0969.jpg)

------------------------------------------------------------------------

```processing
import javax.media.opengl.*;
import processing.opengl.*;
import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
AudioInput in;
FFT fft;

void setup()
{
  size(720, 480);
  background ( 0 ) ;
  smooth();
  
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
    if ( fft.getBand(i) > fft.getBand(peak) )
        peak = i;
  }
  centroid /= sum;
  float peakiness = (float) peak / centroid;
  ///------------------------
  
  noStroke();
  fill(0,6);
  rect ( 0,0, width, height );
  
  translate(width/2, height/2);
  fill(200,60);
  for ( int i = 0 ; i < 10 ; i++)
  {
     float circlesize = random(70,100);
     //ellipse ( random(random(-200,-20), random(50,200)), random(random(-200,-20), random(50,200)) , circlesize, circlesize );
    ellipse ( random(-width/2, width/2), random(random(-200,-20), random(50,200)) * peakiness, circlesize, circlesize );
  }
  
  //filter(BLUR, peakiness);
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

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY28/DAY28.pde)*
