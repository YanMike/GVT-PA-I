/**
 * Created by Yannick Bachteler on 24.03.15.
 * Version 0.1, 24.03.2015: Inital load of pictures
 * Version 0.2, 25.03.2015: Detection of pressed keys and double click
 */

"use strict";   // use mode strict code

var images = ["0-zero", "15-fifteen", "30-thirty", "45-fourtyfive", "60-sixty", "75-seventyfive", "90-ninty", "105-onefive", "120-onetwenty", "135-onethirtyfive", "150-onefifty", "165-onesixtyfive", "180-oneeighty", "195-oneninetyfive", "210-twoten", "225-twotwentyfive", "240-twofourty", "255-twofiftyfive", "270-twoseventy", "285-twoeightyfive", "300-threehundret", "315-threefifteen", "330-threethirty", "345-threefourtyfive", "360-threesixty"];

/**
 * Function called when HTML side is called
 * preparation to call function to load and set unages
 */
var initialLoad = function() {
    var i = 0;
    var tmp = "";

    for(i = 0; i<= 24; i++) {
        tmp = images[i];
        loadImage(tmp, i)
    }
};

/**
 * Loads images from filesystem
 * @param {string} filename - filename of picture
 * @param {number} x        - CSS class extension to set img in HTML document
 */
function loadImage(filename, x) {
    var imageObj = new Image();
    imageObj.onload = function() {
        var img = document.getElementById('pos-' + x);
        img.setAttribute('src', this.src);
    };
    imageObj.src = "images/" + filename + ".png";
}


/**
 * event handler
 * @param event
 */
window.onkeydown = function(event) {
    var key = check.keyCode(event);

    if(key == "r" || key == "l") {
        var dbl = check.dblPress(key);
    }

    if(dbl == "r") {
        check.reset();
        rotate.right();
    } else if(dbl == "l") {
        check.reset();
        rotate.left();
    }
};

/**
 * inputChar {array}    - to prevent detecting a double click of the combination "lr" or "rl" -> only "ll" and "rr" are allowed
 */
var check = (function() {

    var singleClickTimer;
    var clickCount = 0;
    var inputChar = ["x","x"];

    /**
     *
     * @returns {string}
     */
    function keyCode() {
        var shift = event.shiftKey;
        var key = event.which ? event.which : event.keyCode;
        var k = "x";

        var c = String.fromCharCode(key);

        if(shift == false) {
            switch (c) {
                case ('R'):
                    k = "r";
                    return(k);
                case ('L'):
                    k = "l";
                    return(k);
                default:
                    k = "x";
            }
        }
    }

    /**
     *
     * @param char
     * @returns {boolean}
     */
    function dblPress(char) {
        clickCount++;

        if(inputChar[1] == 'x') {
            inputChar[1] = char;
        } else {
            inputChar[2] = char;
        }

        if(clickCount === 1) {
            singleClickTimer = setTimeout(function() {
                check.reset();
            },500);
        } else if(clickCount === 2)  {
            clearTimeout(singleClickTimer);

            if(inputChar[1] == inputChar[2]) {

                return (inputChar[1]);
            } else {
                check.reset();
                return (inputChar[1]);
            }
        }
    }

    /**
     *
     */
    function reset() {
        inputChar = ["x","x"];
        clickCount = 0;
    }

    // Interface
    return {
        keyCode:keyCode,
        dblPress:dblPress,
        reset:reset
    };

}());



var rotate = (function() {
    function right() {
        var firstItem = images[0];
        var tmp = "";
        for(var x = 0; x < 24; x++) {
            images[x] = images[x+1];
            tmp = images[x];
            loadImage(tmp, x);
        }
        images[24] = firstItem;
        loadImage(firstItem, 24);
    }

    function left() {
        var lastItem = images[24];
        var tmp = "";
        for(var x = 24; x > 0; x--) {
            images[x] = images[x-1];
            tmp = images[x];
            loadImage(tmp, x);
        }
        images[0] = lastItem;
        loadImage(lastItem, 0);
    }

    return {
        right:right,
        left:left
    } ;
}());