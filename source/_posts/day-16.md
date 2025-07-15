---
title: Day 16
date: 2010-09-17 04:47
author: Admin
category: Creative Pact 2010
---

Today I almost forgot to do my piece. I have been watching a lot of Alva Noto so today is my stab at a classic bass drum gesture. A black screen with a mouse click that fires a bass drum sample and flashes a white screen that fades. I didn't think an image of a white or black screen was worth a screenshot, so enjoy the code.
------------------------------------------------------------------------
```processing
import javax.media.opengl.*;
import processing.opengl.*;
import ddf.minim.*;
import ddf.minim.ugens.*;

Minim minim;
AudioOutput out;
Oscil o;
Damp env;

float a;

void setup()
{
  size(720,480,OPENGL); 
  hint(ENABLE_OPENGL_4X_SMOOTH);  
  
  minim = new Minim(this); 
  out = minim.getLineOut(Minim.STEREO);
  env = new Damp();
  o = new Oscil(50,1.0, Waves.SINE);
  o.patch(env).patch(out);
  
  fill(0);
  noStroke();
  rect(0,0,width,height);
}

void draw()
{
  noStroke();
  fill(0,6);
  rect(0,0,width,height);
}

void mouseClicked()
{

   fill(255);
   rect(0,0,width,height);
   o.setPhase(0);
   env.activate();
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY16/DAY16.pde)*
