/*
* Flocking Parser
* http://github.com/colinbdclark/flocking
*
* Copyright 2011, Colin Clark
* Dual licensed under the MIT and GPL Version 2 licenses.
*/

/*global Float32Array,jQuery*/
/*jslint white: true, vars: true, undef: true, newcap: true, regexp: true, browser: true,
    forin: true, continue: true, nomen: true, bitwise: true, maxerr: 100, indent: 4 */

var flock = flock || {};

(function ($) {
    "use strict";

    flock.parse = flock.parse || {};

    flock.parse.synthDef = function (ugenDef, options) {
        // We didn't get an out ugen specified, so we need to make one.
        if (typeof (ugenDef.length) === "number" || (ugenDef.id !== flock.OUT_UGEN_ID && ugenDef.ugen !== "flock.ugen.out")) {
            ugenDef = {
                id: flock.OUT_UGEN_ID,
                ugen: "flock.ugen.out",
                inputs: {
                    sources: ugenDef,
                    bus: 0,
                    expand: options.chans
                }
            };
        }
        
        return flock.parse.ugenForDef(ugenDef, options.rates, options.visitors);
    };

    flock.parse.makeUGen = function (ugenDef, parsedInputs, rates) {
        // Assume audio rate if no rate was specified by the user.
        if (!ugenDef.rate) {
            ugenDef.rate = flock.rates.AUDIO;
        }
    
        var buffer = new Float32Array(ugenDef.rate === flock.rates.AUDIO ? rates.control : 1),
            sampleRate;
    
        // Set the ugen's sample rate value according to the rate the user specified.
        if (ugenDef.options && ugenDef.options.sampleRate !== undefined) {
            sampleRate = ugenDef.options.sampleRate;
        } else if (ugenDef.rate === flock.rates.AUDIO) {
            sampleRate = rates.audio;
        } else if (ugenDef.rate === flock.rates.CONTROL) {
            sampleRate = rates.audio / rates.control;
        } else {
            sampleRate = 1;
        }
        
        ugenDef.options = ugenDef.options || {};
        ugenDef.options.sampleRate = sampleRate;
        ugenDef.options.rate = ugenDef.rate;
        ugenDef.options.audioSettings = {
            rates: rates
        };
        
        return flock.invoke(undefined, ugenDef.ugen, [
            parsedInputs, 
            buffer, 
            ugenDef.options
        ]);
    };


    flock.parse.reservedWords = ["id", "ugen", "rate", "inputs", "options"];
    flock.parse.specialInputs = ["value", "buffer", "table"];
    
    flock.parse.expandUGenDef = function (ugenDef) {
        var inputs = {},
            prop;
       
        // Copy any non-reserved properties from the top-level ugenDef object into the inputs property.
        for (prop in ugenDef) {
            if (flock.parse.reservedWords.indexOf(prop) === -1) {
                inputs[prop] = ugenDef[prop];
                delete ugenDef[prop];
            }
        }
        ugenDef.inputs = inputs;
    
        return ugenDef;
    };
    
    flock.parse.expandValueDef = function (ugenDef) {
        var type = typeof (ugenDef);
        if (type === "number") {
            return {
                ugen: "flock.ugen.value",
                rate: flock.rates.CONSTANT,
                inputs: {
                    value: ugenDef
                }
            };
        }
        
        if (type === "object") {
            return ugenDef;
        }
    
        throw new Error("Invalid value type found in ugen definition.");
    };

    flock.parse.rateMap = {
        "ar": flock.rates.AUDIO,
        "kr": flock.rates.CONTROL,
        "cr": flock.rates.CONSTANT
    };

    flock.parse.expandRate = function (ugenDef) {
        ugenDef.rate = flock.parse.rateMap[ugenDef.rate] || ugenDef.rate;
        return ugenDef;
    };

    flock.parse.ugenDef = function (ugenDefs, rates, visitors) {
        var parseFn = flock.isIterable(ugenDefs) ? flock.parse.ugensForDefs : flock.parse.ugenForDef;
        var parsed = parseFn(ugenDefs, rates, visitors);
        return parsed;
    };
    
    flock.parse.ugensForDefs = function (ugenDefs, rates, visitors) {
        var parsed = [],
            i;
        for (i = 0; i < ugenDefs.length; i++) {
            parsed[i] = flock.parse.ugenForDef(ugenDefs[i], rates, visitors);
        }
        return parsed;
    };

    /**
     * Creates a unit generator for the specified unit generator definition spec.
     *
     * ugenDefs are plain old JSON objects describing the characteristics of the desired unit generator, including:
     *      - ugen: the type of unit generator, as string (e.g. "flock.ugen.sinOsc")
     *      - rate: the rate at which the ugen should be run, either "audio", "control", or "constant"
     *      - id: an optional unique name for the unit generator, which will make it available as a synth input
     *      - inputs: a JSON object containing named key/value pairs for inputs to the unit generator
     *           OR
     *      - inputs keyed by name at the top level of the ugenDef
     * 
     * @param {UGenDef} ugenDef the unit generator definition to parse
     * @param {Object} rates an object containing the current audio, control, and constant rates
     * @param {Array of Functions} visitors an optional list of visitor functions to invoke when the ugen has been created
     * @return the parsed unit generator object
     */
    flock.parse.ugenForDef = function (ugenDef, rates, visitors) {
        var defaultSettings = flock.defaults("flock.audioSettings");
        rates = rates || defaultSettings.rates;
    
        // If we receive a plain scalar value, expand it into a value ugenDef.
        ugenDef = flock.parse.expandValueDef(ugenDef);
        
        // We received an array of ugen defs.
        if (flock.isIterable(ugenDef)) {
            return flock.parse.ugensForDefs(ugenDef, rates, visitors);
        }
    
        if (!ugenDef.inputs) {
            ugenDef = flock.parse.expandUGenDef(ugenDef);
        }
    
        flock.parse.expandRate(ugenDef);
    
        // Merge the ugenDef with default values defined by the ugen itself.
        var defaults = flock.defaults(ugenDef.ugen) || {};
        ugenDef = $.extend(true, {}, defaults, ugenDef);
        
        var inputDefs = ugenDef.inputs,
            inputs = {},
            inputDef;
        
        for (inputDef in inputDefs) {
            // Create ugens for all inputs except special inputs.
            inputs[inputDef] = flock.parse.specialInputs.indexOf(inputDef) > -1 ? 
                ugenDef.inputs[inputDef] :                                         // Don't instantiate a ugen, just pass the def on as-is.
                flock.parse.ugenForDef(ugenDef.inputs[inputDef], rates, visitors); // parse the ugendef and create a ugen instance.
        }
    
        if (!ugenDef.ugen) {
            throw new Error("Unit generator definition lacks a 'ugen' property; can't initialize the synth graph.");
        }
    
        var ugen = flock.parse.makeUGen(ugenDef, inputs, rates);
        ugen.id = ugenDef.id;
        
        if (visitors) {
            visitors = $.makeArray(visitors);
            $.each(visitors, function (idx, visitor) {
                visitor(ugen, ugenDef, rates);
            });
        }

        return ugen;
    };
    
    flock.parse.bufferForDef = function (bufDef, onLoad, enviro) {
        enviro = enviro || flock.enviro.shared;

        var id = bufDef.id || flock.id(),
            src;
            
        if (bufDef.url) {
            src = bufDef.url;
        } else if (bufDef.selector) {
            src = document.querySelector(bufDef.selector).files[0];
        }
        
        enviro.loadBuffer(id, src, onLoad);
    };

}(jQuery));
