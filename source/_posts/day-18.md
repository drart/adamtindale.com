---
title: Day 18
date: 2010-09-18 23:55
author: Admin
category: Creative Pact 2010
---

Today I messed around with some simple spectral displays and trying other parts of the Processing API. I have added curveVertex to my bag of tricks. This patch has two curvy lissajous spectral displays rotating in contrary motion and a set of bars representing linear spectral averages.

This was the first time I put some more interaction into a sketch. I have a key that changes the mode of the layering. I have been working on things and discovering stuff that I like about a sketch but often it goes away when I make the final thing that I like most. So, I made a little mistake in the process and kept it as an option by pressing the d key.

I still have to look into waterfall plots and buffering. Maybe tomorrow.

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0581.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0786.jpg)

------------------------------------------------------------------------

```processing
import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
AudioInput input;
FFT fft;
boolean darkness = false;
int r;

void setup()
{
  size(720,480,P2D); 
  smooth();
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
  
  stroke(input.mix.level() * 255);
  strokeWeight(.1);
  
  pushMatrix();
  translate(width/4,height/4);
  rotate(PI - (float)r/100);
  beginShape();
  for (int i = 0 ; i < fft.avgSize(); i++)
  {      
      fill( fft.getBand(i) * 255 , 40);
      curveVertex(sin ( (float)i/fft.avgSize() * 2 *TWO_PI) *fft.getBand(i)  * width/2 , cos( (float)i/fft.avgSize() * 2 * TWO_PI) * fft.getBand(i)  * height/2  );
  }  
  endShape(CLOSE);
  popMatrix();
  
  pushMatrix();
  translate(width/4*3,height/4*3);
  rotate(PI + (float)r++/100);
  beginShape();
  for (int i = 0 ; i < fft.avgSize(); i++)
  {      
      fill( fft.getBand(i) * 255 , 40);
      curveVertex(sin ( (float)i/fft.avgSize() * 2 *TWO_PI) *fft.getBand(i)  * width/2 , cos( (float)i/fft.avgSize() * 2 * TWO_PI) * fft.getBand(i)  * height/2  );
  }  
  endShape(CLOSE);
  popMatrix();
  
  int spacing = width / fft.avgSize();
  
  if (!darkness)
    stroke(180);
  
  for (int i = 0 ; i < fft.avgSize(); i++)
  {
     strokeWeight(fft.getBand(i) * 50); 
     line( spacing * i + spacing/2, 0, spacing * i + spacing/2, height);  
  }
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
  
 if (key == 'd' | key == 'D' )
  darkness = !darkness; 
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY18/DAY18.pde)*
