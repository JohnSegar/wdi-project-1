$(function(){
  buildGrid();
  init();
})

var width  = 10;
var height = 20;
var total  = width * height
var block  = document.getElementsByClassName("color");
var moves  = []
// var colors = ['red', 'green', 'blue', 'yellow'];
// var random_color = colors[Math.floor(Math.random() * colors.length)];
// document.getElementById('title').style.color = random_color;

function buildGrid(){
  $("body").append("<ul class='grid'></ul>");
  for (var i = 0; i < total; i++) {
    $(".grid").append("<li></li>")
  }
}

function init(){
  var $lis = $("li"); // HTMLCollection, like an Array
  drop();
}

function checkForFullRow(){
  // Check if you have a full row in moves
  console.log(moves);
}

function drop(){
  var $lis = $("li");

  // Pick one of the top row
  var nextIndex = Math.floor(Math.random()*width); // From 0 to width
  var prevIndex;


  // Create a setInterval to run repeatedly
  var dropInterval = setInterval(function(){
    // Choose the next li
    var prevLi = $lis[prevIndex]
    var nextLi = $lis[nextIndex];
    
    // If next li is red, then stop and drop another
    if ($(nextLi).hasClass("color")) {
      // Add moves to an array of moves
      moves.push(prevIndex);
      checkForFullRow()
      drop();
      return clearInterval(dropInterval)
    }

    // Colour that li
    if (prevLi) $(prevLi).removeClass("color");
    $(nextLi).addClass("color")

    // Assign the previous and next indexes
    prevIndex = nextIndex;
    nextIndex = nextIndex + width;

    // If it hits the bottom, then stop
    // var block = document.getElementsByClassName("color");

    if (nextIndex > total-1) {
      // Add moves to an array of moves
      moves.push(prevIndex);
      checkForFullRow()
      drop();
      return clearInterval(dropInterval)
    };
  }, 50)

  document.addEventListener('keydown', function(move) {
    move.preventDefault();
    if(move.keyCode == 37) {
      //left
      nextIndex -=1;
    } else if(move.keyCode == 39) {
      //right
      nextIndex +=1;
    }
  });
}