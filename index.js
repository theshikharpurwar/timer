const stopWatch = document.querySelector('.js-Stop-Watch');
stopWatch.addEventListener('click', () => {
    const container = document.querySelector('.container');
    container.innerHTML = `<h1 class="header">Stop-Watch</h1>
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
});

let hours = 0;
let minutes = 0;
let seconds = 0;
let timer;
let isRunning = false;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    minutes = 0;
    hours = 0;
    dispalyTime();
    updateProgressBar(0);
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    } else if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    dispalyTime();
    updateProgressBar(getProgress());
}

function dispalyTime() {
    document.querySelector('.js-timer').innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function formatTime(time) {
    if (time < 10) {
        return '0' + time;
    } else {
        return '' + time;
    }
}

function updateProgressBar(progress) {
    const progressBar = document.querySelector('.progress');
    progressBar.style.width = progress + '%';
}

function getProgress() {
    return (seconds / 60) * 100; 
}

document.querySelector('.js-start-timer').addEventListener('click', startTimer);
document.querySelector('.js-stop-timer').addEventListener('click', stopTimer);
document.querySelector('.js-reset-timer').addEventListener('click', resetTimer);