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

    givenMinute = +DOMminutes.value.replace(/[^0-9]/g, "");
    givenSeconds = +DOMseconds.value.replace(/[^0-9]/g, "");

    if (givenMinute === 0 && givenSeconds === 0) {
        startBtn.disabled = true;
    }else{
        startBtn.disabled = false; 
    }

    if (givenSeconds > 60) {
        DOMseconds.value = 60;
    } 

}

//set time function
function editTime(e) {
    e.target.removeAttribute("readonly");
    e.target.classList.remove("edit-time");
    e.target.select();    
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
    timeDisplay(givenSeconds, DOMseconds)
    
    givenSeconds= givenSeconds + (secPerMin * givenMinute);
    
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


DOMminutes.addEventListener("focus", editTime);
DOMseconds.addEventListener("focus", editTime);
DOMminutes.addEventListener("input", timeValidator);
DOMseconds.addEventListener("input", timeValidator);
startBtn.addEventListener("click", startFn);
restartBtn.addEventListener("click", restartFn);
clearBtn.addEventListener("click", clearFn);
