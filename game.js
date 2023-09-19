var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var usrClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequenece();
        started = true;
    }
});

$(".btn").click(function(){
    var usrChosenColor = $(this).attr('id');
    usrClickedPattern.push(usrChosenColor);
    playSound(usrChosenColor);
    animatePress(usrChosenColor);
    checkAnswer(usrClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === usrClickedPattern[currentLevel]){
        //console.log("success");
        if(usrClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequenece();
            },1000);
        }
    } else{
        //console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setInterval(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function nextSequenece(){
    usrClickedPattern = [];
    level++;
    $("#level-title").html("level "+level);
    var randomNumber = Math.floor(Math.random()* 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(color){
    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}





