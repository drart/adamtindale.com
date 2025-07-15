---
title: Day 27
date: 2010-09-27 18:57
author: Admin
category: Creative Pact 2010
---

Another day, another experiment. I tried to resurrect my Spectral Flatness code and I think it is a precision error in the geometric mean. I thought about scaling the FFT values but I will have to go back on the math for that to make sure I don't skew the values the wrong way. For now I have used the arithmetic mean of the spectrum to give me some numbers to play with.

This sketch changes colour at different volumes, currently white for quiet and black for loud, and becomes more animated with noisier spectra (not really but close enough for now). I think I am getting close to something interesting. Maybe once I sleep on it tomorrow will show me the answer.

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0214.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0146.jpg)

------------------------------------------------------------------------

```processing
import javax.media.opengl.*;
import processing.opengl.*;
import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
AudioInput in;
FFT fft;

float lastlevel;
float[]  myspectrum;
float[] features;
float spacing;

void setup()
{
  size(720, 480, OPENGL);
  hint( DISABLE_OPENGL_2X_SMOOTH );
  smooth();
  
  minim = new Minim(this);
  in = minim.getLineIn(Minim.STEREO, 512);
  
  fft = new FFT(in.bufferSize(), in.sampleRate());
  fft.logAverages(50, 2);
  myspectrum = new float[ in.bufferSize() ];

  noFill();
  strokeWeight(8);
  
  spacing = (float) width / fft.avgSize();
  
}

void draw()
{
  background(30);
  
  fft.forward(in.mix);
  float sum = 0;
  for(int i= 0; i < in.bufferSize(); i++)
  {
    myspectrum[i] = fft.getBand(i);
    sum += myspectrum[i];
  }
  
  //==============================
  // SPECTRAL FLATNESS
  // DOESN'T WORK -- geometric mean always evaluates to zero :(
  //==============================
  float flatness = 0;
  double geometricMean = (double) myspectrum[0];
  float arithmeticMean = sum;

  for ( int i = 1; i < myspectrum.length; i++)
  {
        geometricMean *= (double) myspectrum[i];
        if (myspectrum[i] == 0.0)
        {
          println("WARNING: ZERO DETECTED " +frameCount);
          break; // might as well leave since this thing will evaluate to zero
        }
  }

  geometricMean = Math.pow(geometricMean , (1.0f / myspectrum.length) );
  arithmeticMean /=  myspectrum.length;

  flatness = (float)geometricMean / arithmeticMean ;
  
  //==============================
  
  float level = in.mix.level();

  // lowpass filter to smooth out motion
  level += lastlevel;
  level *= 0.5;

  translate( width/2 , height/2 );

  if (10 * log(level) > -50 )
    stroke(0);
  else
    stroke ( 200, 40);

  beginShape();
  for ( int i = 0 ; i < fft.avgSize() ; i++ )
     curveVertex( random(-spacing, spacing) * i, arithmeticMean * random(50,150) - 75 , random (0, -200) );
  endShape();
  
  lastlevel = level;
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

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY27/DAY27.pde)*
