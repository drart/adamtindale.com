---
title: Day 4
date: 2010-09-04 21:09
author: Admin
category: Creative Pact 2010
---

This one has been in the works for awhile. I have been looking at the minim BETA for a few days and now I feel like I am getting my head around it. Today I made my first UGen. I think I am going to submit it to the distribution. It is a byte swapping algorithm inspired by swap\~ in zexy for PD. This is one of my favourite distortions. Very loud and very nasty. You've been warned.

Today I also finally delved into Processing's method for exporting applets. So, I am not going to dump a whole lot of code in this post. If you want to see the code follow the links below.
The audio display is rendered as points. This is inspired by something I saw at MUTEK this year and is also the flavour of the visual material for Frank Bretschneider's EXP. <http://www.frankbretschneider.de/Web-Site/exp.html>

![Screenshot of software.](/img/blog/creative-pact-2010/screen-0589.jpg)
![Screenshot of software.](/img/blog/creative-pact-2010/screen-1116.jpg)

------------------------------------------------------------------------
```processing
/**
* Adam R. Tindale <br>
* <a href="http://www.adamtindale.com">www.adamtindale.com</a> <br>
* September 4, 2010 <br>
* <a href="http://www.inclusiveimprov.co.uk/doku.php/events:creativepact_2010">Creative Pact 2010</a><br>
*
* <p> 
* Experiment with MINIM. Uses UGen API and the AudioListener. DrawWave is a simple class that uses
* rect() like sytax to display a waveform in an area. Swap is a user space UGen that does simple
* byte swapping, one of my favourite effects from zexy in PD.
* </p>
*/

import ddf.minim.*;
import ddf.minim.ugens.*;

Minim minim;
LiveInput in;
AudioOutput out;
Swap fx1;
DrawWave renderer;

void setup(){
  size(400, 200);
  smooth();
  
  minim = new Minim(this);
  out = minim.getLineOut();
  in = new LiveInput( minim.getInputStream(out.getFormat().getChannels(), out.bufferSize(), out.sampleRate(), out.getFormat().getSampleSizeInBits()) ); 
  fx1 = new Swap();
  in.patch(fx1).patch(out);
 
  renderer = new DrawWave(0,0, width, height);
  out.addListener(renderer);
}

void draw(){
  noStroke();
  fill(0, 40);
  rect(0,0,width,height);
  renderer.draw();
}

void keyPressed(){
  if (key == ' ')
    saveFrame();
}

void stop()
{
  in.close();
  out.close();
  minim.stop();
  super.stop();
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY4/DAY4.pde)*

```processing
//package ddf.minim.ugens; // to make into java object for inclusion in new minim

/** A UGen for byte swapping audio signals. Inspired by swap~ from 
 * Johannes M Zmoelnig's Zexy library for PureData. DANGER LOUD!
 * <p>
 * 
 * @author art
 */
// 
public class Swap extends UGen{

  public UGenInput audio;

  Swap()
  {
    audio = new UGenInput(InputType.AUDIO);
  }

  @Override
  protected void uGenerate (float[] channels)
  {
    if ( audio.isPatched() )
    {

      for (int i = 0; i < channels.length; i++){     
        // convert float to short 2^15       
        short temp = (short)( audio.getLastValues()[i] * 32768.);

        // byte swap
        int b1 = temp & 0xff;
        int b2 = (temp >> 8) & 0xff;
        temp = (short)(b1 << 8 | b2 << 0);

        // convert short back to a float
        channels[i] = temp * (1. / 32768.);
      } 
    }  
  }
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY4/Swap.pde)*

```processing
class DrawWave implements AudioListener
{
  private float[] left;
  private float[] right;
  private int x;
  private int y;
  private int width;
  private int height;
  private color c;
  private color bg;
  private boolean drawbackground;
  
  DrawWave(int xx, int yy, int ww, int hh)
  {
    left = null; 
    right = null;
    
    this.x = xx;
    this.y = yy;
    this.width = ww;
    this.height = hh;
    
    c = color (255);
    bg = color (30, 189, 210);
    drawbackground = false;
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
      // playing nice by localizing style    
      pushStyle();
      stroke(c);
      
      if (drawbackground)
      {
        fill (bg);
        rect(this.x, this.y, this.width-1, this.height);
      }
      noFill();
       
      float inc = (float)this.width / left.length;
      
      float quarterheight = this.height / 4;
      float threequarterheight = quarterheight * 3;
  
      beginShape(POINTS);
      for (int step=0;step<left.length;step++) {
             vertex ( (inc*step) + this.x, left[step]* quarterheight + this.y + quarterheight);
      }
      endShape();

      beginShape(POINTS);
      for (int step=0;step<right.length;step++) {
             vertex ( (inc*step) + this.x, right[step]* quarterheight + this.y + threequarterheight);
      }
      endShape();
      
      popStyle();
    }    
  }
  
  /// setter methods
  public void setColour(color cc)
  {
     c = cc; 
  }
  
  public void background(boolean b)
  {
     drawbackground = b; 
  }
  
  public void setBackgroundColour(color cc)
  {
    bg = cc;
  }
}
```

*[View this code on GitHub](https://github.com/drart/CREATIVEPACT/blob/master/DAY4/DrawWave.pde)*
