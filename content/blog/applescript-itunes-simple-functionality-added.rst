Applescript + iTunes = Simple Functionality Added
#################################################
:date: 2011-04-10 14:39
:author: Admin
:category: Uncategorized

I like listening to music. I prefer when the song finishes. I don't want
to stay hovering over iTunes for the end of the song. There isn't a
button to do this but we do have Applescript. Here is the hard way to do
it.

.. [gist:id=8456341]

.. raw:: html

    <pre><code class="language-xxxx">
    tell application "iTunes"
        if player state is playing then
            if selection is not current track then
                reveal current track -- reveal selects current track...
            end if
            play selection with once
        end if
    end tell
    </code></pre>

Thanks to `Doug's Applescript for iTunes reference for the reveal
command.`_

.. _Doug's Applescript for iTunes reference for the reveal command.: http://dougscripts.com/itunes/itinfo/info03.php


.. raw:: html -- terrible hack for now

    <script src="/theme/js/prism.js"></script>
