Day 13 
#######
:date: 2010-09-14 02:14
:author: Admin
:category: Creative Pact 2010

Today I am working with a visual idea that I want to turn into music. I
have a blurry scene where the action moves up and a sine wave moves
down. It is a start.

I am using a stack blur from `quasimondo`_. It is super fast and it
looks ok. Not quite as pleasurable as a gaussian but way faster. I also
got bit on a pointer reference thing when converting a PGraphics to a
PImage. Be careful! PGraphics is a subclass of PImage and you can assign
one to the other thanks to inheritance but to copy the actual image from
one to the other you have to use the get() method  and then things will
behave like you expect. Thanks to the `javadocs`_ for Processing.

I have linked code at the bottom.

.. image:: /img/blog/creative-pact-2010/screen-0203.jpg
.. image:: /img/blog/creative-pact-2010/screen-0241.jpg

--------------

.. raw:: html

    <script src="http://gist-it.appspot.com/github/drart/CREATIVEPACT/blob/master/DAY13/DAY13.pde"></script>
    <script src="http://gist-it.appspot.com/github/drart/CREATIVEPACT/blob/master/DAY13/StackBlur.pde"></script>

Code here:

`http://www.adamtindale.com/code/processing/creativepact2010/DAY13/`_

.. _quasimondo: http://incubator.quasimondo.com/processing/stackblur.pde
.. _javadocs: http://processing.googlecode.com/svn/trunk/processing/build/javadoc/core/index.html
.. _`http://www.adamtindale.com/code/processing/creativepact2010/DAY13/`: http://www.adamtindale.com/code/processing/creativepact2010/DAY13/

