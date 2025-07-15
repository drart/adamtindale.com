---
title: Day 25
date: 2010-09-26 00:28
author: Admin
category: Creative Pact 2010
---

Today's sketch is a play on the random shape clusters that I seem to be gravitating towards. I used the spectral feature extraction from Day 5 so not all of the code is posted below. You can go to that post and rip the features if you like.

This sketch uses a more coherent model instead of randomness. There are 20 3D boxes in the sketch that have their colour and placement changed based upon the sound coming into the sketch. It is reactive but a little too literal. I think I will try to make some mappings in the future that can take spectral centroids and do something meaningful visually. Sounds like a research project!

![Screenshot of software.](/img/blog/creative-pact-2010/screen-1947.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-1164.jpg)

------------------------------------------------------------------------

```processing
import javax.media.opengl.*;
import processing.opengl.*;
import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
AudioInput in;
FFT fft;

float r;
float zr;

float lastlevel;
float[]  myspectrum;
float[] features;

void setup()
{
  size(720, 480, OPENGL);
  hint( ENABLE_OPENGL_4X_SMOOTH );
  
  minim = new Minim(this);
  in = minim.getLineIn(Minim.STEREO, 512);
  
  fft = new FFT(in.bufferSize(), in.sampleRate());
  fft.logAverages(50, 2);
  myspectrum = new float[ in.bufferSize() ];
  
  //noFill();
  //stroke(255,40);
  fill(200, 40);
}

void draw()
{
  background(30);
  
  fft.forward(in.mix);
  for(int i= 0; i < in.bufferSize(); i++)
    myspectrum[i] = fft.getBand(i);
  
  features = drawSpectral(myspectrum);
  
  fill(features[0] * 200 + features[1] * 200 + 100, 40);
  
  float level = in.mix.level();

  // lowpass filter to smooth out motion
  level += lastlevel;
  level *= 0.5;
  
  if ( 10 * log (level) > -50 )
     zr++;

  translate( width/2 , height/2 );
  rotateZ ( zr / 50 );

  for ( int i = 0 ; i < 20 ; i++ )
  {
    rotateY( r / 300 );
    rotateX( r / 500 );
    translate(log(level)*i,0,0); // comment this line out for more standard shape
    box(width/4 + 100 + ( 10 * log(level)) +i*3);
  }
  
  r++;
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

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY25/DAY25.pde)*

```processing
float[] drawSpectral(float[] spec)
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

 float[] f =  { centroid, specRolloff, (float)compactness };
 return f;
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY25/SPECTRAL.pde)*
