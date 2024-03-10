const stopWatchApp = document.querySelector('.js-Stop-Watch');
stopWatchApp.addEventListener('click', initializeStopwatch);

const timerApp = document.querySelector('.js-timer');
timerApp.addEventListener('click', initializeCountdownTimer);

let stopwatchHours = 0;
let stopwatchMinutes = 0;
let stopwatchSeconds = 0;
let stopwatchTimer;
let isStopwatchRunning = false;

let countdownHours = 0;
let countdownMinutes = 0;
let countdownSeconds = 0;
let countdownTimer;
let isCountdownRunning = false;
let isCountdownPaused = false;

function initializeStopwatch() {
    const container = document.querySelector('.container');
    container.innerHTML = `<h1 class="header">Stopwatch</h1>
        <h2 class="js-timer displayed-time">00:00:00</h2>
        <div class="controls">
            <button class="control js-start-timer">Start</button>
            <button class="control js-stop-timer">Stop</button>
            <button class="control js-reset-timer">Reset</button>
        </div>
        <div class="progress-bar">
            <div class="progress"></div>
        </div>
        <div class="message"></div>`;
    
    document.querySelector('.js-start-timer').addEventListener('click', startStopwatch);
    document.querySelector('.js-stop-timer').addEventListener('click', stopStopwatch);
    document.querySelector('.js-reset-timer').addEventListener('click', resetStopwatch);
}

function initializeCountdownTimer() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <h1 class="header">Countdown Timer</h1>
        <div class="item-center">
            <input type="number" class="durationInput input-field" placeholder="Enter duration in seconds">
        </div>
        <div class="item-center">
            <button class="js-start-timer-app control">Start</button>
        </div>
        <h2 class="timerDisplay displayed-time">00:00:00</h2>
        <div class="progress-bar">
            <div class="progress"></div>
        </div>
    `;
    document.querySelector('.js-start-timer-app').addEventListener('click', startCountdownTimer);
}

function startCountdownTimer() {
    let durationInput = document.querySelector('.durationInput').value;
    let duration = parseInt(durationInput);
    if (isNaN(duration) || duration <= 0) {
        alert('Please enter a valid duration in seconds.');
        return;
    }
    countdownHours = Math.floor(duration / 3600);
    countdownMinutes = Math.floor((duration % 3600) / 60);
    countdownSeconds = duration % 60;
    displayTime('.timerDisplay', countdownHours, countdownMinutes, countdownSeconds);
    countdownTimer = setInterval(updateCountdownTimer, 1000);
    document.querySelector('.container').innerHTML += `
        <div class="item-center">
            <button class="js-pause-timer control">Pause</button>
            <button class="js-reset-timer control">Reset</button>
        </div>
    `;
    document.querySelector('.js-pause-timer').addEventListener('click', pauseCountdownTimer);
    document.querySelector('.js-reset-timer').addEventListener('click', resetCountdownTimer);
}

function pauseCountdownTimer() {
    clearInterval(countdownTimer);
    document.querySelector('.container').innerHTML += `
        <div class="item-center">
            <button class="js-resume-timer control">Resume</button>
        </div>
    `;
    document.querySelector('.js-resume-timer').addEventListener('click', resumeCountdownTimer);
}

function resumeCountdownTimer() {
    countdownTimer = setInterval(updateCountdownTimer, 1000);
    document.querySelector('.container').removeChild(document.querySelector('.item-center'));
}

function resetCountdownTimer() {
    clearInterval(countdownTimer);
    initializeCountdownTimer();
}

function updateCountdownTimer() {
    if (countdownSeconds === 0 && countdownMinutes === 0 && countdownHours === 0) {
        clearInterval(countdownTimer);
        alert('Timer expired!');
    } else {
        countdownSeconds--;
        if (countdownSeconds < 0) {
            countdownSeconds = 59;
            countdownMinutes--;
            if (countdownMinutes < 0) {
                countdownMinutes = 59;
                countdownHours--;
            }
        }
        displayTime('.timerDisplay', countdownHours, countdownMinutes, countdownSeconds);
        updateProgressBar('.progress', getProgress(countdownSeconds));
    }
}

function displayTime(selector, hours, minutes, seconds) {
    const display = document.querySelector(selector);
    display.innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function updateProgressBar(selector, progress) {
    const progressBar = document.querySelector(selector);
    progressBar.style.width = progress + '%';
}

function getProgress(seconds) {
    return ((60 - seconds) / 60) * 100;
}
