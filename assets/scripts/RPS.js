var rpsGame = {
    name: "",
    player: 0,
    playerGuess: "",
    ready: false,
    opponentReady: false,
    countdown: {
        time: 5,
        counting: false
    },
    score: {
        wins: 0,
        losses: 0
    }
};

var interval;


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
    if (rpsGame.playerGuess !== "") {
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
    var opponentGuess;

    if (rpsGame.player === 1) {
        database.ref("/player2/guess").once("value", function (snap) {
            opponentGuess = snap.val();
            $("#opponent").css("background-image", `url("./assets/images/${opponentGuess}Large.png")`);
        });
    } else if (rpsGame.player === 2) {
        database.ref("/player1/guess").once("value", function (snap) {
            opponentGuess = snap.val();
            $("#opponent").css("background-image", `url("./assets/images/${opponentGuess}Large.png")`);
        });
    }

    if (rpsGame.playerGuess === "rock") {
        if (opponentGuess === "paper") {
            rpsGame.score.losses++;
        } else if (opponentGuess === "scissors") {
            rpsGame.score.wins++;
        }
    } else if (rpsGame.playerGuess === "paper") {
        if (opponentGuess === "rock") {
            rpsGame.score.wins++;
        } else if (opponentGuess === "scissors") {
            rpsGame.score.losses++;
        }
    } else if (rpsGame.playerGuess === "scissors") {
        if (opponentGuess === "rock") {
            rpsGame.score.losses++;
        } else if (opponentGuess === "paper") {
            rpsGame.score.wins++;
        }
    }

    $("#scoreLeft").text(rpsGame.score.wins);
    $("#scoreRight").text(rpsGame.score.losses);

    setTimeout(resetEverything, 5000);
}

function resetOpponent() {
    $("#opponent").css("background-image", "");
    $("#opponentTag").empty();
}

function resetEverything() {
    console.log("reset everything");
    $("#opponent").css("background-image", "");
    
    rpsGame = {
        name: rpsGame.name,
        player: rpsGame.player,
        playerGuess: "",
        ready: false,
        opponentReady: false,
        countdown: {
            time: 5,
            counting: false
        },
        score: {
            wins: rpsGame.score.wins,
            losses: rpsGame.score.losses
        }
    };
    
    database.ref(`/player${rpsGame.player}`).set({
        playing: true,
        name: rpsGame.name,
        guess: "",
        ready: false
    });

    $("#player").css("background-image", "");
    $("#playerReady").hide();
    $("#playerNotReady").show();
    $("#opponentReady").hide();
    $("#opponentNotReady").show();
}