---
title: Day 5
date: 2010-09-06 03:35
author: Admin
category: Creative Pact 2010
---

Today I was working with analysis. This patch doesn't have a lot of good looks but I have implemented a zero crossing rate function, an rms function for time domain analysis, spectral centroid, spectral rolloff, and spectral compactness. I coded up a spectral flatness measure but I keep getting zero as the output. I haven't done thorough debugging job because I was trying to make sure I have something done for today!

I started out hoping that I could implement both the spectral features and time domain features as an AudioListener object but the FFT object doesn't work that way. So, I made a method that is called every draw loop. This isn't the nicest solution but it works. I am dreaming up a link between [jAudio](http://jmir.sourceforge.net/jAudio.html) and MINIM. If I'm not careful I might be putting another thing on my plate :)

Today's patch is really just an extension of MINIM's spectral display patch but an overlay of the feature extraction output. My hope is to eventually do a MINIM version of [sndpeek](http://soundlab.cs.princeton.edu/software/sndpeek/). Maybe tomorrow there will be text and waterfall plots\... maybe.

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0175.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0568.jpg)

------------------------------------------------------------------------
```processing
import ddf.minim.analysis.*;
import ddf.minim.*;

Minim minim;
AudioPlayer jingle;
FFT fft;
DrawTime dt;

int w;
float[]  myspectrum;

void setup()
{
  size(512, 200, P3D);

  minim = new Minim(this);
  jingle = minim.loadFile("jingle.mp3", 2048);
  jingle.loop();
  
  fft = new FFT(jingle.bufferSize(), jingle.sampleRate());
  // calculate averages based on a miminum octave width of 22 Hz
  // split each octave into three bands
  fft.logAverages(22, 3);
  
  dt = new DrawTime();
  jingle.addListener(dt);

  myspectrum = new float[ jingle.bufferSize() ];
  
  rectMode(CORNERS);
}

void draw()
{
  background(0);
  fill(255);
  stroke(0);
  
  fft.forward(jingle.mix);
  // avgWidth() returns the number of frequency bands each average represents
  // we'll use it as the width of our rectangles
  w = int(width/fft.avgSize());

  for(int i = 0; i < fft.avgSize(); i++)
  {
    rect(i*w, height, i*w + w, height - fft.getAvg(i)*5);
  }
  
  for(int i= 0; i < jingle.bufferSize(); i++)
    myspectrum[i] = fft.getBand(i);
  
  dt.draw();
  drawSpectral(myspectrum);
}

void keyPressed(){
    if (key == ' ')
        saveFrame();
}

void stop()
{
  jingle.close();
  minim.stop();
  super.stop();
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY5/DAY5.pde)*

```processing
void drawSpectral(float[] spec)
{
  //==============================
  // SPECTRAL CENTROID
  //==============================
  float m1 = 0;
  float m0 = 0;

  for (int i = 0; i < spec.length; i++){
    m1 += i * spec[i];
    m0 += spec[i]; 
  }

  float centroid = 0.5;
  if (m0 != 0.0)
  {
    centroid = (m1 / m0) / (float) spec.length ;  
  }
  pushStyle();
    stroke(90,255,90);
    strokeWeight(3);
    line(centroid * width, 0 , centroid * width, height);
  popStyle();

  //==============================
  // SPECTRAL ROLLOFF
  //==============================
  float perc = 0.8;
  float[] sumWindow = new float [ spec.length ];
  float total = 0;	
  float sum = 0;
  float specRolloff = 0;
  boolean specdone = false;
  for( int i = 0; i< spec.length; i++)
  {
    sum += spec[i];
    sumWindow[i] = sum;
  }
  total = sumWindow[spec.length-1];

  for ( int i = spec.length-1; i > 1 ; i--){
    if (sumWindow[i] < 0.8 * total)
    {
      specRolloff = (float) i;
      specdone = true;
      break;
    }
  }
  if ( !specdone )
    specRolloff = float(spec.length - 1);
  specRolloff /= spec.length;

  pushStyle();
    stroke(89, 169, 210);
    line( specRolloff * width, 0, specRolloff * width, height);
  popStyle();

  //==============================
  // SPECTRAL COMPATCTNESS
  // code snippet from jAUDIO  
  //==============================
  float[] mag_spec = new float[ spec.length ];
  for (int i = 0; i < spec.length; i++)
  {
    mag_spec[i] = abs( spec[i] );
  }

  double compactness = 0.0;
  for (int i = 1; i < mag_spec.length - 1; i++) {
    if ((mag_spec[i - 1] > 0.0) && (mag_spec[i] > 0.0) && (mag_spec[i + 1] > 0.0)) 
    {
      compactness += Math .abs(
          20.0 * Math.log(mag_spec[i])
          - 20.0 * (Math.log(mag_spec[i - 1]) 
            + Math.log(mag_spec[i]) 
            + Math .log(mag_spec[i + 1])) 
          / 3.0);
    }
  }
  pushStyle();
    stroke(12,48, 96);
    // seems to evaluate between 2k and 9k so divide by 10000 as hack to normalize
    line ( (float)compactness / 10000 * width, 0, (float)compactness / 10000 * width , height);
  popStyle();

  //==============================
  // SPECTRAL FLATNESS
  // DOESN'T WORK -- geometric mean always evaluates to zero :(
  //==============================
  float flatness = 0;
  double geometricMean = spec[0];
  float arithmeticMean = sum;

  for ( int i = 1; i < spec.length; i++)
  {
        geometricMean *= (double) spec[i];
        if (spec[i] == 0.0)
        {
          println("WARNING: ZERO DETECTED " +frameCount);

        }
  }
  geometricMean = Math.pow(geometricMean , (1.0f / spec.length) );
  arithmeticMean /=  spec.length;
  
  flatness = (float)geometricMean / arithmeticMean ;
  println(flatness);
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY5/SPECTRAL.pde)*

```processing
class DrawTime implements AudioListener
{
  private float[] left;
  private float[] right;

  synchronized void samples(float[] samp)
  {
    left = samp;
  }

  synchronized void samples(float[] sampL, float[] sampR)
  {
    left = sampL;
    right = sampR;
  }

  synchronized void draw()
  {
    if (left != null && left.length > 0)
    {
      //RMS
      float rms = 0.0;

      for (int i = 0; i < left.length; i++)
        rms += (left[i] * left[i] );

      if (rms!= 0.0)
      {
        rms /= left.length;
        rms = sqrt(rms);
      }
      pushStyle();
          noFill();
          stroke (255, 90,90);
          line(0, height - rms*height, width, height - rms*height);
      popStyle();  

      // ZERO-CROSSING RATE (normalized)
      // detected / buffsize

      float zcr = 0;

      for (int i = 0; i < left.length - 1; i++)
      {
        if (left[i] > 0.0 && left[i + 1] < 0.0)
          zcr++;
        else if (left[i] < 0.0 && left[i + 1] > 0.0)
          zcr++;
        else if (left[i] == 0.0 && left[i + 1] != 0.0)
          zcr++;
      }
      zcr = zcr / (float) left.length;
      pushStyle();
          noFill();
          stroke (90, 90,255);
          line(0, height - zcr*height, width, height - zcr*height); 
      popStyle();  
    }
  }
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY5/TIME.pde)*
