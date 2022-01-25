var buttonColors = ['blue', 'yellow', 'green', 'red'];
var gamePattern = [];
var userClickedPattern = [];
var i = 0;
var started = false;


//-----Main Code -------
$(document).on('keypress', function (){
    if (!started){
        started = true;
        setTimeout(function(){
            nextSequence();

        }, 200);
    }
})

$('.btn').on('click', function (){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound (userChosenColor);
    animatedPress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})






//----------------------------------
function nextSequence(){

    $('h1').text('level ' + i);
    i++;
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' +randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function checkAnswer (current){
    if (userClickedPattern [current] === gamePattern [current]){
        console.log("Done");
        if (userClickedPattern.length === gamePattern.length)
        setTimeout(function(){
            nextSequence();
        }, 1000)
    }else {
        console.log("False");
        playSoundGameOver();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    i = 0;
    started = false;
    gamePattern = [];
}
function playSoundGameOver (){
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
}
function playSound (key){
        var audio = new Audio('sounds/' + key + '.mp3');
        audio.play();
}

function animatedPress(currentColor){
    $('#' +currentColor).addClass('pressed');
    setTimeout(function () { 
     $('#' +currentColor).removeClass('pressed');
    }, 100);

}
