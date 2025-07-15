---
title: myo.js Explorations
date: 2016-11-20 04:32
author: Admin
category: Uncategorized
---

In the past I have endeavored to work with things that I like. Right now my two favourites are [flocking.js](http://www.flockingjs.org), [MYO](https://www.myo.com/). In particular, I have been very happy to get back into node.js and taking a look at the [myo.js](https://github.com/thalmiclabs/myo.js) bindings.
The basic demos work well but I have two myos, so it would be great to address each separately. The API provides a Myo object that keeps an array of all of the myos connected at the time. Most of the demo code uses the `Myo.on('connect, function(){};` to check the array and then keep track of the left and right arm (which is how I want to use them and how I expect most people to use them too).
The problem is that when you check the myo objects once they have connected a lot of their parameters are not set:

```json
[ { macAddress: 'f3-c6-21-d0-98-b3',
name: 'Adam Tindale's Myo',
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
```
In order to get these parameters I waited for the unlock event and then checked the calling object for its arm parameter. I have two references for specific myos `leftMyo` and `rightMyo` that I check to see if they are undefined. If they aren't then I check the calling object using `this` in order find its arm parameter. I assign the object to my references and then inititialize the listeners at that point. If you do it before you define the objects then javascript rightly complains that you are trying to put listeners on undefined objects (because they obviously aren't yet defined).
Here is an example I whipped up of a basic two handed myo.js that sends OSC messages using osc.js.

```javascript
var Myo = require('myo'), 
    leftMyo, rightMyo;


var BarCli = require('barcli'); 


var barcli_lx  = new BarCli({label: "left x", range: [-1, 1]});
var barcli_ly  = new BarCli({label: "left y", range: [-1, 1]});
var barcli_lz  = new BarCli({label: "left z", range: [-1, 1]});
var barcli_rx  = new BarCli({label: "right x", range: [-1, 1]});
var barcli_ry  = new BarCli({label: "right y", range: [-1, 1]});
var barcli_rz  = new BarCli({label: "right z", range: [-1, 1]});

var barcli_lxa  = new BarCli({label: "left x accel", range: [-1, 1]});
var barcli_lya  = new BarCli({label: "left y accel", range: [-1, 1]});
var barcli_lza  = new BarCli({label: "left z accel", range: [-1, 1]});
var barcli_rxa  = new BarCli({label: "right x accel", range: [-1, 1]});
var barcli_rya  = new BarCli({label: "right y accel", range: [-1, 1]});
var barcli_rza  = new BarCli({label: "right z accel", range: [-1, 1]});


// SETUP MYO
Myo.on("unlocked", function(){
    // this seems to work best here
    Myo.setLockingPolicy('none');

    if (typeof leftMyo !== "undefined" && typeof rightMyo !== "undefined")
        return;
    if (typeof leftMyo === "undefined" && this.arm === "left"){
        leftMyo = this; 
        leftMyo.on('pose', function(pose){
            console.log(this.arm+ ":" + pose);
        });
        leftMyo.on('pose_off', function(pose){
            console.log(this.arm+ ":" + pose);
        });
        leftMyo.on('locked', function(){
            console.log(this.arm + ": locked"); 
        });
    }
    if (typeof rightMyo === "undefined" && this.arm === "right"){
        rightMyo = this; 
        rightMyo.on('pose', function(pose){
            console.log(this.arm+ ":" + pose);
        });
        rightMyo.on('pose_off', function(pose){
            console.log(this.arm+ ":" + pose + " off");
        });
        rightMyo.on('unlocked', function(){
            console.log(this.arm + ": unlocked"); 
        });
    }
});

Myo.on("connected", function(){
    console.log(this);
});

Myo.connect('org.adamtindale.myoosc', require('ws'));
```

*[View this code on GitHub](https://github.com/drart/myo-nodejs-demos/blob/master/doublemyo.js)*
