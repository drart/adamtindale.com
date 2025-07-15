---
title: Day 11
date: 2010-09-12 04:15
author: Admin
category: Creative Pact 2010
---

Today was a bit of a bust. I tried writing some GLSL shaders using [GLGraphics](http://glgraphics.sourceforge.net) and didn't have much luck. I have been wanting to dig into the library for awhile but haven't had time, so today was the day. I was able to get some simple frag shaders going but blurs weren't working. I upgraded to the new version only to find new functionality came with a new API. The patch I made works but crashes after 10 seconds or so. When I have more time I will look further into the issue or post it on the forums but for now I just have a day to make something.
![Screenshot of software.](/img/blog/creative-pact-2010/glitch.gif)
```processing
import javax.media.opengl.*;
import processing.opengl.*;
import codeanticode.glgraphics.*;

GLSLShader shader;
GLModel myshape;

int r;

void setup()
{
    size(640, 480, GLConstants.GLGRAPHICS);

    shader = new GLSLShader(this, "toonvert.glsl", "Pixelate.glsl");
}

void draw()
{
    myshape = newmodel();
  GLGraphics renderer = (GLGraphics)g;
  renderer.beginGL();
  translate(width/2, height/2);
  
  background(180);

  rotateY((float)r/100);
  //shader.start(); // Enabling shader.
  //shader.setVecUniform("camera_pos", 0, 0, 0);
  
  renderer.model(myshape);
 //shader.stop(); // Disabling shader.
  renderer.endGL();  
}

void keyPressed()
{
 if (key == ' ')
  saveFrame(); 
}

void mousePressed()
{
  r++;
}

GLModel newmodel ( )
{
  ArrayList vertices = new ArrayList();
  //ArrayList normals = new ArrayList();
  for (int i = 0; i < 400; i++)
  {
    //strokeWeight(random(3));
    //line(random(width),random(height), random(width), random(height));
    vertices.add(new PVector(random(width)-width/2,random(height)-height/2, random(width)-width/2));
    //normals.add(new PVector(random(width)-width/2,random(height)-height/2, random(width)-width/2));
  }  
  GLModel model = new GLModel(this, vertices.size() , LINES, GLModel.DYNAMIC );
  model.updateVertices(vertices);  
  
  //model.initNormals();  
  //model.updateNormals(normals);  
  
  //model.initColors();
 // model.setColors(0,0,0,255);  
  
  return model;
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY11/DAY11.pde)*

```processing
GLModel createTorus(float outerRad, float innerRad, int numc, int numt, int r, int g, int b, int a, String texName) {
  GLModel model;  
  GLTexture tex;
  
  ArrayList vertices = new ArrayList();
  ArrayList normals = new ArrayList();  
  ArrayList texcoords = new ArrayList();
  
  float x, y, z, s, t, u, v;
  float nx, ny, nz;
  float a1, a2;
  int idx = 0;
  for (int i = 0; i < numc; i++) {
    for (int j = 0; j <= numt; j++) {
      for (int k = 1; k >= 0; k--) {
         s = (i + k) % numc + 0.5;
         t = j % numt;
         u = s / numc;
         v = t / numt;
         a1 = s * TWO_PI / numc;
         a2 = t * TWO_PI / numt;
         
         x = (outerRad + innerRad * cos(a1)) * cos(a2);
         y = (outerRad + innerRad * cos(a1)) * sin(a2);
         z = innerRad * sin(a1);
         
         nx = cos(a1) * cos(a2); 
         ny = cos(a1) * sin(a2);
         nz = sin(a1);
         
         vertices.add(new PVector(x, y, z));
         normals.add(new PVector(nx, ny, nz));         
         texcoords.add(new PVector(u, v));
      }
    }
  }
  
  model = new GLModel(this, vertices.size(), QUAD_STRIP, GLModel.STATIC);
  model.updateVertices(vertices);  
  
  if (texName != null && !texName.equals("")) {
    tex = new GLTexture(this, texName);
    model.initTextures(1);
    model.setTexture(0, tex);
    model.updateTexCoords(0, texcoords);
  }
  
  model.initNormals();
  model.updateNormals(normals);  

  model.initColors();
  model.setColors(r, g, b, a);

  return model;  
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY11/Torus.pde)*
