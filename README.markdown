# My Website Redesign 2014

Built with pelican, html5, css, javascript, vim, bash, jquery, git and probably some other tools.

## Inspiration/Attributions
- <http://danielmiessler.com/study/git>  
- <http://lesscss.org>  
- <http://jinja.pocoo.org>  
- <http://www.cssplay.co.uk>

## TODO ##

- Better code embed in blog
    - Code Include plugin
    - ~~pelican gist plugin~~
    - github activity plugin instead of javascript method?
    - maybe add code as submodules?
- http://css-tricks.com/persistent-headers/ -- do this kind of thing with the footer
- check out ical or events plugin for managing events? 
- check out pelican-youtube for a more consistent way embedding links

## Favicon Code

The favicon is made with Processing. 

``` Processing
    size(32, 32);
    smooth();
    background(0);
    strokeWeight(2);
    stroke(255);
    line(width/2, height/2, width*.75, height);
    line(width/2, height/2, width*0.25, height);
    noFill();
    ellipse(width/2, height/2, width*0.6, height*0.6);
    save("favicon.png");
``` 
``` shell 
     %> mv favicon.png favicon.ico
```

<https://gist.github.com/drart/1344171>
