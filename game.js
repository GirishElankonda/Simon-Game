let gamePattern = [];
let userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var gameStarted = false;
function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4); 
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
}

$(".btn").on("click", function () {
    if(gameStarted){
        playSound(this.id);
        animatePress(this.id);
        userClickedPattern.push(this.id);
        checkAnswer(userClickedPattern.length - 1);
    }
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

$(document).on("keydown",function(){
    if(!gameStarted){
        gameStarted = true;
        gamePattern = [];
        level = 0;
        $("h1").text("Level "+level);
        nextSequence();
    }
});

function checkAnswer(currentIndex){
    if(userClickedPattern[currentIndex] !== gamePattern[currentIndex]){
        playSound("wrong");
        console.log("Wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press any key to Restart");
        restart();
    }
    else if(gamePattern.length === userClickedPattern.length){
        console.log("success");
        setTimeout(nextSequence,1000);
    }
}

function restart(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}