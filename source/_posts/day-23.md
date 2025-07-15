---
title: Day 23
date: 2010-09-24 04:24
author: Admin
category: Creative Pact 2010
---

[BoxySean](http://boxysean.com/) sent me a link to [SuperDraw](http://intervalstudios.com/superdraw/) yesterday and I was really blown away. Then I looked at who was responsible and it made a lot of sense. So today I thought I would try and do some 3D drawing using sound levels. I originally tried to make some shapes and have them connect and then I realized I would have to come up with a smart system for stacking shapes. That might be another day. For now I have a little reactive audio drawing tool that I can expand on in the future.
![Screenshot of software.](/img/blog/creative-pact-2010/screen-2262.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-2262.jpg)
------------------------------------------------------------------------
```processing
import ddf.minim.*;

  Minim minim;
  AudioInput in;

int r;
ArrayList shapes = new ArrayList();

void setup()
{
  size(720,480, P3D);
  hint(ENABLE_OPENGL_4X_SMOOTH);
  
  minim = new Minim(this);
  in = minim.getLineIn(Minim.STEREO, 512);

  shapes.add( new PVector(10,20,30) );
  stroke(240,50);
  fill(180,100);
}

void draw()
{
  background(0);
  
  shapes.add ( new PVector ( in.mix.level()*width , in.mix.level()*height, 10*log(in.mix.level())  ) );
  
  translate(width/2, height/2);
  rotateY((float)r++/300); 
  beginShape();
  for ( int i = 0 ; i < shapes.size() ; i++ )
  {
     float[] p1 = ( (PVector)shapes.get(i) ).array();
     vertex( p1[0], p1[1] ,p1[2]  );  
  }
  endShape();
  
}

void mousePressed()
{
  saveFrame();
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY23/DAY23.pde)*
