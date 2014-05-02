Day 26
######
:date: 2010-09-26 17:59
:author: Admin
:category: Creative Pact 2010

I guess I am at it again. Today I was playing around with an idea for
making a spectral centroid visual. I was thinking about FFT displays and
I thought that having bars rise and fall isn't all that visually
stimulating, though it is accurate for display. So, what I did was map
spectral centroid to the location of a directional light in OPENGL and
had it point to a line of boxes whose size modulates with the amplitude
of the incoming signal. I also reversed the amplitude mapping so that
loud sounds create small boxes. It makes for some nice motion.

I also spent some time looking through the Processing.org bug list in
reference to some glitchyness in OPENGL as implemented in Processing.
There are varying reports about how to smooth out anti-aliasing and
threading issues. It seems the best thing to do is to try out all
solutions and see which one works for that particular patch. Although
the simplest thing to do to avoid the anti-aliasing problem is to only
draw vertical or horizontal lines, but who wants to do that?


.. image:: /img/blog/creative-pact-2010/screen-0754.jpg
.. image:: /img/blog/creative-pact-2010/screen-1271.jpg

--------------

.. raw:: html

   <script src="http://gist-it.appspot.com/github/drart/CREATIVEPACT/blob/master/DAY26/DAY26.pde"></script>

