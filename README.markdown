# My Website Redesign 2011

Built with hyde, html5, css, javascript, vim, bash, and probably some other tools.

## Inspiration/Attributions
- <http://danielmiessler.com/study/git>  
- <http://lesscss.org>  
- <http://jinja.pocoo.org>  
- <http://gist-it.appspot.com>
- <http://www.cssplay.co.uk>
- <http://www.organicgrid.com/#/home>


## Other stuff
- Imagemagick is used for image conversion to thumbnails

Example. 
    %> convert adamtindale.jpg resize '560' -quality 70% th_adamtindale.jpg

## Favicon Code

The favicon is made with Processing. 

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

    // %> mv favicon.png favicon.ico

