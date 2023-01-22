//Countdown Timer Project

//Variables
const DOMcountdown = document.querySelector(".countdown");
const DOMcountdownInps = document.querySelectorAll(".countdown input");
const DOMminutes = document.querySelector("#minutes");
const DOMseconds = document.querySelector("#seconds");
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const clearBtn = document.querySelector("#clearBtn");


let secPerMin = 60;
let givenMinute;
let givenSeconds;
let seconds;
let countdownInterval;

//CSS class names - variables

const displayNone = "d-none";

//default states
clearBtn.disabled = true;
startBtn.disabled = true;

//functions

// time display function
function timeDisplay(inputTime, outputTime) {
    if (inputTime >= 10) {
        outputTime.value = inputTime;
    }else{
        outputTime.value = `0${inputTime}`;
    }
};

//time validation
function timeValidator() {
    DOMminutes.value = DOMminutes.value.replace(/[^0-9]/g, "");
    givenMinute = +DOMminutes.value;
    if (givenMinute === 0) {
        startBtn.disabled = true;
    }else{
        startBtn.disabled = false;
    }

    /* if (givenMinute > 60) {
        DOMminutes.value = 60;
    } */

}

//set time function
function setTime() {
    DOMminutes.removeAttribute("readonly");
    DOMminutes.classList.remove("edit-time");
    
}

//start function
function startFn() {
     
    DOMminutes.setAttribute("readonly", "");
    clearBtn.disabled = false;
    DOMminutes.classList.remove("edit-time");
    DOMcountdown.classList.remove("times-up");
    startBtn.classList.add(displayNone);
    restartBtn.classList.remove(displayNone);

    DOMcountdownInps.forEach(DOMcountdownInp => {
        DOMcountdownInp.classList.add("started");
    })

    givenSeconds = secPerMin * givenMinute;
    timeDisplay(givenMinute, DOMminutes)
    

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
    startBtn.disabled = true;
    
    DOMminutes.setAttribute("readonly", false);
    DOMminutes.classList.add("edit-time");
    DOMcountdown.classList.remove("times-up");
    startBtn.classList.remove(displayNone);
    restartBtn.classList.add(displayNone);

    DOMcountdownInps.forEach(DOMcountdownInp => {
        DOMcountdownInp.classList.remove("started");
    })
    
    givenSeconds = secPerMin * givenMinute;

    DOMminutes.value = "00"
    DOMseconds.value = "00"


    clearInterval(countdownInterval);
}

//restart function
function restartFn() {
    clearInterval(countdownInterval);
    DOMseconds.value = "00"
    startFn();
};


DOMminutes.addEventListener("focus", setTime)
DOMminutes.addEventListener("input", timeValidator)
startBtn.addEventListener("click", startFn);
restartBtn.addEventListener("click", restartFn);
clearBtn.addEventListener("click", clearFn);
