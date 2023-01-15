//Countdown Timer Project

//Variables
const DOMminutes = document.querySelector("#minutes");
const DOMseconds = document.querySelector("#seconds");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");


let secPerMin = 60;
let givenMinute = 2;
let givenSeconds = secPerMin * givenMinute;
let countdownInterval;

//CSS class names - variables

const displayNone = "d-none";

//functions

// time display function
function timeDisplay(inputTime, outputTime) {
    if (inputTime >= 10) {
        outputTime.textContent = inputTime;
    }else{
        outputTime.textContent = `0${inputTime}`;
    }
}

//start function
function startFn() {
    startBtn.classList.add(displayNone);
    resetBtn.classList.remove(displayNone);
    countdownInterval = setInterval(() =>{
        --givenSeconds;
        minutes = Math.floor(givenSeconds / secPerMin);
        seconds = Math.floor(givenSeconds % secPerMin);
        timeDisplay(minutes, DOMminutes)
        timeDisplay(seconds, DOMseconds)
        
        if (minutes === 0 && seconds === 0) {
            clearInterval(countdownInterval);
        }
    }, 1000)

}

startBtn.addEventListener("click", startFn)