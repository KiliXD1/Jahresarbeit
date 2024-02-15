
const OVERLAY_KLASSE = "overlay";
const OVERLAY_TEXT_KLASSE = "overlay-text";
const OVERLAY_BUTTON_KLASSE = "overlay-button";
const SICHTBAR_KLASSE = "sichtbar";

const overlay = document.querySelector("." + OVERLAY_KLASSE);
const overlayText = document.querySelector("." + OVERLAY_TEXT_KLASSE);
const overlayButton = document.querySelector("." + OVERLAY_BUTTON_KLASSE);
var character =
document.getElementById("character");
var block = document.getElementById("block");
function jump(){
character.classList.add("animate");
   if(character.classList !="animate"){
    character.classList.add("animate");
   }
   setTimeout(function () {
   character.classList.remove("animate");
   },850)
}

function spielBeenden() {
   overlay.classList.add(SICHTBAR_KLASSE);
}

var checkDead = setInterval(function(){
var characterTop =parseInt(window.getComputedStyle(character).getPropertyValue("Top"));
var blockLeft =parseInt(window.getComputedStyle(block).getPropertyValue("left"));
if(blockLeft<91 && blockLeft>0 && characterTop>=300){
   //block.style.animation = "none";
   //block.style.display = "none";

   spielBeenden();
}
}, -30);
