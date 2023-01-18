//Countdown Timer Project

//Variables
const DOMcountdown = document.querySelector(".countdown");
const DOMminutes = document.querySelector("#minutes");
const DOMseconds = document.querySelector("#seconds");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const clearBtn = document.querySelector("#clearBtn");


let secPerMin = 60;
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
        outputTime.value = inputTime;
    }else{
        outputTime.value = `0${inputTime}`;
    }
};


//set time function
function setTime() {
    DOMminutes.removeAttribute("readonly");
    DOMminutes.classList.remove("edit-time");
}

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

    clearInterval(countdownInterval);
    
    givenSeconds = secPerMin * givenMinute;

    minutes = Math.floor(givenSeconds / secPerMin);

    seconds = Math.floor(givenSeconds % secPerMin);

    timeDisplay(minutes, DOMminutes);
    timeDisplay(seconds, DOMseconds);

    clearInterval(countdownInterval);
}

//reset function
function resetFn() {
    clearFn();
    startFn();
};


DOMminutes.addEventListener("focus", setTime)
startBtn.addEventListener("click", startFn);
resetBtn.addEventListener("click", resetFn);
clearBtn.addEventListener("click", clearFn);
