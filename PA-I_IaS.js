/**
 * Created by Yannick Bachteler on 24.03.15.
 * Version 0.1, 24.03.2015: Inital load of pictures
 * Version 0.2, 25.03.2015: Detection of pressed keys and double click
 * Version 0.3, 25.03.2015: Rotate implemented
 * Version 0.4, 04.04.2015: final pictures and example for status based rotation
 */

"use strict";   // use mode strict code

var images = ["0-zero", "15-fifteen", "30-thirty", "45-fourtyfive", "60-sixty", "75-seventyfive", "90-ninty", "105-onefive", "120-onetwenty", "135-onethirtyfive", "150-onefifty", "165-onesixtyfive", "180-oneeighty", "195-oneninetyfive", "210-twoten", "225-twotwentyfive", "240-twofourty", "255-twofiftyfive", "270-twoseventy", "285-twoeightyfive", "300-threehundret", "315-threefifteen", "330-threethirty", "345-threefourtyfive"];
//var path = "images_placeholder/";
var path = "images/";
var state = '0';

/**
 * Function called when HTML side is called
 * preparation to call function to load and set images
 */
var initialLoad = function() {
    var i = 0;
    var tmp = "";

    for(i = 0; i<= 23; i++) {
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

        /*
        switch (filename) {
            case ('0-zero'):
                img.className = '_0';
                break;
            case ('15-fifteen'):
                img.className = '_15';
                break;
            case ('30-thirty'):
                img.className = '_30';
                break;
            case ('45-fourtyfive'):
                img.className = '_45';
                break;
            case ('60-sixty'):
                img.className = '_60';
                break;
            case ('75-seventyfive'):
                img.className = '_75';
                break;
            case ('90-ninty'):
                img.className = '_90';
                break;
            case ('105-onefive'):
                img.className = '_105';
                break;
            case ('120-onetwenty'):
                img.className = '_120';
                break;
            case ('135-onethirtyfive'):
                img.className = '_135';
                break;
            case ('150-onefifty'):
                img.className = '_150';
                break;
            case ('165-onesixtyfive'):
                img.className = '_165';
                break;
            case ('180-oneeighty'):
                img.className = '_180';
                break;
            case ('195-oneninetyfive'):
                img.className = '_195';
                break;
            case ('210-twoten'):
                img.className = '_210';
                break;
            case ('225-twotwentyfive'):
                img.className = '_225';
                break;
            case ('240-twofourty'):
                img.className = '_240';
                break;
            case ('255-twofiftyfive'):
                img.className = '_255';
                break;
            case ('270-twoseventy'):
                img.className = '_270';
                break;
            case ('285-twoeightyfive'):
                img.className = '_285';
                break;
            case ('300-threehundret'):
                img.className = '_300';
                break;
            case ('315-threefifteen'):
                img.className = '_315';
                break;
            case ('330-threethirty'):
                img.className = '_330';
                break;
            case ('345-threefourtyfive'):
                img.className = '_345';
                break;
        }
        */

    };
    imageObj.src = path + filename + ".png";
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
        for(var x = 0; x < 23; x++) {
            images[x] = images[x+1];
            tmp = images[x];
            loadImage(tmp, x);
        }
        images[23] = firstItem;
        loadImage(firstItem, 23);
    }

    function left() {
        var lastItem = images[23];
        var tmp = "";
        for(var x = 23; x > 0; x--) {
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