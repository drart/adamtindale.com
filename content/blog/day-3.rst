Day 3
#####
:date: 2010-09-03 20:24
:author: Admin
:category: Creative Pact 2010

Today was a challenge. I downloaded the BETA of MINIM so that I could try
the new UGEN api. It is interesting but not fully featured yet. I saw a
Granulator in there and I got excited. I wasn't able to make any good
sounds and I ran into some troubles with controlP5 and MINIM where they
both had Controller classes and Events.

There is a crazy solution where the name of a controlP5 object can be
declared as a global and the slider will update the global. I have to
look further into why this works but it certainly minimizes the amount
of code I have to write to make a basic GUI.

This example does a simple mapping of the BitCrush UGEN with a slider.
It also has a display for the audio output. I would love to have access
to the audio input too. More work to be done. I am learning a lot here.

.. image:: /img/blog/creative-pact-2010/screen-0109.jpg
.. image:: /img/blog/creative-pact-2010/screen-0731.jpg

--------------

.. raw:: html

    <script src="https://gist-it.appspot.com/github/drart/CREATIVEPACT/blob/master/DAY3/DAY3.pde"></script>
