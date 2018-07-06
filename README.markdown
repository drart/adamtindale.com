# My Website Redesign 2014 - Now

My website is built with a makefile. Isn't yours?

Built with pelican, html5, css, javascript, vim, bash, rsync, jquery, git and probably some other tools.

## Inspiration/Attributions
- <http://danielmiessler.com/study/git>  
- <http://lesscss.org>  
- <http://jinja.pocoo.org>  
- <http://www.cssplay.co.uk>

## TODO ##

- Better code embed in blog (migrate from gist-it)
    -  gist-directive. investigate style options
- migrate to simple-animation theme
- better navigation and project listing
- better listing to experiments (flocking directory?)
- https://github.com/lepture/github-cards
- pelican-page-hierarchy
- auto-page plugin?
- page-order plugin

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


## Notes to self

- installing virtualenv
``` shell 
    %> virtualenv venv
    %> source venv/bin/activate
    %> pip install pelican markdown
    %> deactivate 
```
