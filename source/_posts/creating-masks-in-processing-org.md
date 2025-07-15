---
title: Creating Masks in Processing.org
date: 2010-11-17 09:11
author: Admin
category: Processing
permalink: blog/processing/129/
---

A great tutorial on OffScreen graphics rendering on [blog.blprnt.com](http://blog.blprnt.com/) made me want to release some code today. I have been working on some offscreen graphics rendering to create masking effects for an upcoming performance. Processing offers PImage and PGraphics as objects that hold raw pixels or vector graphics. These are kept somewhere in memory and not drawn to the screen unless you put them there using [image()](http://processing.org/reference/image_.html). This is much faster than drawing to the screen in almost every instance.

Using the [blend()](http://processing.org/reference/blend_.html) command with the MULTIPLY option you can apply a masking effect to your sketch. For the example below the mask is a PGraphics object that contains a line which scrolls down the screen. Since the background is set to black (or 0) when it is multiplied against the image drawn on the screen it becomes black (because anything times 0 is 0). If this example is working properly you should see a red line move down the screen. This is because the image drawn to the screen is just a red background.

```processing
PGraphics g;
int x;

void setup()
{
  size( 720, 480);
  // create the mask
  g = createGraphics(width,height, P2D);
}  

void draw()
{
  background(244,90,10);
  // draw the mask
  g.beginDraw();
  g.background(0);
  g.stroke(255);
  g.line(0, x%height, g.width, x++%height);
  g.endDraw();

  // apply the mask to the screen
  blend(g,0,0, width,height, 0,0,width,height,MULTIPLY);

}
```

*[View this code on GitHub](https://gist.github.com/drart/8419804)*

If you'd like to get fancy you can draw your image and mask offscreen and then send the result to the screen. Here is a little code snippet to get you started on your journey.

```processing
PImage img;
Pgraphics msk;
//.... do some drawing in both

// apply the mask to the image, both offscreen
img.blend(msk, 0,0,img.height, img.width, 0,0,img.width,img.height,MULTIPLY);
// draw the masked image to the screen
image(img,0,0,width,height);
```

*[View this code on GitHub](https://gist.github.com/drart/8419817)*
