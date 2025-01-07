/*************************** Timer function (progress-top) ****************************/
export {timeResult, startTimer, stopTimer}


let timeInSeconds: number = 0 // Reset the time
let timerInterval: number | null = null //
const timeSpan = document.querySelector('#timeSpan') as HTMLSpanElement
let timeResult: string // Variable for the result of the timer

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
    timeInSeconds++ // Increases by 1 second
    updateTimerSpan()
}
function updateTimerSpan() {
    timeSpan.innerHTML = formatTime(timeInSeconds)
}
 
// Prepared to use later, STOPS the timer (button: Exit)
// Change button

// const quitGameBtn = document.querySelector('#quitGameBtn') as HTMLElement

// quitGameBtn.addEventListener('click', stopTimer)

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval)
    }
    timeResult = formatTime(timeInSeconds)
} 
