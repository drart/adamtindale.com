---
title: Day 1
date: 2010-09-02 02:32
author: Admin
category: Creative Pact 2010
---

My first sketch is a simple Lissajous curve out of a live audio input. I borrowed some code from a Minim example and a [sketch](http://www.openprocessing.org/visuals/?visualID=6656) from [OpenProcessing.org](http://www.openprocessing.org/).
I used the RMS values from the audio buffer to determine the sound and location of each plot. These changes aren't radical but they add some flavour. Enjoy!
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0037.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-0176.jpg)
```processing
import ddf.minim.*;
import processing.video.*;

Minim minim;
AudioInput input;
WaveformRenderer waveform;

MovieMaker mm;

void setup()
{
  size(640, 480, P2D);
  frameRate(24);
  
  minim = new Minim(this);
  input = minim.getLineIn(Minim.STEREO, 512);
  waveform = new WaveformRenderer();
  input.addListener(waveform);

  mm = new MovieMaker(this, width, height, "mysketchoutput.mov", 24, MovieMaker.H263, MovieMaker.HIGH);
}

void draw()
{
  //background(0);
  fill(0,20);
  noStroke();
  rect(0,0,width,height);
  // see waveform.pde for an explanation of how this works
  waveform.draw();
  mm.addFrame();
}

void stop()
{
  // always close Minim audio classes when you are done with them
  input.close();
  // always stop Minim before exiting.
  minim.stop();
  super.stop();
   mm.finish();
}

void captureEvent(Capture myCapture) {
  myCapture.read();
}

class WaveformRenderer implements AudioListener
{
  private float[] left;
  private float[] right;
  
  color a = color (38,148,200);
  color b = color(200,148,38);
  
  WaveformRenderer()
  {
    left = null; 
    right = null;
  }
  
  synchronized void samples(float[] samp)
  {
    left = samp;
  }
  
  synchronized void samples(float[] sampL, float[] sampR)
  {
    left = sampL;
    right = sampR;
  }
  
  synchronized void draw()
  {
    if ( left != null && right != null )
    {
      noFill();

      float rms = 0;
      for (int i = 0 ; i < left.length; i++)
        rms += left[i];
      rms *= rms;
      //rms /= left.length;
      
      fill(lerpColor(a,b,rms*255));
  
      beginShape();
      for (int step=0;step<left.length;step++) {

             float l = 5-step;  
             int x=(int) (left[step]*l*Math.sin(l*Math.PI/left.length));
             int y=(int) (left[step]*l*Math.cos(l*Math.PI/left.length));
             vertex ( width/4 + x + rms, height/2 + y);
      }
      endShape();

      beginShape();
      for (int step=0;step<right.length;step++) {
             float l = 5-step;  
             int x=(int) (right[step]*l*Math.sin(l*Math.PI/right.length));
             int y=(int) (right[step]*l*Math.cos(l*Math.PI/right.length));
             vertex ( 0.75*width + x - rms, height/2 + y);
      }
      endShape();
    }
  }
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY1/DAY1.pde)*

```processing


/*
// copy to setup() to activate
 mm = new MovieMaker(this, width, height, "mysketchoutput.mov",
                       frameRate, MovieMaker.H263, MovieMaker.HIGH);
// copy to the end of draw()
mm.addFrame();
*/


void mouseReleased(){
   println(frameRate);
}

void keyPressed(){
 if(key == ' ')
  saveFrame();

 if (key == 'f')
  println(frameRate); 

 if(key == 's' & mm != null)
    mm.finish();
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY1/utils.pde)*
