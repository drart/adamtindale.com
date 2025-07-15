---
title: Day 12
date: 2010-09-12 20:22
author: Admin
category: Creative Pact 2010
---

I was again playing with GLGraphics and had a happy accident. I added some more shaders to a sketch and got these swirling worlds. I think this is something I am going to keep. I did something I thought I understood and came up with these great visuals for some reason. This illustrates to me that I need a little more theory before I dig deeper with shaders. Some other time.
My big problem is that I haven't added audio so I am diverting a bit from my original idea at the beginning of the month.  Tomorrow I will refocus.

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0789.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-14122.jpg)

```processing
import javax.media.opengl.*;
import processing.opengl.*;
import codeanticode.glgraphics.*;

GLSLShader shader;
GLModel model;
int numPoints = 1024;
int r;
float[] coords;
float[] colors;
boolean mybool = true;

float denominator = 4000;

void setup()
{
    // DVD resolution
    size(720, 480, GLConstants.GLGRAPHICS);
    hint( DISABLE_OPENGL_2X_SMOOTH );  
    hint( ENABLE_OPENGL_4X_SMOOTH );  
    
    
    model = new GLModel(this, numPoints, GLModel.QUAD_STRIP, GLModel.DYNAMIC);
    //model.setBlendMode(SUBTRACT);    
    model.initColors();
    coords = new float[4 * numPoints];
    colors = new float[4 * numPoints];
    for (int i = 0; i < numPoints; i++)
    {
        for (int j = 0; j < 3; j++) 
          coords[4 * i + j] = height * random(-1, 1);
        coords[4 * i + 3] = 1.0; // The W coordinate of each point must be 1.
        for (int j = 0; j < 3; j++) 
          colors[4 * i + j] = random(0, 1);
        colors[4 * i + 3] = 0.9;      
    }    
     model.updateVertices(coords);  
     model.updateColors(colors);
     
     shader = new GLSLShader(this, "fishvert.glsl", "fishfrag.glsl");
}

void draw()
{
  GLGraphics renderer = (GLGraphics)g;
  renderer.beginGL();
  
  translate(width/2, height/2);

  background(160);
  if (mybool)
  {
    rotateY((float)r++/denominator);
    rotateX((float)r/denominator);
  }
  else
  {
    rotateY( (float)r/denominator - PI) ;
    rotateX( (float)r/denominator - PI) ;
  }
  shader.start(); // Enabling shader.
  
  model.render();
  
  shader.stop(); // Disabling shader.

  renderer.endGL();  
}

void keyPressed()
{
 if (key == ' ')
  saveFrame(); 
}

void mousePressed()
{
  mybool = !mybool;
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY12/DAY12.pde)*
