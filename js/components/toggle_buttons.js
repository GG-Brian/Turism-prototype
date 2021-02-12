// Once the windows is charged, function with the name of "initial" will be executed
window.onload = initial;

// initial() function will be waiting for normal user click on the element who contains an
// "ambience-button" id tag. When said click is detected, "toggleSound" function will be executed
function initial(){
    document.querySelector("#button-container-upper-left").addEventListener("click", toggleSound);
    document.querySelector("#button-container-upper-right").addEventListener("click", backMainPage);

// toggleSound(event) function selects, from the entire code it's used into, the tags containing the
// "actual_sky" and "ambience-image" id's and the first tag's id's "sounding" attribute value then
// saves them all into normal variables:
function toggleSound(event){
    var theButton = document.querySelector("#button-container-upper-left");
    var theSky = document.querySelector("#actual-sky");
    var soundImage = document.querySelector("#ambience-image");

    var sounding = theSky.getAttribute("sounding");

// if the variable "sounding" (used as indicator for when the ambience music is or is not playing)
// has the value "true", it will be set as "false", show the sound_off icon for the user and stop
// playing said music, otherwise it will change to true, show the sound_on icon and play the music:
    if(sounding == "true"){
        theSky.setAttribute("sounding", false);
        soundImage.src = "img/Virtual_reality/sound_off.png";
        theSky.components.sound.stopSound();
    } else {
        theSky.setAttribute("sounding", true);
        soundImage.src ="img/Virtual_reality/sound_on.png";
        theSky.components.sound.playSound();
    }
}}

function backMainPage(event){
    window.location.assign("index.html");
}