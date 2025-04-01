const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const stopBtn = document.querySelector('.btn-stop');
const restartBtn = document.querySelector('.btn-restart');
const session = document.querySelector(".minutes");
const secondsDiv = document.querySelector('.seconds');

let myInterval;
let isRunning = false;
let totalSeconds;
let originalSessionAmount = Number.parseInt(session.textContent); // Store original session time

totalSeconds = originalSessionAmount * 60;

const appTimer = () => {
    if (!isRunning) {
        isRunning = true;

        myInterval = setInterval(() => {
            if (totalSeconds <= 0) { 
                bells.play();
                clearInterval(myInterval);
                isRunning = false;
                return;
            }

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            session.textContent = minutesLeft;
            secondsDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;

            totalSeconds--; 
        }, 1000);

    } 
};


const stopTimer = () => {
    clearInterval(myInterval);
    isRunning = false;
};

const restartTimer = () => {
    clearInterval(myInterval);
    isRunning = false;
    totalSeconds = originalSessionAmount * 60;

    session.textContent = originalSessionAmount;
    secondsDiv.textContent = '00';
};

startBtn.addEventListener('click', appTimer);
stopBtn.addEventListener('click', stopTimer);
restartBtn.addEventListener('click', restartTimer);

