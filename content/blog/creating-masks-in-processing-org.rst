Creating Masks in Processing.org
################################
:date: 2010-11-17 09:11
:author: Admin
:category: Processing
:slug: 129 

A great tutorial on OffScreen graphics rendering on
`http://blog.blprnt.com/`_ made me want to release some code today. I
have been working on some offscreen graphics rendering to create masking
effects for an upcoming performance. Processing offers PImage and
PGraphics as objects that hold raw pixels or vector graphics. These are
kept somewhere in memory and not drawn to the screen unless you put them
there using `image()`_. This is much faster than drawing to the screen
in almost every instance.

Using the `blend()`_ command with the MULTIPLY option you can apply a
masking effect to your sketch. For the example below the mask is a
PGraphics object that contains a line which scrolls down the screen.
Since the background is set to black (or 0) when it is multiplied
against the image drawn on the screen it becomes black (because anything
times 0 is 0). If this example is working properly you should see a red
line move down the screen. This is because the image drawn to the screen
is just a red background.

--------------

.. raw:: html

    <script src="https://gist.github.com/drart/8419804.js"></script>


If you'd like to get fancy you can draw your image and mask offscreen
and then send the result to the screen. Here is a little code snippet to
get you started on your journey.

--------------

.. raw:: html

    <script src="https://gist.github.com/drart/8419817.js"></script>

.. _`http://blog.blprnt.com/`: http://blog.blprnt.com/
.. _image(): http://processing.org/reference/image_.html
.. _blend(): http://processing.org/reference/blend_.html
