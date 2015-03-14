Day 28
######
:date: 2010-09-29 03:00
:author: Admin
:category: Creative Pact 2010

I am getting quite interested in developing some analysis tools for
sound in Java. I am wanting to find the ratio of centre frequency to
noise. Today I made a crude algorithm that looks for the peak frequency
bin and then uses that in a ratio between spectral centroid. If the peak
is off from the centroid then you can assume a distribution that is
noisier (aka less pitched). The problems with this algorithm is that it
is not normalized to volume and that a centroid of fftsize/2 is noise so
if there is a peak at this place then you will get erroneous data. That
will take me a little while to find a good solution around this but if
was a fun thought experiment.

Today's patch uses my peakiness measure to draw big bubbles across the
screen. More noisy means more crazy drawing. It is actually responding
in generally the right way and is kind of interesting to watch. I will
definitely be expanding on this idea.

Also today I left in some comments in the code for things that I tried
and abandoned. You can see a bit more into my process with these.

.. image:: /img/blog/creative-pact-2010/screen-0611.jpg
    :alt: Screenshot of software.

.. image:: /img/blog/creative-pact-2010/screen-0969.jpg
    :alt: Screenshot of software.

--------------

.. raw:: html

    <script src="http://gist-it.appspot.com/github/drart/CREATIVEPACT/blob/master/DAY28/DAY28.pde"></script>


