//IIFE TO EXTRACT DIMENSION DATA
var dimensions = (function(){
        var str = document.querySelectorAll("[name='ad.size']")[0].getAttributeNode("content").value;
        var widthMatch = /width\=(\d+)/.exec(str);
        var heightMatch = /height\=(\d+)/.exec(str);
        return {
            width: parseInt(widthMatch[1]),
            height: parseInt(heightMatch[1])
        }
})();

var tl;
var stopWatch;

//INITIALIZE
function init(){

    // Helper function for FOUC
    let domReady = (cb) => {
        document.readyState === 'interactive' || document.readyState === 'complete'
        ? cb()
        : document.addEventListener('DOMContentLoaded', cb);
    };
    
    domReady(() => {
        // Display body when DOM is loaded
        document.body.style.visibility = 'visible';
    });

    IDsToVars();

    container.style.width = dimensions.width + 'px';
    container.style.height = dimensions.height + 'px';
    
    //set timeline
    tl = new TimelineLite();

    addListeners();
    
    animate();
}

function addListeners(){
    //replay functionality
    /*
    replay_button.addEventListener('mouseover',function(){
        TweenLite.fromTo(replay_button, .5, {rotation:'-360'}, {overwrite:false, rotation:'0'});
    })
    replay_button.addEventListener('click',function(){
            tl.restart();
    })
    */
}

//ANIMATE
function animate(){
    stopWatch=new Date().getTime(); 

    //timeline animation here
    tl
    // 
    // .to(bg1_2x, 1, {opacity:0, ease:Power2.easeIn},"+=1")

    // f1
    .from(date_2x, 1, {y:-dimensions.height/.5, ease:Power2.easeOut},"f2")
    .from(c0_2x, 1, {y:dimensions.height/.5, ease:Power2.easeOut},"f2")


    // f2
    .to(c0_2x, .7, {opacity:0, ease:Power2.easeOut},"+=2.5")
    .from(c1_2x, 1, {y:dimensions.height/.5, ease:Power2.easeOut},"c1-=.8")
    .from(legal_2x, 1.3, {opacity:0, ease:Power2.easeOut},"c1-=.5")

    // f2
    .to(c1_2x, .7, {opacity:0, ease:Power2.easeOut},"c1out+=2.5")
    .to(legal_2x, .7, {opacity:0, ease:Power2.easeOut},"c1out+=2.5")

    .from(c2_2x, 1, {y:dimensions.height/.5, ease:Power2.easeOut},"-=.8")
    
    .to(c2_2x, .7, {opacity:0, ease:Power2.easeOut},"+=2.5")
    .from(c3_2x, 1, {y:dimensions.height/.5, ease:Power2.easeOut},"c3-=.8")
    .to(legal_2x, 1.3, {opacity:1, ease:Power2.easeOut},"c3-=.5")



    //.call(returnTimer)
}

function returnTimer(){
    stopWatch=((new Date().getTime())-stopWatch)*.001;
    console.log(stopWatch+" seconds");
}

function clickThrough(){
    window.open(clicktag);
}

//SET IDs IN DOM TO GLOBAL VARIABLES
function IDsToVars(){
    var allElements = document.getElementsByTagName("*");
    
    for (var q = 0; q<allElements.length; q++){
         var el = allElements[q];
         if (el.id){
            window[el.id]=document.getElementById(el.id);
        }
    }
};