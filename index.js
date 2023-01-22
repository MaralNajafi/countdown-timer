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
        clearBtn.disabled = false;
    }

    if (givenSeconds > 59) {
        DOMseconds.value = 59;
    } 

}

//edit time function
function editTime(e) {
    e.target.removeAttribute("readonly");
    e.target.select();    
}

//start function
function startFn() {
    
    DOMminutes.setAttribute("readonly", "");
    DOMseconds.setAttribute("readonly", "");
    clearBtn.disabled = false;
    DOMcountdown.classList.remove("times-up");
    startBtn.classList.add(displayNone);
    restartBtn.classList.remove(displayNone);
    
    DOMcountdownInps.forEach(DOMcountdownInp => {
        DOMcountdownInp.classList.add("started");
    })
    timeDisplay(givenSeconds, DOMseconds)
    
    computedSeconds= givenSeconds + (secPerMin * givenMinute);
    
    timeDisplay(givenMinute, DOMminutes)
    
    
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


DOMminutes.addEventListener("focus", editTime);
DOMseconds.addEventListener("focus", editTime);
DOMminutes.addEventListener("input", timeValidator);
DOMseconds.addEventListener("input", timeValidator);
startBtn.addEventListener("click", startFn);
restartBtn.addEventListener("click", restartFn);
clearBtn.addEventListener("click", clearFn);
