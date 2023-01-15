//Countdown Timer Project

//Variables
const DOMminutes = document.querySelector("#minutes");
const DOMseconds = document.querySelector("#seconds");
const startBtn = document.querySelector("#startBtn");

let secPerMin = 60;
let givenMinute = 2;
let givenSeconds = secPerMin * givenMinute;
let countdownInterval;


//functions
function startFn() {
    countdownInterval = setInterval(() =>{
        --givenSeconds;
        minutes = Math.floor(givenSeconds / secPerMin);
        seconds = Math.floor(givenSeconds % secPerMin);
        DOMminutes.textContent = minutes;
        DOMseconds.textContent = seconds;
        
        if (minutes === 0 && seconds === 0) {
            clearInterval(countdownInterval);
        }
    }, 1000)

}

startBtn.addEventListener("click", startFn)