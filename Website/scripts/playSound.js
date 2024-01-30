/**********************************************************************/
/*! \file  playSound.js
 * \author Seth Peterson
 * \date   2020-02-25
 * \brief
 *     This file contains functions that interact with user input.
 */
/**********************************************************************/
"use strict"

const audio = new Audio("./audio/navHover.ogg");//$("#hoverNavItem");
const audio2 = new Audio("./audio/pageTurn.ogg");//$("#selectNavItem");

function playSound()
{
  if ($("#auth").is(":hidden"))
  {
    audio.pause();
    audio.play();
  }
}
function playSound2()
{
  audio2.play();
}

//Sign up parts of the document to listen for user interaction:
//  1. Hover over the nav bar (silent until the user has clicked)
//  2. Clicking on the suggested text.
$(document).ready(function() {
  $("h1#auth").click(playSound2);
  $("nav ul li a").mouseenter(playSound);

  $(document).click(function() {
    $("#auth").hide();
  });
});

