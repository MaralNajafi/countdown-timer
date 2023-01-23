//Countdown Timer Project

//Variables
const DOMcountdown = document.querySelector(".countdown");
const DOMcountdownInps = document.querySelectorAll(".countdown input");
const DOMminutes = document.querySelector("#minutes");
const DOMseconds = document.querySelector("#seconds");
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const clearBtn = document.querySelector("#clearBtn");
const displayTime = document.querySelector(".countdown-header h2");
const displayMin = document.querySelector("#displayMin");
const displaySec = document.querySelector("#displaySec");


let secPerMin = 60;
let givenMinute;
let givenSeconds;
let seconds;
let countdownInterval;
let isValid;

//CSS class names - variables

const displayNone = "d-none";

//default states
clearBtn.disabled = true;
startBtn.disabled = true;

//functions

// time display function
function timeDisplay(inputTime, outputTime) {

    outputTime.value = inputTime >= 10 ? inputTime : `0${inputTime}`

};

//edit time function
function editTime(e) {
    e.target.removeAttribute("readonly");
    e.target.select();    
}

//time validation
function timeValidator() {

    DOMminutes.value = DOMminutes.value.replace(/[^0-9]/g, "");
    DOMseconds.value = DOMseconds.value.replace(/[^0-9]/g, "");
    
    let DOMminutesVal = +DOMminutes.value;
    let DOMsecondsVal = +DOMseconds.value;

    if (DOMminutesVal === 0 && DOMsecondsVal === 0) {
        startBtn.disabled = true;
    }else{
        startBtn.disabled = false;
        clearBtn.disabled = false;
    }

    if (DOMsecondsVal > 59) {
        DOMseconds.value = 59;
        DOMsecondsVal = 59;
    }

    givenMinute = DOMminutesVal;
    givenSeconds = DOMsecondsVal;

    isValid = true;

};


//displaye initial time function
function displayInitTime(min,sec) {
    displayMin.textContent = min >= 10 ? min : `0${min}`;
    displaySec.textContent = sec >= 10 ? sec : `0${sec}`;
}

//start function
function startFn() {

    if (!isValid) {
        return
    }
    
    DOMminutes.setAttribute("readonly", "");
    DOMseconds.setAttribute("readonly", "");
    clearBtn.disabled = false;
    DOMcountdown.classList.remove("times-up");
    startBtn.classList.add(displayNone);
    restartBtn.classList.remove(displayNone);
    DOMcountdownInps.forEach(DOMcountdownInp => {
        DOMcountdownInp.classList.add("started");
    })
    displayTime.classList.add("op1");


    timeDisplay(givenSeconds, DOMseconds)
    timeDisplay(givenMinute, DOMminutes)
    displayInitTime(givenMinute,givenSeconds);
    
    
    computedSeconds= givenSeconds + (secPerMin * givenMinute);
    
    countdownInterval = setInterval(() =>{
        --computedSeconds;
        minutes = Math.floor(computedSeconds / secPerMin);
        seconds = Math.floor(computedSeconds % secPerMin);
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
    displayTime.classList.remove("op1");

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
    startFn();
};



DOMcountdownInps.forEach(inp => {
    inp.addEventListener("focus", editTime);
    inp.addEventListener("input", timeValidator);
    inp.addEventListener("blur", () =>{
        inp.value = inp.value > 9 ? inp.value : `0${inp.value}`
    })
})
startBtn.addEventListener("click", startFn);
restartBtn.addEventListener("click", restartFn);
clearBtn.addEventListener("click", clearFn);
