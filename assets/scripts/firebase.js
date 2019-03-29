var config = {
    apiKey: "AIzaSyCiGlbGsJS61LwgBo29uMC9LFI2E7d99DA",
    authDomain: "rock-paper-scissors-d4b06.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-d4b06.firebaseio.com",
    projectId: "rock-paper-scissors-d4b06",
    storageBucket: "rock-paper-scissors-d4b06.appspot.com",
    messagingSenderId: "852834938889"
};

firebase.initializeApp(config);

var database = firebase.database();

database.ref("/player1").on("value", function (snapshot) {
    var snap = snapshot.val();

    if (!snapshot.exists() && rpsGame.player === 0) {
        rpsGame.player = 1;
        database.ref("/player1").set({
            playing: true,
            name: rpsGame.name,
            guess: "",
            ready: false
        });

        database.ref("/player1").onDisconnect().remove();
    } else if (rpsGame.player === 2) {
        if (snap !== null && rpsGame.name !== snap.name) {
            $("#opponentTag").text(snap.name);
        }

        if(!snapshot.exists()) {
            resetOpponent();
        }
    }
});

database.ref("/player2").on("value", function (snapshot) {
    var snap = snapshot.val();

    if (!snapshot.exists() && rpsGame.player === 0) {
        rpsGame.player = 2;
        database.ref("/player2/").set({
            playing: true,
            name: rpsGame.name,
            guess: ""
        });

        database.ref("/player2").onDisconnect().remove();
    } else if (rpsGame.player === 1) {
        if (snap !== null && rpsGame.name !== snap.name) {
            $("#opponentTag").text(snap.name);
        }

        if(!snapshot.exists()) {
            resetOpponent();
        }
    }
});

database.ref("/player1/ready").on("value", function (snapshot) {
    if (rpsGame.player === 2) {
        if (snapshot.val() === false) {
            rpsGame.opponentReady = false;
            $("#opponentNotReady").show();
            $("#opponentReady").hide();
        } else if (snapshot.val() === true) {
            rpsGame.opponentReady = true;
            $("#opponentNotReady").hide();
            $("#opponentReady").show();
        }
    }

    if (rpsGame.ready === true && rpsGame.opponentReady === true && rpsGame.countdown.counting === false) {
        rpsGame.countdown.counting = true;

        interval = setInterval(function () {
            if (rpsGame.ready === true && rpsGame.opponentReady === true) {
                rpsGame.countdown.time--;
            } else {
                rpsGame.countdown.counting = false;
                rpsGame.countdown.time = 5;
                clearInterval(interval);
            }

            if (rpsGame.countdown.time === 0){
                clearInterval(interval);
                evaluateOutcome();
            }
        }, 1000);
    }
});

database.ref("/player2/ready").on("value", function (snapshot) {
    if (rpsGame.player === 1){
        if (snapshot.val() === false) {
            rpsGame.opponentReady = false;
            $("#opponentNotReady").show();
            $("#opponentReady").hide();
        } else if (snapshot.val() === true) {
            rpsGame.opponentReady = true;
            $("#opponentNotReady").hide();
            $("#opponentReady").show();
        }
    }

    if (rpsGame.ready === true && rpsGame.opponentReady === true && rpsGame.countdown.counting === false) {
        rpsGame.countdown.counting = true;

        interval = setInterval(function () {
            if (rpsGame.ready === true && rpsGame.opponentReady === true) {
                rpsGame.countdown.time--;
            } else {
                rpsGame.countdown.counting = false;
                rpsGame.countdown.time = 5;
                clearInterval(interval);
            }

            if (rpsGame.countdown.time === 0){
                clearInterval(interval);
                evaluateOutcome();
            }
        }, 1000);
    }
});