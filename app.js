const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const stopBtn = document.querySelector('.btn-stop');
const restartBtn = document.querySelector('.btn-restart');
const timeSelect = document.querySelector('#time-select'); // Fixed selector to use ID
const session = document.querySelector(".minutes");
const secondsDiv = document.querySelector('.seconds');

let myInterval;
let isRunning = false;
let totalSeconds;

const setTimer = (minutes) => {
    totalSeconds = minutes * 60;
    session.textContent = minutes;
    secondsDiv.textContent = '00';
}

// Initialize the timer with the selected value
setTimer(Number(timeSelect.value));

timeSelect.addEventListener('change', () => {
    if(!isRunning){
        setTimer(Number(timeSelect.value));
    }
}) 

const appTimer = () => {
    if (!isRunning && totalSeconds > 0) {
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
    setTimer(Number(timeSelect.value));
};

startBtn.addEventListener('click', appTimer);
stopBtn.addEventListener('click', stopTimer);
restartBtn.addEventListener('click', restartTimer)