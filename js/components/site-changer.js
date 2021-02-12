// This variable will be used for the lower-left button of the screen to tell how many times the user traveled
// through places, it will be used as an increasing value on lines 49 and 50:
zoneCounter = 0

// Creates a class component called "change-site", defined to allow string value data between ("") symbols
// as "image: (pointer value (see inner function line 14))". For a-circle tags, I also define said class
// to allow another string value data "zone (pointer value)", also between ("") symbols:
AFRAME.registerComponent('change-site', {
  schema: {
    image: { type: 'string' },
    sound: { type: 'string' },
    zone: { type: 'string' }
  },

  // On this "init" funcion, "var data" will contain the "chage-site" class values, while "var el" will
  // contain the tag that contains the "change-site" class inside:
  init: function () {
    var data = this.data;
    var el = this.el;

    // Definition of a function that will be waiting to make changes when it detects the "cursor" entering
    // the area of the tag that contains the "change-site" class (line 8) (it refers to that line because it is
    // not closed with "}" symbol, nor the init one, the reason why it takes that same "var el" value to detect):
    el.addEventListener("mouseenter", function () {

      // The next two lines (1) collect the parent tag of what's been selected (a-entity parent) and (2) the
      // parent tag of the tag that's been selected (a-entity grandparent, which contains other a-entity tags):
      var parentEntity = el.parentNode;
      var grandParentEntity = parentEntity.parentNode;

      // The next two lines (1) select the a-plane tags inside the actual a-entity parent (this will be detected
      // thanks to ".querySelector("a-plane")") and (2) removes "clickable" class from it's class list (so it can't
      // be selected when the user is alreado at this scene):
      var thisAPlane = parentEntity.querySelector("a-plane");
      thisAPlane.classList.remove("clickable");

      // The next four lines (1) select all a-planes of the a-entity grandparent and, (2) for each obtained value
      // on the last line, (3) compares if each detected "a-plane" tag is the same than the currently selected tag,
      // (4) "clickeable" class will be added to it, allowing the user to interact the the scenes they are not at:
      var allAPlane = grandParentEntity.querySelectorAll("a-plane");
      Object.keys(allAPlane).forEach(function (key) {
        if (allAPlane[key] != thisAPlane) {
          allAPlane[key].classList.add("clickable");
        }else{
          // In case that the current a-plane is the selected one (meaning the user clicked on it to change places),
          // zoneCounter's value increases, on the next line I used it to change the button's times travelled value
          // for the incremented variable's value and then I add the text besides it (with a space so it has a little
          // separation from the number), indicating the user that said value means the times "they travelled":
          zoneCounter++
          document.getElementById("Counting").innerHTML = zoneCounter + " times travelled";
        }
      });

      // The next three lines (1) select all "a-box" tags (rotating 3D cubes) of the a-entity grandparent and,
      // (2) for each obtained value on the last line, sets it's "visible" value to "false" (as not active):
      var allABox = grandParentEntity.querySelectorAll("a-box");
      Object.keys(allABox).forEach(function (key) {
        allABox[key].setAttribute("visible", "false");
      });

      // The next two lines (1) select the "a-box" tag on the selected a-entity (parent) and (2) sets it's
      // "visible" value to "true":
      var parentEntityABox = parentEntity.querySelector("a-box");
      parentEntityABox.setAttribute("visible", "true");

      // The next three lines (1) select all a-text tags inside the a-entity grandparent tag and, (2) for each
      // obtained value on the last line, (3) sets it's "color" value to "gray" (as giving the "selected" look):
      var allAText = grandParentEntity.querySelectorAll("a-text");
      Object.keys(allAText).forEach(function (key) {
        allAText[key].setAttribute("color", "gray");
      });

      // The next two lines (1) select the select the selected a-entity parent's "a-text" tag and sets it's "color"
      // value to white (as giving the "unselected" look):
      var aText = thisAPlane.querySelector("a-text");
      if (aText) aText.setAttribute("color", "white");

      // The next four lines (1) select all a-circle tags of the a-entity grandparent tag and, (2) for each obtained
      // value on the last line, (3) sets it's "visible" value to "false" and (4) removes it's "clickable" class (so
      // the circles cannot be interacted from any scene):
      var allACircle = grandParentEntity.querySelectorAll("a-circle");
      Object.keys(allACircle).forEach(function (key) {
        allACircle[key].setAttribute("visible", "false");
        allACircle[key].classList.remove("clickable");
      });

      // The next four lines (1) select the "zone" value from our "change-site" class from the currently selected
      // a-entity parent and, (2) for each obtained value, (3) sets it's "visible" value to "true" and (4) adds the
      // "clickable" class value to it (so only the circles belonging to their specified one (scene)) can be interacted):
      var allACircleInThisZone = parentEntity.querySelectorAll(data.zone);
      Object.keys(allACircleInThisZone).forEach(function (key) {
        allACircleInThisZone[key].setAttribute("visible", "true");
        allACircleInThisZone[key].classList.add("clickable");
      });

      // The next five lines (1) select the tag with the "actual-sky" id from the html document and sets it's
      // "src" and "sound" values for the virtua reality assets chosen (indicated from change-site class and
      // previous code from this JavaScript file):
      var theSky = document.querySelector("#actual-sky");
      theSky.setAttribute("src", data.image);
      theSky.setAttribute("sound", "src", data.sound);

      // The next two lines compares if said tag with the "actual_sky" id has the value "true", if so, the
      // ambience music will start playing:
      if (theSky.getAttribute("sounding") == "true") {
        theSky.components.sound.playSound();
      }
    });
  }
});