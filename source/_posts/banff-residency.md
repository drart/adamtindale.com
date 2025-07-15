---
title: Banff Residency
date: 2010-08-02 23:48
author: Admin
category: Uncategorized
---

I am on a Residency with Jordan Tate in Banff to work on my visual competency and I am teaching Jordan about programming and digital media.
Jordan's first assignment is to make 10 animated gifs in response to other work. Here is part one. This is called 4'33\". I recently saw Rauschenberg's \"White Paintings\" at SFMOMA and I was really taken. I love minimalism. I found out through some reading that Cage didn't really go for the full 4'33\" until he saw these. I like black so I made a black animated gif with various degrees of black. I did this because Cage discovered that you can't ever experience silence, there is always some noise and jitter.
------------------------------------------------------------------------
![animated gif](/img/blog/2010/08/export.gif)
```processing
// TITLE: 4'33"
// Adam Tindale 2010
// http://www.emvergeoning.com/?p=1095

import gifAnimation.*;

GifMaker gifExport;
PImage mygif;

color[] c = new color [3];
int i = 0;

void setup(){ 
 gifExport = new GifMaker(this, "export.gif");
 gifExport.setRepeat(0);
 
 c[0] =  color(0);
 c[1] =  color(3);
 c[2] =  color(5); 
}

void draw(){
 background(c[i]);

 gifExport.setDelay(1);
 gifExport.addFrame();
 
 if (i == 2){
  gifExport.finish(); 
  exit();
 }
  i = ++i % 3;
}
```

*[View this code on GitHub](https://gist.github.com/drart/8461032)*
