---
title: Processing Workshop
description: |
  Processing workshop for the University of Cincinnati
permalink:  uc/index.html
---

# Reference Books and Websites

-   [Processing website](http://www.processing.org)
-   [Learning Processing by Dan Shiffman](http://learningprocessing.org)
-   [Getting Started with Processing by Casey Reas and Ben
    Fry](http://www.amazon.com/gp/product/144937980X?ie=UTF8&tag=processing09-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=144937980X)
-   [Processing by Casey Reas and Ben
    Fry](http://www.amazon.com/gp/product/0262182629?ie=UTF8&tag=processing09-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0262182629)

# Workshop Overview

-   Make it work
-   Make it right
-   Make it fast
-   Make it fun

## Make it work

-   size()
-   rect()
-   point()
-   ellipse()
-   line()
-   triangle()
-   color()
-   fill()
-   stroke()
-   noStroke()
-   noFill()
-   background()
-   save()

The first thing we need to do is get acquainted with the language of
computers. Often this is referred to as syntax. We need to figure out
how to talk to computers. You know how to walk, right?

# Assignment 1

Play [QWOP](http://www.foddy.net/Athletics.html).

Not so simple. You have to figure out how to issue commands in the way
the receiver needs them. This is computer programming. It is a little
different, however artists are uniquely equipped to deal with
intermediate and complex programming tasks, we just have to learn to
walk first.

# First \"Steps\"

[Getting Started with
Processing](http://processing.org/learning/gettingstarted/) [Learning
Processing Overview](http://processing.org/learning/overview/)

Processing starts out with a blank page. This is not your canvas. The
blank canvas for you to fill is the final display window. Your job is to
put commands in the programming window that tell Processing how it
should fill the display window.

# Assignment 2

[Coordinate System and Shapes](http://processing.org/learning/drawing/)

*Make a picture using primitive commands only.*

# Assignment 3

*Add colour to your picture.*

Processing has two basic ideas: fill and stroke. Fill is the fill colour
for your shape (if it has an interior area) and stroke, which is the
outline colour of the shape. You can remove the fill or stroke from your
shape by using
[noStroke](u=http://www.processing.org/reference/noStroke_.html) or
[noFill](https://www.processing.org/reference/noFill_.html).

## Make it Right

-   class
-   methods
-   functions
-   comments
-   setup()
-   draw()
-   int
-   float
-   width
-   height
-   rectMode()
-   ellipseMode()
-   random()
-   frameRate()
-   mouseX
-   mouseY
-   mousePressed

# A good habit

Commenting. Do it. Leave yourself notes. Breadcrumbs. It\'s easy. Do it.
Future you will appreciate it.

```processing
/* multi 
        line
            comment*/
// single line comment. 
background(123);// I chose this colour to match my shirt
```
# Animating

Processing makes creating animations very simple. What we need to do is
set up our environment and then for every frame of our animation we need
to do something. Processing provides us two functions to fill in that it
will call when running our sketch: setup() and draw(). Guess which does
which?

These functions need the keyword *void* in front of them. This is a
byproduct of Java. It isn\'t necessary to understand this yet but you do
need to make sure it is included.

In this example we use the
[random()](http://processing.org/reference/random_.html) function to
give us a random number to place the rect() and to give it a size.

```processing
void setup()
{
    // do your setup here
    size( 720, 480);
}

void draw()
{
    // do your drawing here
    rect( random(width), random(height), random(300), random(400) );
}
```
# Assignment 4

*Make a simple animation and use the frameRate() function to change the
framerate.*

# Interaction

Processing makes it very easy to interact with the mouse and keyboard.
The *mousePressed* keyword will let us know if the mouse is being
pressed during the current frame.

In this example we will draw a rectangle in the middle of sketch if the
mouse is being pressed.

```processing
if (mousePressed)
    rect(width/2,height/2,100,100);
```
The *mouseX* and *mouseY* keywords return the x and y position of the
mouse during the current frame. We can make a sketch which follows the
mouse quite easily.

```processing
rectMode(CENTER); // otherwise the mouse will be in the top corner of the rect
rect(mouseX,mouseY,100,100);
```
# Assignment 5

*Move your drawing with the mouse.*

# Object Orient Programming

[Down with OOP](http://processing.org/learning/objects/)

Object oriented programming is a cornerstone of modern programming. What
we do is abstract our code so that is a general solution to our problem.
This allows us to reuse it over and over again. This also helps separate
solution from the implementation. We can write an object that knows how
to do something and then write a sketch that uses that object to do that
thing.

We do this using the *class* keyword. We write a class to contain our
code and it will store some properties and give us methods to access
those. Properties are internal variables that we shouldn\'t touch.

```processing

class mything
{
    int xposition;
    int yposition;
    int mysize;
    mything(float x, float y, float s)
    {
       xposition = x; 
       yposition = y;
       mysize = s;
    }
    public void draw()
    {
        rect(xposition, yposition, mysize, mysize);
    }
}


mything thing = new mything(width/2, height/2, 100);
thing.draw();
```
# Assignment 6

*Put your drawing into an class.*

# Self Study

-   translate()
-   rotate()
-   pushMatrix()
-   popMatrix()

## Make it Fast

-   OPENGL
-   PGraphics
-   PImage
-   MovieMaker

# Rendering Modes + OPENGL

OPENGL is short for the Open Graphics Language. It is a shared format
for talking to graphics cards in their native format: polygons. If your
sketch uses mostly shapes you will likely benefit from using OPENGL to
render your sketch. This will make it much faster and tax your machine
less.

First we will need to import the OPENGL library into our sketch and then
we will need to tell Processing to use it instead of the default
renderer. Processing has made the second part very simple with the
size() function. All we have to do is add one more argument that is the
name of the renderer we\'d like to use.

```processing
import processing.opengl.*;
size( 100,100, OPENGL);
```
# Offscreen Rendering

[Jer Thorp
Tutorial](http://blog.blprnt.com/blog/blprnt/processing-tip-rendering-large-amounts-of-text-fast)

When you call a drawing command Processing renders it to the screen then
carries on. This can take some time for each command. If you have
thousands, or tens of thousands, of things being drawn to the screen the
framerate can slow down. What we can do is render the whole scene in
memory and the output the resulting scene to the screen. We can do this
by using a PGraphics object. It requires a little extra typing but we
gain a lot of speed.

```processing
Pgraphics offscreen = createGraphics(width,height); // like loadImage. We'll see that later.
offscreen.beginDraw();
offscreen.background(100); // grey backgroun
// do some more drawing in here
offscreen.endDraw();
```
# Output to a video

We can collect frames of our drawing into a video. This can be very
useful when your sketch can\'t run at full framerate and doesn\'t
require any interaction. You can record the output and then show that.

The following sketch records the first 60 frames and then closes the
resulting video file. The file must be closed or your computer will not
know where the file ends and your music collection begins (ie.
possibility of disaster)

```processing
import processing.video.*;
MovieMaker mm;  // Declare MovieMaker object

void setup() 
{
  // Do your setup

  // Create MovieMaker object with size, filename,
  // compression codec and quality, framerate
  mm = new MovieMaker(this, width, height, "drawing.mov");
}

void draw() 
{
  // Do your drawing
  if ( frameCount < 60 )
  {
      mm.addFrame();  // Add window's pixels to movie
                  // This is best to do at the end of the draw() function
  } 
  else
  {
    if ( frameCount == 60) 
      mm.finish();  // Finish the movie at frame 60 
                    // We don't want to finish it multiple times
  }
}
```
# Assignment 7

*Output a video file of one of your sketches.*

## Make it Fun

-   filter()
-   for
-   if
-   data folder

# Filters

Ghosting example.

```processing
void setup()
{
    /// other setup
    background(0); // put this here to avoid a flash on the first frame
}

void draw()
{
    noStroke();
    fill(0, 5);
    rect(0,0,width,height); // assumes rectMode(CORNER) which is default    
    // do your drawing here
}
```
In the following example we can apply filters to our whole sketch or we
can apply them to offscreen buffers stored in PImages.

```processing
PImage myimage = loadImage("test.jpg");
// some drawing
rect(width/2, height/2, 100,100);
filter(BLUR, 4); // blurs all drawing to this point
myimage.filter(BLUR,4); // blurs our image
image(myimage, width/2, height/2); // puts our blurred image onscreen
```
# Make lots of them

[Arrays](http://processing.org/reference/Array.html)

[Two-Dimensional Arrays](http://processing.org/learning/2darray/)

*for* loops are staples of programming. We can harness the computer\'s
ability to do many things without complaining (unlike humans). In our
structure we have to define a variable to keep track of how many times
we do something, we give a condition to end our loop, and then we define
how we step through it.

In this example we have our variable *i*, which is very common, that
will start at zero and then increment to the width of our sketch. We can
access our variable inside of our loop to do a different task for each
step of the loop.

```processing
for( int i = 0; i < width; i = i + 1)
    rect(i,i, 10, 10);
```
The final statement in the for definition is often changed to *i++*
which means that the variable *i* is to be incremented by one after it
is read. This will increment *i* until such a time that it gets be
bigger than *width* and then the loop will end. So, if our sketch is 720
pixels wide then we will draw 720 rectangles diagonally along our
canvas.

```processing
for( int i = 0; i < width; i++ )
    rect(i,i, 10, 10);
```
# Keeping Track of Lots of Them

You want to have a thousand things. You could make a thousand variables.
It would work but it would not be fun.

Arrays are the solution. These give you one variable name that
references multiples. To use these with objects we have to do a little
bit of work. Let\'s use our *mything* object.

```processing
mything[] things = new mything[100]; // asks for 100 mything objects

void setup()
{
    size(720,480);
    for ( int i = 0 ; i < things.length; i++)
        things[i] = new mything( (int)random(width), (int)random(height), (int)random(150) ); 
        // cast the random floats to ints
}

void draw()
{
  background(0);
  for ( int i = 0 ; i < things.length; i++)
      things[i].draw();
}

```
# What if?

So want something to happen only if something else is a certain way. You
need an *if* statement. *if* will evaluate a statement and run a block
of code if it evaluates true.

```processing
if (18 > 5) 
{
    println("True!");
}
```
What if we want to run a different block of code if the evaluation is
false? We us an *else* statement for this. In the following example the
first block of code will run if the mouse is more than halfway across
the screen.

```processing
if (mouseX > width/2)
{
    rect(0,0, 100,100);
}
else
{
    ellipse(0,0,100,100);
}
```
# Loading images

Processing makes this very simple. First we have to locate our sktech
folder on our hard drive. This is done by pressing apple or command K.
You can also access this under the Sketch menu in Processing. Now we
need to create a data folder. Anything you put in there will be found by
your sketch.

Let\'s imagine that we have an image there called \"test.jpg\" and we
want to load it into our sketch and held by a PImage object.

```processing
PImage myimage = loadImage("test.jpg");
```
That\'s it. Seriously. Thanks Processing Dudes!

*Detail* Normally when load classes we have to use the new keyword. In
this case loadImage is a special function that looks for files, loads
them, and then returns a new PImage object. The function deals with
creating our new object inside of itself.

# Other stuff

-   [Anatomy of a Program](http://processing.org/learning/anatomy/).
    Excellent overview of development process and tutorial on making
    arbitrary shapes.
-   [Drawing Curves](http://processing.org/learning/curves/)
-   [PVector](http://processing.org/learning/pvector/)
