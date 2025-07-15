---
title: Day 13 
date: 2010-09-14 02:14
author: Admin
category: Creative Pact 2010
---

Today I am working with a visual idea that I want to turn into music. I have a blurry scene where the action moves up and a sine wave moves down. It is a start.
I am using a stack blur from [quasimondo](http://incubator.quasimondo.com/processing/stackblur.pde). It is super fast and it looks ok. Not quite as pleasurable as a gaussian but way faster. I also got bit on a pointer reference thing when converting a PGraphics to a PImage. Be careful! PGraphics is a subclass of PImage and you can assign one to the other thanks to inheritance but to copy the actual image from one to the other you have to use the get() method  and then things will behave like you expect. Thanks to the [javadocs](http://processing.googlecode.com/svn/trunk/processing/build/javadoc/core/index.html) for Processing.
I have linked code at the bottom.
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0203.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0241.jpg)
------------------------------------------------------------------------
```processing
import javax.media.opengl.*;
import processing.opengl.*;
import ddf.minim.*;
import ddf.minim.signals.*;

Minim minim;
AudioOutput out;
SineWave sine;

PGraphics graph;
PImage img;
int r;
boolean mybool;
float[] points;
int x;
void setup()
{
  size(720,480,P2D); 
  
  graph = createGraphics(720,480,P2D);
  img = createImage(720,480, RGB);
  
  points = new float[400];  
  for ( int i = 0 ; i < 100; i++)  
  {
    points[i] = width/2 + random(-width/2, width/2) ; 
    points[i+100] = height/2 + random(-height/2, height/2) ;
    points[i+200] = width/2 + random(-width/2, width/2) ; 
    points[i+300] = height/2 + random(-height/2, height/2) ;  
  }
  
  smooth();
  
 
  
 minim = new Minim(this);
 out = minim.getLineOut(Minim.STEREO);
 sine = new SineWave(440, 0.5, out.sampleRate());
 sine.portamento(200); 
 out.addSignal(sine);
}

void draw()
{
  graph.beginDraw();
  graph.background(0);
  graph.noStroke();
  graph.fill(255);
  
  graph.rect(0,0,width,height/2 + x--);
  
  for (int i = 0; i < points.length ; i++)
     points[i] += random(-2,2);
  
  graph.stroke(255);
  graph.strokeWeight(1.4);
  
  for ( int i = 0 ; i < 100; i++)  
    graph.line( points[i] , points[i+100], points[i+200], points[i+300] );
    
  graph.endDraw();
  
  img = graph.get();

  fastBlur(img, 10);
  img.filter(POSTERIZE,3);
  fastBlur(img,4);
  image(img,0,0);
  
  sine.setFreq(440 + x);

}

void keyPressed()
{
  if (key == ' ')
    saveFrame();
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY13/DAY13.pde)*

```processing
// Stack Blur v1.0
//
// Author: Mario Klingemann <mario@quasimondo.com>
// http://incubator.quasimondo.com

void fastBlur(PImage img, int radius){
  if (radius<1){
    return;
  }
  int w=img.width;
  int h=img.height;
  int wm=w-1;
  int hm=h-1;
  int wh=w*h;
  int div=radius+radius+1;
  int a[]=new int[wh]; // i've added this
  int r[]=new int[wh];
  int g[]=new int[wh];
  int b[]=new int[wh];
  int asum,rsum,gsum,bsum,x,y,i,p,p1,p2,yp,yi,yw; // and the asum here
  int vmin[] = new int[max(w,h)];
  int vmax[] = new int[max(w,h)];
  int[] pix=img.pixels;
  int dv[]=new int[256*div];
  for (i=0;i<256*div;i++){
     dv[i]=(i/div);
  }

  yw=yi=0;

  for (y=0;y<h;y++){
    asum=rsum=gsum=bsum=0; // asum
    for(i=-radius;i<=radius;i++){
	p=pix[yi+min(wm,max(i,0))];
	asum+=(p>>24) & 0xff;
	rsum+=(p & 0xff0000)>>16;
	gsum+=(p & 0x00ff00)>>8;
	bsum+= p & 0x0000ff;
    }
    for (x=0;x<w;x++){
	a[yi]=dv[asum];
	r[yi]=dv[rsum];
	g[yi]=dv[gsum];
	b[yi]=dv[bsum];

	if(y==0){
	  vmin[x]=min(x+radius+1,wm);
	  vmax[x]=max(x-radius,0);
	} 
	p1=pix[yw+vmin[x]];
	p2=pix[yw+vmax[x]];
	
	asum+=((p1>>24) & 0xff)-((p2>>24) & 0xff); // asum
	rsum+=((p1 & 0xff0000)-(p2 & 0xff0000))>>16;
	gsum+=((p1 & 0x00ff00)-(p2 & 0x00ff00))>>8;
	bsum+= (p1 & 0x0000ff)-(p2 & 0x0000ff);
	yi++;
    }
    yw+=w;
  }

  for (x=0;x<w;x++){
    asum=rsum=gsum=bsum=0;
    yp=-radius*w;
    for(i=-radius;i<=radius;i++){
	yi=max(0,yp)+x;
	asum+=a[yi]; // asum
	rsum+=r[yi];
	gsum+=g[yi];
	bsum+=b[yi];
	yp+=w;
    }
    yi=x;
    for (y=0;y<h;y++){
	pix[yi] = (dv[asum]<<24) | (dv[rsum]<<16) | (dv[gsum]<<8) | dv[bsum]; 
	if(x==0){
	  vmin[y]=min(y+radius+1,hm)*w;
	  vmax[y]=max(y-radius,0)*w;
	} 
	p1=x+vmin[y];
	p2=x+vmax[y];
	
	asum+=a[p1]-a[p2]; // asum
	rsum+=r[p1]-r[p2];
	gsum+=g[p1]-g[p2];
	bsum+=b[p1]-b[p2];

	yi+=w;
    }
  }
} 
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY13/StackBlur.pde)*
