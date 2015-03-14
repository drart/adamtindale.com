Day 8
#####
:date: 2010-09-09 03:28
:author: Admin
:category: Creative Pact 2010

Another audio analysis simple patch for today. I looked into the
BeatDetect object in MINIM and found that yesterday's code could be done
even simpler by using the built in detector. It isn't very good but it
works. I didn't do much tweaking on it but I bet with some massaging I
could get it to detect my signals a little bit better.

So today's patch is a bit of a homage to `Dan Shiffman's space junk
patch`_. The patch has three magic lines that make it look great. The
last three valid lines are rotatings in x,y,z. What makes it special is
that those lines are repeated multiple times in each frame and a
translate is performed afterwards with no pushMatrix() or popMatrix().
So the reference is moved about the sketch multiple times so that there
is some interesting placement of objects about the space.

This patch uses the detected volume and onset information to draw a set
of shapes around the screen with varying rotation based upon the
detected parameters. On my machine the frames show up for a very short
amount of time and often aren't drawn fully so it looks quite glitchy
and nice. When I render it out to screenshots the image is preserved.
Try squinting and covering half the image in a weird way and you will
see what I see when it is running, or run the code yourself.


.. image:: /img/blog/creative-pact-2010/screen-0707.jpg
    :alt: Screenshot of software.

.. image:: /img/blog/creative-pact-2010/screen-5458.jpg
    :alt: Screenshot of software.

--------------

.. raw:: html

    <script src="http://gist-it.appspot.com/github/drart/CREATIVEPACT/blob/master/DAY8/DAY8.pde"></script>


.. _Dan Shiffman's space junk patch: http://processing.org/learning/library/spacejunk.html

