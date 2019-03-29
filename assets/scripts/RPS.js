var rpsGame = {
    name: "",
    player: 0,
    playerGuess: "",
    ready: false,
    opponentReady: false,
    countdown: {
        time: 5,
        counting: false
    }
};



//
//
//  EVENTS
//
//
$("#nickNameSubmit").on("click", function (e) {
    e.preventDefault();
    rpsGame.name = $("#nickName").val();
    $("#playerTag").text(rpsGame.name);

    if (rpsGame.player !== "full" && rpsGame.player !== 0) {
        database.ref(`/player${rpsGame.player}`).update({
            name: rpsGame.name
        });
    }

    $("#overlay").hide();
});

$(".imgButton").on("click", function () {
    if (rpsGame.ready === false) {
        rpsGame.playerGuess = $(this).val();
        $("#player").css("background-image", `url("./assets/images/${$(this).val()}Large.png")`);
        
        database.ref(`/player${rpsGame.player}`).update({
            guess: $(this).val()
        });
    }
});

$("#ready").on("click", function () {
    if (rpsGame.playerGuess !== ""){
        if (rpsGame.ready === false) {
            rpsGame.ready = true;
            $("#playerNotReady").hide();
            $("#playerReady").show();
    
            database.ref(`/player${rpsGame.player}`).update({
                ready: true
            });
        } else if (rpsGame.ready === true) {
            rpsGame.ready = false;
            $("#playerNotReady").show();
            $("#playerReady").hide();
    
            database.ref(`/player${rpsGame.player}`).update({
                ready: false
            });
        }
    }
});




//
//
//  FUNCTIONS
//
//
function evaluateOutcome() {
    
}

function resetAll() {
    $("#opponent").css("background-image", "");
    $("#opponentTag").empty();
}