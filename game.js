var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
//console.log(buttonColours);
var started = false;
var level = 0;

$("#level-title").click(function(){
    if (!started) {
        //$("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
$(document).keydown(function () {
    if (!started) {
        // $("#level-title").text("Level " + level);
        // $("#checkpoint").text("to checkpoint")
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentlevel) {
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        console.log("succuss");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},200);
        $("#level-title").text("press any key to start");
        //alert("YOu lose at level:"+level);
        startOver();
    }

}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

function nextSequence() {
    userClickedPattern=[];
    level++;

    $("#level-title").text("Level " + level);
    $("#checkpoint").text(15-level+"-levels to checkpoint")
    var num = Math.random() * 4;
    var randomNumber = Math.floor(num);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);

    $("#" + buttonColours[randomNumber]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}




