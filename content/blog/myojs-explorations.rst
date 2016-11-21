myo.js Explorations
###################
:date: 2016-11-20 04:32
:author: Admin
:category: uncategorized

In the past I have endeavored to work with things that I like. Right now my two favourites are `flocking.js <http://www.flockingjs.org>`_, `MYO <https://www.myo.com/>`_. In particular, I have been very happy to get back into node.js and taking a look at the `myo.js <https://github.com/thalmiclabs/myo.js>`_ bindings.

The basic demos work well but I have two myos, so it would be great to address each separately. The API provides a Myo object that keeps an array of all of the myos connected at the time. Most of the demo code uses the :code:`Myo.on('connect, function(){};` to check the array and then keep track of the left and right arm (which is how I want to use them and how I expect most people to use them too). 

The problem is that when you check the myo objects once they have connected a lot of their parameters are not set:

.. raw:: html

    <pre><code class="language-json"> [ { macAddress: 'f3-c6-21-d0-98-b3',
    name: 'Adam Tindale\'s Myo',
    connectIndex: 0,
    locked: true,
    connected: true,
    synced: false,
    batteryLevel: 0,
    lastIMU: undefined,
    arm: undefined,
    direction: undefined,
    warmupState: undefined,
    orientationOffset: { x: 0, y: 0, z: 0, w: 1 },
    events: [],
    connectVersion: '1.5.1970.2' } ]
    </code></pre>

In order to get these parameters I waited for the unlock event and then checked the calling object for its arm parameter. I have two references for specific myos :code:`leftMyo` and :code:`rightMyo` that I check to see if they are undefined. If they aren't then I check the calling object using :code:`this` in order find its arm parameter. I assign the object to my references and then inititialize the listeners at that point. If you do it before you define the objects then javascript rightly complains that you are trying to put listeners on undefined objects (because they obviously aren't yet defined). 

Here is an example I whipped up of a basic two handed myo.js that sends OSC messages using osc.js. 

.. raw:: html

    <script src="http://gist-it.appspot.com/github/drart/myo-nodejs-demos/blob/master/doublemyo.js"></script>
