---
title: Day 22
date: 2010-09-23 02:24
author: Admin
category: Creative Pact 2010
---

Today I had an idea to see if I could kaleidoscope an image or make a mirror. This was something I was thinking of as a way to illustrate mono signals and then I could modify the images as the signals diverged. I played around with rotating a bit and then remembered that it could get ugly and convoluted so I did a bit of googling and the Processing forums showed a gem: scale(). I can set the scale to negative values in either the x or y dimension (or z if you want to get crazy) and then move the image accordingly and all is fine.

I set up minim to blend a noise image into my scene if there is an onset and then I played around with rotating boxes again. Look, it isn't black and white!

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0294.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0965.jpg)

------------------------------------------------------------------------

```processing
import ddf.minim.*;

Minim minim;
AudioInput in;

PImage img;
PGraphics graph;
int r;
void setup() 
{
  size(720,480,P2D);
  
  minim = new Minim(this);
  in = minim.getLineIn(Minim.STEREO, 512);
  
  img = createImage(width,height, ARGB);
  graph = createGraphics(width/2, height, P2D);
  graph.smooth();

  graph.beginDraw();
  graph.background( color (290, 39, 111, 80));
  graph.stroke(200);
  for (int i = 0 ; i < 30 ; i++)
    graph.line(0,0,random(graph.width/2, graph.width) , random(graph.height/2, graph.height));
  graph.endDraw(); 

  img.loadPixels();
  for (int i = 0 ; i < img.pixels.length ; i++)
     img.pixels[i] = color( sin(random (0,TWO_PI)) *122 + 122);
  img.updatePixels();  
}


void draw()
{
  background(sin((float)frameCount/20) * 20 + 20 );
  image (graph,0,0);
  
  graph.beginDraw();
  graph.stroke(200);
  graph.rotate(r++);
  graph.rect(graph.width/2, graph.height/2, 40,40);
  graph.endDraw(); 
  

  pushMatrix();   
  scale(-1.0, 1.0);

  image(graph,-width,0);
  popMatrix();
    
  if ( in.mix.level() > 0.1 )
  {
     blend(img, 0,0,width,height, 0,0, width,height, DODGE);
     saveFrame();
   }
}

void mouseClicked ()
{
 saveFrame();
}

void stop()
{
  in.close();
  minim.stop();  
  super.stop();
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY22/DAY22.pde)*
