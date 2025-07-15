---
title: Day 24
date: 2010-09-25 03:16
author: Admin
category: Creative Pact 2010
---

Got a little busy today so I made a quick sketch to see if I understood making shapes with OPENGL. I do!

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0173.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0484.jpg)

------------------------------------------------------------------------

```processing
import javax.media.opengl.*;
import processing.opengl.*;


int jf;

void setup(){
  size(720,480, OPENGL);
  hint(ENABLE_OPENGL_4X_SMOOTH);
  fill(240,30);
}


void draw(){

  background(0);
  jf = int(random(10,50));
  
  beginShape(TRIANGLE_FAN);
  for (int i = 0; i < jf; i++)
    vertex( random(0,width), random(0, height), random(0,100));
  endShape(); 

}

void mouseClicked(){
  saveFrame();
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY24/DAY24.pde)*
