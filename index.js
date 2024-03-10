const stopWatchApp = document.querySelector('.js-Stop-Watch');
stopWatchApp.addEventListener('click', () => {
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

    document.querySelector('.js-start-timer').addEventListener('click', startTimer);
    document.querySelector('.js-stop-timer').addEventListener('click', stopTimer);
    document.querySelector('.js-reset-timer').addEventListener('click', resetTimer);
});

const timerApp = document.querySelector('.js-timer');
timerApp.addEventListener('click', () => {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <h1>Countdown Timer</h1>
        <input type="number" class="durationInput" placeholder="Enter duration in seconds">
        <button class="js-start-timer-app">Start</button>
        <h2 class="timerDisplay">00:00:00</h2>
    `;
    document.querySelector('.js-start-timer-app').addEventListener('click', startTimerApp);
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

let timerBack;

function startTimerApp() {
    let durationInput = document.querySelector('.durationInput').value;
    let duration = parseInt(durationInput);
    
    if (isNaN(duration) || duration <= 0) {
        alert('Please enter a valid duration in seconds.');
        return;
    }
    
    timerBack = setInterval(function() {
        let hours = Math.floor(duration / 3600);
        let minutes = Math.floor((duration % 3600) / 60);
        let seconds = duration % 60;
        document.querySelector('.timerDisplay').innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
        
        duration--;
        
        if (duration < 0) {
            clearInterval(timerBack);
            alert('Timer expired!');
        }
    }, 1000);
}
