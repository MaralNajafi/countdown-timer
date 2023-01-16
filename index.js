//Countdown Timer Project

//Variables
const DOMcountdown = document.querySelector(".countdown");
const DOMminutes = document.querySelector("#minutes");
const DOMseconds = document.querySelector("#seconds");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const clearBtn = document.querySelector("#clearBtn");


let secPerMin = 5;
let givenMinute = 2;
let givenSeconds;
let minutes;
let seconds;
let countdownInterval;

//CSS class names - variables

const displayNone = "d-none";

//default states
clearBtn.disabled = true;

//functions

// time display function
function timeDisplay(inputTime, outputTime) {
    if (inputTime >= 10) {
        outputTime.textContent = inputTime;
    }else{
        outputTime.textContent = `0${inputTime}`;
    }
};

//start function
function startFn() {

    clearBtn.disabled = false;

    DOMcountdown.classList.remove("times-up");
    startBtn.classList.add(displayNone);
    resetBtn.classList.remove(displayNone);

    givenSeconds = secPerMin * givenMinute;
    countdownInterval = setInterval(() =>{
        --givenSeconds;
        minutes = Math.floor(givenSeconds / secPerMin);
        seconds = Math.floor(givenSeconds % secPerMin);
        timeDisplay(minutes, DOMminutes)
        timeDisplay(seconds, DOMseconds)
        
        if (minutes === 0 && seconds === 0) {
            clearInterval(countdownInterval);
            DOMcountdown.classList.add("times-up");
        }
    }, 1000)

};

//clear function
function clearFn() {

    clearBtn.disabled = true;

    DOMcountdown.classList.remove("times-up");
    startBtn.classList.remove(displayNone);
    resetBtn.classList.add(displayNone);

    DOMminutes.textContent = "02";
    DOMseconds.textContent = "00";
    clearInterval(countdownInterval);
    givenSeconds = secPerMin * givenMinute;
    clearInterval(countdownInterval);
}

//reset function
function resetFn() {
    clearFn();
    startFn();
};



startBtn.addEventListener("click", startFn);
resetBtn.addEventListener("click", resetFn);
clearBtn.addEventListener("click", clearFn);
