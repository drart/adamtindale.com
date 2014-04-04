Is Live Playing? 
#################
:date: 2010-03-30 22:40
:author: Admin
:category: Max 4 Live

So, more explorations with Max 4 Live are underway. It is interesting
under there. I ran into a problem where I automated some parameters and
then skipped to another place in my Live set. When I pressed play the
parameters of my max patch were a little whacky and I need to bang them
to get fresh updated statuses. Loadbang doesn't work since it wasn't an
instantiation of a device.

I found the solution. The live\_set has a parameter that is observable
and will tell you if Live is playing. Guess what it is called? That's
right - is\_playing. So I have a screenshot of this snippet of a Max 4
Live patch that you can check out an use to send a bang when Live is set
to play.

Enjoy!



.. image:: /img/blog/2010/03/isliveplaying.jpg
    :alt: Screenshot of software.
