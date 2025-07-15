---
title: Day 6
date: 2010-09-06 16:56
author: Admin
category: Creative Pact 2010
---

Last night I finished watching the first season of [The Wire](http://www.imdb.com/title/tt0306414/). I have been watching it on DVD and the splash screen and the opening scene of the show has all of these signal displays. So, I dusted off my trigonometry skills and started making some sine waves dance on my screen.

I have some ideas about how to tweak this a bit more by casting the shapes to PImages and then applying filters but I have a busy day, so that will happen another time. I expect that the sketches during the week will be shorter than the weekend ones. I think that is just how it goes.

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0264.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0342.jpg)

------------------------------------------------------------------------

Today's Code:
```processing
float amp1;
float inc;
float tri;
boolean up;
float downer;

void setup(){
 size(400,300); 
  amp1 = height/2;
  fill(255);
  smooth();
}

void draw(){
  noStroke();
  fill(0,15);
  rect(0,0,width,height);
  stroke(40,197,90);
  fill(255);

  amp1 = pow (10, -tri/10);
  
  if (up)
    downer = -1;
  else 
    downer = 1;  

  for (int i = 0 ; i < width; i++)
  {
     point (i, sin(float(i)/width * TWO_PI + frameCount/PI)*downer * -1 *amp1*height/2 + height/2  - amp1*50) ;  
     point (i, sin(float(i)/width * TWO_PI *2 - frameCount/(3*PI))* downer * amp1*height/4 + height/4) ;  
     point (i, sin(float(i)/width * TWO_PI *20 - frameCount/(9*PI))* downer * amp1*height*.23 + height*.8 + amp1*30) ;  
 
  }
  
  if ( tri >= 20)
  {
    inc = -.2;
    up = !up;
  }
  if ( tri <= 0)
    inc = .16;

  tri = tri + inc;
}

void keyPressed(){
 if (key == ' ')
    saveFrame(); 
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY6/DAY6.pde)*
