/*************************** Timer function (progress-top) ****************************/
export {timeResult, startTimer, stopTimer}


let timeInSeconds: number = 0 // Nollställ tiden
let timerInterval: number | null = null //
const timeSpan = document.querySelector('#timeSpan') as HTMLSpanElement
let timeResult: string // Variabel för timerresultatet

function formatTime(seconds: number): string {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0')
    const sec = String(seconds % 60).padStart(2, '0')
    return `${min}:${sec}`
}
function startTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval)
    }
    timeInSeconds = 0
    updateTimerSpan()

    timerInterval = setInterval(timerCount, 1000)
}

function timerCount() {
    timeInSeconds++ //Ökar med 1 sekund
    updateTimerSpan()
}
function updateTimerSpan() {
    timeSpan.innerHTML = formatTime(timeInSeconds)
}
 
// Förberett för att använda senare, STOPPAR timern (knapp: Avsluta)
// Byt knapp

// const quitGameBtn = document.querySelector('#quitGameBtn') as HTMLElement

// quitGameBtn.addEventListener('click', stopTimer)

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval)
    }
    timeResult = formatTime(timeInSeconds)
} 
