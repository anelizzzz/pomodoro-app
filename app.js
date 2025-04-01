document.addEventListener('DOMContentLoaded', function() {
    // Audio and DOM elements
    const bells = new Audio('./sounds/bell.wav');
    const timeSelect = document.querySelector('#time-select');
    const confirmTimeBtn = document.querySelector('#confirm-time-btn');
    const timeSelectionScreen = document.querySelector('#time-selection-screen');
    const timerScreen = document.querySelector('#timer-screen');
    const startBtn = document.querySelector('.btn-start');
    const stopBtn = document.querySelector('.btn-stop');
    const restartBtn = document.querySelector('.btn-restart');
    const timeBtn = document.querySelector('.btn-time');
    const session = document.querySelector(".minutes");
    const secondsDiv = document.querySelector('.seconds');

    // Timer state variables
    let myInterval;
    let isRunning = false;
    let totalSeconds;

    // Function to set the timer based on minutes
    const setTimer = (minutes) => {
        totalSeconds = minutes * 60;
        session.textContent = minutes;
        secondsDiv.textContent = '00';
    }

    // Initialize the timer with the selected value
    setTimer(Number(timeSelect.value));

    // Ensure the timer screen is hidden initially
    timerScreen.style.display = 'none';
    timeSelectionScreen.style.display = 'block';

    // Handle confirm button click
    confirmTimeBtn.addEventListener('click', function() {
        console.log("Confirm button clicked");
        
        // Set the timer based on selection
        setTimer(Number(timeSelect.value));
        
        // Hide time selection screen and show timer screen
        timeSelectionScreen.style.display = 'none';
        timerScreen.style.display = 'block';
    });

    // Handle time button click
    timeBtn.addEventListener('click', function() {
        console.log("Time button clicked");
        
        // Stop the timer if it's running
        if (isRunning) {
            stopTimer();
        }
        
        // Show time selection screen and hide timer screen
        timeSelectionScreen.style.display = 'block';
        timerScreen.style.display = 'none';
    });

    // Timer functionality
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

    // Event listeners for timer controls
    startBtn.addEventListener('click', appTimer);
    stopBtn.addEventListener('click', stopTimer);
    restartBtn.addEventListener('click', restartTimer);
});