let hours = 0;
let minutes = 0;
let seconds = 0;
let timer;
let isRunning = false;

function startTimer() {
    if(!(isRunning)){
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer(){
    stopTimer();
    seconds = 0;
    minutes = 0;
    hours = 0;
    dispalyTime();
}

function updateTimer() {
    seconds++;
    if(seconds ===  60){
        seconds = 0;
        minutes++;
    }
    else if(minutes === 60) {
        minutes = 0;
        hours++;
    }
    dispalyTime();
}

function dispalyTime() {
    document.querySelector('.js-timer').innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function formatTime(time){
    if(time < 10){
        return '0' + time;
    }
    else{
        return '' + time;
    }
}

document.querySelector('.js-start-timer').addEventListener('click',startTimer);
document.querySelector('.js-stop-timer').addEventListener('click',stopTimer);
document.querySelector('.js-reset-timer').addEventListener('click',resetTimer);