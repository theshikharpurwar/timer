let hours = 0;
let minutes = 0;
let seconds = 0;
let timer;

let isRunning = false;

function startTimer() {
    istRunning = true;
    const button = document.querySelector('.js-start-timer');
    button.addEventListener('click', () => {
        timer = setInterval(updateTimer, 1000);
    })
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
    document.querySelector('.js-time')
     .innerText = hours + ':' + minutes + ':' + seconds;
}

function stopTimer() {
    isRunning = false;
    clearInterval(timer);
}