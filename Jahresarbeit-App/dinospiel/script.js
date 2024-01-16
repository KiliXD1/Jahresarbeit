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

var checkDead = setInterval(function(){
var characterTop =parseInt(window.getComputedStyle(character).getPropertyValue("Top"));
var blockLeft =parseInt(window.getComputedStyle(block).getPropertyValue("left"));
if(blockLeft<91 && blockLeft>0 && characterTop>=300){
   block.style.animation = "none";
   block.style.display = "none";

   alert("DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! DU HAST VERLOREN!!! Schade versuch's nochmal");
}
}, -30);
