const container = document.querySelector('.js-container');

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
        </div>
        <div class="progress-bar">
            <div class="progress"></div>
        </div>
        <div class="message"></div>
        <button class="button-27 js-back">Back</button>`;
    
    document.querySelector('.js-start-timer').addEventListener('click', startStopwatch);
    document.querySelector('.js-back').addEventListener('click', returnToSelection);
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
        <button class="button-27 js-back">Back</button>
    `;
    document.querySelector('.js-start-timer-app').addEventListener('click', startCountdownTimer);
    document.querySelector('.js-back').addEventListener('click', returnToSelection);
}

function returnToSelection() {
    container.innerHTML = `<h1 class="header">Choose from the Following</h1>
        <div class="controls" style="margin-top: 100px;">
            <button class="button-27 js-Stop-Watch">Stop-Watch</button>
            <button class="button-27 js-timer">Timer</button>
        </div>`;
    
    const stopWatchApp = document.querySelector('.js-Stop-Watch');
    stopWatchApp.addEventListener('click', initializeStopwatch);
    
    const timerApp = document.querySelector('.js-timer');
    timerApp.addEventListener('click', initializeCountdownTimer);
}

function startStopwatch() {
    if (!isStopwatchRunning) {
        isStopwatchRunning = true;
        stopwatchTimer = setInterval(updateStopwatch, 1000);
        const controls = document.querySelector('.controls');
        controls.innerHTML = `
            <button class="control js-pause-timer">Pause</button>
            <button class="control js-reset-timer">Reset</button>
        `;
        document.querySelector('.js-pause-timer').addEventListener('click', pauseStopwatch);
        document.querySelector('.js-reset-timer').addEventListener('click', resetStopwatch);
    }
}

function stopStopwatch() {
    clearInterval(stopwatchTimer);
    isStopwatchRunning = false;
}

function pauseStopwatch() {
    clearInterval(stopwatchTimer);
    isStopwatchRunning = false;
    const controls = document.querySelector('.controls');
    controls.innerHTML = `
        <button class="control js-start-timer">Start</button>
    `;
    document.querySelector('.js-start-timer').addEventListener('click', startStopwatch);
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchSeconds = 0;
    stopwatchMinutes = 0;
    stopwatchHours = 0;
    displayTime('.js-timer', stopwatchHours, stopwatchMinutes, stopwatchSeconds);
    updateProgressBar('.progress', 0);
    const controls = document.querySelector('.controls');
    controls.innerHTML = `
        <button class="control js-start-timer">Start</button>
    `;
    document.querySelector('.js-start-timer').addEventListener('click', startStopwatch);
}

function updateStopwatch() {
    stopwatchSeconds++;
    if (stopwatchSeconds === 60) {
        stopwatchSeconds = 0;
        stopwatchMinutes++;
    }
    if (stopwatchMinutes === 60) {
        stopwatchMinutes = 0;
        stopwatchHours++;
    }
    displayTime('.js-timer', stopwatchHours, stopwatchMinutes, stopwatchSeconds);
    updateProgressBar('.progress', getProgress(stopwatchSeconds));
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
    const itemCenter = document.querySelector('.item-center');
    itemCenter.innerHTML = `
        <button class="js-pause-timer control">Pause</button>
        <button class="js-reset-timer control">Reset</button>
    `;
    document.querySelector('.js-pause-timer').addEventListener('click', pauseCountdownTimer);
    document.querySelector('.js-reset-timer').addEventListener('click', resetCountdownTimer);
    document.querySelector('.js-start-timer-app').remove(); // Remove the "Start" button
}

function pauseCountdownTimer() {
    clearInterval(countdownTimer);
    isCountdownPaused = true;
    const itemCenter = document.querySelector('.item-center');
    itemCenter.innerHTML = `
        <button class="js-resume-timer control">Resume</button>
        <button class="js-reset-timer control">Reset</button>
    `;
    document.querySelector('.js-resume-timer').addEventListener('click', resumeCountdownTimer);
    document.querySelector('.js-reset-timer').addEventListener('click', resetCountdownTimer);
}

function resumeCountdownTimer() {
    isCountdownPaused = false;
    countdownTimer = setInterval(updateCountdownTimer, 1000);
    const itemCenter = document.querySelector('.item-center');
    itemCenter.innerHTML = `
        <button class="js-pause-timer control">Pause</button>
        <button class="js-reset-timer control">Reset</button>
    `;
    document.querySelector('.js-pause-timer').addEventListener('click', pauseCountdownTimer);
    document.querySelector('.js-reset-timer').addEventListener('click', resetCountdownTimer);
}

function resetCountdownTimer() {
    clearInterval(countdownTimer);
    initializeCountdownTimer();
}

function updateCountdownTimer() {
    if (countdownSeconds === 0 && countdownMinutes === 0 && countdownHours === 0) {
        clearInterval(countdownTimer);
        initializeCountdownTimer(); // Prompt for a new countdown time
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
