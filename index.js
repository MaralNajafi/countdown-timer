//Countdown Timer Project

//Variables
const DOMminutes = document.querySelector("#minutes");
const DOMseconds = document.querySelector("#seconds");
const startBtn = document.querySelector("#startBtn");

let secPerMin = 60;
let givenMinute = 2;
let givenSeconds = secPerMin * givenMinute;
let countdownInterval;

function startFn() {
    countdownInterval = setInterval(() =>{
        --givenSeconds;
        let minutes = Math.floor(givenSeconds / secPerMin);
        let seconds = Math.floor(givenSeconds % secPerMin);
    
        DOMminutes.textContent = minutes;
        DOMseconds.textContent = seconds;
        
    }, 1000)
}

startBtn.addEventListener("click", startFn)