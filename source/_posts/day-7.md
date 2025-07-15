---
title: Day 7
date: 2010-09-08 02:08
author: Admin
category: Creative Pact 2010
---

Today's sketch is a take on the mouse controlled ball that you can rotate and throw. I have a sphere here that is rotated by making a loud sound. I have done a rather crude thresholding but I discovered that MINIM has a nice level() call on audiobuffers that return the RMS. Hooray!

I also discovered that on a mac when you export your patch to the web it doesn't work well if you are using OPENGL. I have included the code inline with the blog, which I don't like so much but it will get the idea to you.

Like I predicted this is a much shorter sketch than on the weekends. This is going to be the way of it until I get more efficient at my changing weeks.

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0107.jpg)

------------------------------------------------------------------------

```processing
import ddf.minim.*;
import processing.opengl.*;
import javax.media.opengl.*;

Minim minim;
AudioInput input;

float r;
float inc;

void setup(){
  size(screen.width, screen.height, OPENGL);  
  hint(ENABLE_OPENGL_4X_SMOOTH);

  minim = new Minim(this);
  input = minim.getLineIn(Minim.STEREO, 512);
  
  stroke(255, 255, 150);
  noFill();
}

void draw(){
  background(30);

  float audiolevel = input.mix.level();
  if (audiolevel > 0.01)
    inc++;
  r = r + inc;
  inc = inc * 0.85;
  
  translate (width/2, height/2,mouseX);
  rotateY(r);
  sphere(200 + audiolevel*1000);
}

void keyPressed()
{
   if (key == ' ')  
   {
      saveFrame();
   }
}

void stop()
{
  input.close();
  minim.stop();
  super.stop();
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY7/DAY7.pde)*
