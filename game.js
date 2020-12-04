var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 0;


$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


function nextSquence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  level++;
  $("#level-title").text("Level " + level);

  userClickedPattern = [];

}

function playSound(name) {
  var gameSound = new Audio("sounds/" + name + ".mp3");
  gameSound.play();

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


$("body").keydown(function () {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSquence();
    gameStart = true;
  }
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
  }

  if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
    console.log("wrong");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200);
    
    startOver();
  }

  else if (gamePattern.length === userClickedPattern.length) {
    setTimeout(function () {
      nextSquence();
    }, 1000);

  }

}


function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}
