Day 5
#####
:date: 2010-09-06 03:35
:author: Admin
:category: Creative Pact 2010

Today I was working with analysis. This patch doesn't have a lot of good
looks but I have implemented a zero crossing rate function, an rms
function for time domain analysis, spectral centroid, spectral rolloff,
and spectral compactness. I coded up a spectral flatness measure but I
keep getting zero as the output. I haven't done thorough debugging job
because I was trying to make sure I have something done for today!

I started out hoping that I could implement both the spectral features
and time domain features as an AudioListener object but the FFT object
doesn't work that way. So, I made a method that is called every draw
loop. This isn't the nicest solution but it works. I am dreaming up a
link between `jAudio`_ and MINIM. If I'm not careful I might be putting
another thing on my plate :)

Today's patch is really just an extension of MINIM's spectral display
patch but an overlay of the feature extraction output. My hope is to
eventually do a MINIM version of `sndpeek`_. Maybe tomorrow there will
be text and waterfall plots... maybe.

.. image:: /img/blog/creative-pact-2010/screen-0175.jpg
.. image:: /img/blog/creative-pact-2010/screen-0568.jpg

--------------

.. raw:: html

    <script src="http://gist-it.appspot.com/github/drart/CREATIVEPACT/blob/master/DAY5/DAY5.pde></script>    
    <script src="http://gist-it.appspot.com/github/drart/CREATIVEPACT/blob/master/DAY5/SPECTRAL.pde></script>    
    <script src="http://gist-it.appspot.com/github/drart/CREATIVEPACT/blob/master/DAY5/TIME.pde></script>    

Today's code:

`http://www.adamtindale.com/code/processing/creativepact2010/DAY5/`_

.. _jAudio: http://jmir.sourceforge.net/jAudio.html
.. _sndpeek: http://soundlab.cs.princeton.edu/software/sndpeek/
.. _`http://www.adamtindale.com/code/processing/creativepact2010/DAY5/`: http://www.adamtindale.com/code/processing/creativepact2010/DAY5/

