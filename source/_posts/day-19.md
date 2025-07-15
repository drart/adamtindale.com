---
title: Day 19 
date: 2010-09-19 16:39
author: Admin
category: Creative Pact 2010
---

I was hoping to have some success with ArrayLists today but I didn't. I finally have the waterfall code down but it goes backwards from past to present instead of present to past. It looks kinda neat this way, though. I also added colour! For me,  working in HSB seems to be more closely related to my headspace than RGB, so if I need colour I am going to stick to that for now.

This sketch uses linear averages of FFT which are really easy to compute and set up but the result is less than pleasing. I think tomorrow I will play with the log function and see if I can get something a little closer to what I think it should look like.

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0090.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0841.jpg)

------------------------------------------------------------------------

```processing
import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
AudioInput input;
FFT fft;

float[] newspectrum;
blob newblob;

ArrayList drawings;

int r;

void setup()
{  
  size(720,480,P3D); 
   smooth();
  minim = new Minim(this); 
  input = minim.getLineIn(Minim.STEREO);
  fft = new FFT(input.bufferSize(), input.sampleRate() ); 
 
  drawings = new ArrayList();
  // .add(index)  .remove(index)
  
  colorMode(HSB,1000);
}

void draw()
{
  fft.forward(input.mix);
  
  background(0);
  
  newspectrum = new float[fft.specSize()];
  for (int i = 0 ; i < newspectrum.length ; i++)
    newspectrum[i] = fft.getBand(i);

  newblob = new blob(newspectrum);
  drawings.add(newblob);

  for(int i = 0 ; i < drawings.size() ; i++)
  {
     blob b = (blob)drawings.get(i);
     b.drawme();
  }

}


class blob
{
  float[] f;
  int z;
  float size = 50;
  blob(float[] points)
  {
     f = points;
  } 

  void drawme()
  {   
    pushMatrix();
    translate(0,0,z--);
    fill(20, 1000+z, 1000+z);
    stroke(20,1000+z, 1000+z);
    beginShape();
    for(int i = 0 ; i < f.length ; i++)
      curveVertex(i* width/f.length , f[i] *size);
    endShape();
    popMatrix();
  }

}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY19/DAY19.pde)*
