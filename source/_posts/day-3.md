---
title: Day 3
date: 2010-09-03 20:24
author: Admin
category: Creative Pact 2010
---

Today was a challenge. I downloaded the BETA of MINIM so that I could try the new UGEN api. It is interesting but not fully featured yet. I saw a Granulator in there and I got excited. I wasn't able to make any good sounds and I ran into some troubles with controlP5 and MINIM where they both had Controller classes and Events.
There is a crazy solution where the name of a controlP5 object can be declared as a global and the slider will update the global. I have to look further into why this works but it certainly minimizes the amount of code I have to write to make a basic GUI.
This example does a simple mapping of the BitCrush UGEN with a slider. It also has a display for the audio output. I would love to have access to the audio input too. More work to be done. I am learning a lot here.
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0109.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0731.jpg)

------------------------------------------------------------------------

```processing
import ddf.minim.AudioOutput;
import ddf.minim.Minim;
import ddf.minim.ugens.*;
import controlP5.*;

ControlP5 controlP5;
Slider glmin, glmax, gfmin, gfmax, gsmin, gsmax;
public float grainLengthMin, grainLengthMax, grainFadeMin, grainFadeMax, grainSpaceMin, grainSpaceMax;

Minim minim;
LiveInput in;
AudioOutput out;
Constant controls[] = new Constant[6];
GranulateRandom fx1 = new GranulateRandom();

void setup(){
  size(500, 400);
  minim = new Minim(this);
  out = minim.getLineOut();
  in = new LiveInput( minim.getInputStream(out.getFormat().getChannels(), out.bufferSize(), out.sampleRate(), out.getFormat().getSampleSizeInBits()) ); 
  
  controlP5 = new ControlP5(this);
  glmin = controlP5.addSlider("grainLengthMin",1,100,  15,height/3-80 , width-100,30);
  glmax = controlP5.addSlider("grainLengthMax",101,500,  15,height/3-40,  width-100,30);
  gsmin = controlP5.addSlider("grainSpaceMin", 0,10,  15,height/3  ,   width-100,30);
  gsmax = controlP5.addSlider("grainSpaceMax", 11,500,  15,height/3+40,  width-100,30);
  gfmin = controlP5.addSlider("grainFadeMin",  1,10,  15,height/3+80,  width-100,30);
  gfmax = controlP5.addSlider("grainFadeMax",  11,50,  15,height/3+120, width-100,30);
  
  glmin.setValue(4);
  glmax.setValue(400);
  gsmin.setValue(10);
  gsmax.setValue(40);
  gfmin.setValue(3);
  gfmax.setValue(40);
 
 
 for (int i = 0; i < controls.length; i++)
    controls[i] = new Constant(); 

 controls[0].patch (fx1.grainLenMin); 
 controls[1].patch (fx1.grainLenMax); 
 controls[2].patch (fx1.fadeLenMin); 
 controls[3].patch (fx1.fadeLenMax); 
 controls[4].patch (fx1.spaceLenMin); 
 controls[5].patch (fx1.spaceLenMax);  
 
 controls[0].setConstant (grainLengthMin); 
 controls[1].setConstant (grainLengthMax); 
 controls[2].setConstant (grainFadeMin); 
 controls[3].setConstant (grainFadeMax); 
 controls[4].setConstant (grainSpaceMin); 
 controls[5].setConstant (grainSpaceMax);  
 
 in.patch(fx1).patch(out);
}

void draw(){
  background(50);
  stroke( 255 );
  
 controls[0].setConstant (grainLengthMin); 
 controls[1].setConstant (grainLengthMax); 
 controls[2].setConstant (grainFadeMin); 
 controls[3].setConstant (grainFadeMax); 
 controls[4].setConstant (grainSpaceMin); 
 controls[5].setConstant (grainSpaceMax);  
  
  
  for( int i = 0; i < out.bufferSize() - 1; i++ )
  {
    float x1  =  map( i, 0, out.bufferSize(), 0, width );
    float x2  =  map( i+1, 0, out.bufferSize(), 0, width );
    line( x1, height*.75 + out.left.get(i)*50, x2, height*.75 + out.left.get(i+1)*50);
    line( x1, height*.75 + 50 + out.right.get(i)*50, x2, height*.75 + 50 + out.right.get(i+1)*50);
  }  
  controlP5.draw(); 
}

void stop()
{
  in.close();
  out.close();
  minim.stop();
  super.stop();
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY3/DAY3.pde)*
