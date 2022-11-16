let start = document.querySelector('.start');
let namnSida = document.querySelector('.name');
let namnInmatning = document.querySelector('#namn');
let spel = document.querySelector('.game');
let playerName = "";

var gameMusic = new Audio("/FE22-js1-mp2-viktor-johansson/audio/vijoh - gameaudio.mp3");
gameMusic.volume = 0.3;
var roundSound;

start.addEventListener('click', (e) => {
    if (namnInmatning.value === "") {
        return;
    }
    e.preventDefault();
    namnSida.style.display = "none";
    spel.style.display = "flex";
    document.body.display = "block";
    const uppercase = namnInmatning.value.charAt(0).toUpperCase()
        + namnInmatning.value.slice(1);
    playerName = uppercase;
    gameMusic.play();

    select.classList.add("hoverable");
});

let computerImg = document.querySelectorAll('.computer img');
let computerH1 = document.querySelectorAll('.computer h1');
let scoreboard = document.querySelectorAll('.score h1');
let title = document.querySelector('.title');
let imgNr = 0;
let spinDelay = 5000;
let intervalID;
let times = 0;
let msgNbr = 0;

function resetSpin() {
    imgNr = 0;
    spinDelay = 5000;
    intervalID;
    times = 0;
    clearInterval(intervalID);
    setTimeout(() => {
        isSelected = false;
        selected.style.filter = "brightness(100%)"
        selected.style.borderBottom = "none";
        computerH1[1].style.color = "rgba(255, 255, 255, 0)";
        computerH1[0].style.color = "rgba(255, 255, 255, 0)";
        computerH1[1].innerText = "You won!";
        gameMusic.volume = "0.3";
        select.classList.add("hoverable");

    }, 2000);

}

let winMsg = ["I'm the winner!", "I'm better.", "I'm Stronger", "You cant beat me!"]
let playerScore = 0;
let computerScore = 0;
let resetGame = false;

document.addEventListener('click', function (e) {
    if (resetGame) {
        reset();
    }
});

function reset() {
    title.innerText = "";
    playerScore = 0;
    computerScore = 0;
    scoreboard[1].innerText = "";
    scoreboard[2].innerText = "";
    title.style.padding = "0";
    resetGame = false;
}

function spin() {
    gameMusic.play();
    intervalID = setInterval(spinChoices, (Math.random(50) * 50) + 30);
    setTimeout(() => {
        msgNbr++;
        if (msgNbr >= 3) {
            msgNbr = 0;
        }
        if (getWinner() == "player") {
            computerH1[1].style.color = "white";
            playerScore++;
            roundSound = new Audio("/FE22-js1-mp2-viktor-johansson/audio/win sound.mp3");
            roundSound.volume = 0.1;
            roundSound.play();
        } else if (getWinner() == "computer") {
            computerH1[0].style.color = "white";
            computerH1[0].innerText = "Computer: " + winMsg[msgNbr];
            roundSound = new Audio("/FE22-js1-mp2-viktor-johansson/audio/game over.mp3");
            roundSound.volume = 0.1;
            roundSound.play();
            computerScore++;
        } else {
            computerH1[1].innerText = "Draw";
            computerH1[1].style.color = "white";
        }
        if (playerScore >= 3 || computerScore >= 3) {
            winnerMessage();
            resetGame = true;
        }
        scoreboard[0].style.visibility = "visible";
        scoreboard[1].innerText = playerName + ": " + playerScore;
        scoreboard[2].innerText = "Computer: " + computerScore;
        resetSpin();

    }, spinDelay);
}

function winnerMessage() {
    roundSound.volume = 0.3;
    if (computerScore > playerScore) {
        title.innerText = "You Loose."
        roundSound = new Audio("/FE22-js1-mp2-viktor-johansson/audio/game over.mp3");
        roundSound.play();
    } else if (computerScore == playerScore) {
        title.innerText = "Draw."
        roundSound = new Audio("/FE22-js1-mp2-viktor-johansson/audio/game over.mp3");
        roundSound.play();
    } else {
        title.innerText = "You Win!"
        roundSound = new Audio("/FE22-js1-mp2-viktor-johansson/audio/win sound.mp3");
        roundSound.play();
    }
    title.style.padding = "0 5rem 0 5rem";
    gameMusic.play();
}

let computer;
let currItem;

function spinChoices() {
    if (imgNr > 2) {
        imgNr = 0;
    }
    if (times >= 5 && times < 12) {
        clearInterval(intervalID);
        intervalID = setInterval(spinChoices, ((Math.random(100) * 100) + 50));

    } else if (times >= 12) {
        clearInterval(intervalID);
        intervalID = setInterval(spinChoices, ((Math.random(100) * 100) + 100));
    }

    computerImg[0].src = `/FE22-js1-mp2-viktor-johansson/img/img${imgNr}.png`;
    let list = ["sten", "sax", "påse"];
    computer = list[imgNr];
    imgNr++;
    times++;

    var snd = new Audio("/FE22-js1-mp2-viktor-johansson/audio/spin.wav");
    snd.volume = 0.07;
    snd.play();


}
let select = document.querySelector('.player-choices');
let isSelected = false;
let selected;

select.addEventListener('click', (e) => {

    if (!isSelected) {
        e.target.style.filter = "brightness(90%)"
        e.target.style.borderBottom = "solid 1px black";
        selected = e.target;
        computerImg[1].src = e.target.src;
        currItem = e.target.id;
        gameMusic.volume = "0.1";
        select.classList.remove("hoverable");
        spin();
        isSelected = true;
    }
});

function getWinner() {
    if ((computer == "sten" && currItem == "påse") || (computer == "påse" && currItem == "sax") || (computer == "sax" && currItem == "sten")) {
        return "player";
    } else if (computer != currItem) {
        return "computer";
    }
}



