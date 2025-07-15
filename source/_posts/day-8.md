---
title: Day 8
date: 2010-09-09 03:28
author: Admin
category: Creative Pact 2010
---

Another audio analysis simple patch for today. I looked into the BeatDetect object in MINIM and found that yesterday's code could be done even simpler by using the built in detector. It isn't very good but it works. I didn't do much tweaking on it but I bet with some massaging I could get it to detect my signals a little bit better.

So today's patch is a bit of a homage to [Dan Shiffman's space junk patch](http://processing.org/learning/library/spacejunk.html). The patch has three magic lines that make it look great. The last three valid lines are rotatings in x,y,z. What makes it special is that those lines are repeated multiple times in each frame and a translate is performed afterwards with no pushMatrix() or popMatrix(). So the reference is moved about the sketch multiple times so that there is some interesting placement of objects about the space.

This patch uses the detected volume and onset information to draw a set of shapes around the screen with varying rotation based upon the detected parameters. On my machine the frames show up for a very short amount of time and often aren't drawn fully so it looks quite glitchy and nice. When I render it out to screenshots the image is preserved. Try squinting and covering half the image in a weird way and you will see what I see when it is running, or run the code yourself.

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0707.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-5458.jpg)

------------------------------------------------------------------------

```processing
import ddf.minim.*;
import ddf.minim.analysis.*;
import processing.opengl.*;
import javax.media.opengl.*;

Minim minim;
AudioInput input;
BeatDetect detectorGadget;


void setup(){
  size(640,480,OPENGL);  

  minim = new Minim(this);
  input = minim.getLineIn(Minim.STEREO, 512);
  detectorGadget = new BeatDetect();
  
 stroke(255, 255, 150);
 fill(3,190,129);
}

void draw(){
  background(30);

  float audiolevel = input.mix.level();
  detectorGadget.detect(input.mix);
  
  translate (width/2, height/2,200);

  if(detectorGadget.isOnset())
  {
    for (int i = 0 ; i < 100; i++)
    {
      ellipse(0,0, 1000*audiolevel,1000*audiolevel);
      box(10,10,100);
      rotate(audiolevel);
      translate(log(audiolevel),0);
    }
  }
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

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY8/DAY8.pde)*
