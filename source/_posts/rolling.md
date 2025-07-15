---
title: Rolling
date: 2010-08-03 04:25
author: Admin
category: Processing
---

![animated gif](/img/blog/2010/08/blackorwhite.gif)
------------------------------------------------------------------------
::: gist
```processing
// TITLE: Rolling
// Adam Tindale 2010

int count = 0;
import gifAnimation.*;

GifMaker gifExport;
void setup(){
  
    
  gifExport = new GifMaker(this, "blackorwhite.gif");
  gifExport.setRepeat(0);
 
 frameRate(5);
 noStroke(); 
}

void draw(){
  background(0);
  
  rect(((count-10)/10.0) * width,0, width, height);
  
 gifExport.setDelay(5);
 gifExport.addFrame();
 
 if (count == 19){
  gifExport.finish(); 
  exit();
 }
  
  
  count = ++count % 20;
}
```

*[View this code on GitHub](https://gist.github.com/drart/8461515)*
