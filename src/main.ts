import '../css/style.scss'

/*************************** Landing page ****************************/
//variabel för username
let username
const landingPage = document.querySelector('#landingPage') as HTMLElement

// hämtar inputfält och start game btn
const usernameInput = document.querySelector(
    '#usernameInput'
) as HTMLInputElement
const startGameBtn = document.querySelector(
    '#startGameBtn'
) as HTMLButtonElement

// klickevent på starta spel
startGameBtn.addEventListener('click', startGame)

export function startGame() {

    username = usernameInput.value;
    if (username.length === 0) {
        alert('Du måste ange ett användarnamn!')
        return
    }

    console.log('Användernamn: ' + username)

    landingPage.classList.add('hidden')

    startTimer()

    // Anropa: starta timer + visa timer
    // Glöm inte att timer ska stoppa när klickar "gå vidare" efter fråga 10.
    // funktion: Starta poängräkning
    // funktion: starta + visa frågeräkning
    // funktion: visa frågor + svarsalternativ
  
    questionBox.showQuestion();
}

/*************************** Timer function (progress-top) ****************************/

let timeInSeconds: number = 0 // Nollställ tiden
let timerInterval: number | null = null //
const timeSpan = document.querySelector('#timeSpan') as HTMLSpanElement
/* let timeResult // Variabel för timerresultatet */

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

/* Förberett för att använda senare, STOPPAR timern (knapp: Avsluta) 
// Byt knapp

const quitGameBtn = document.querySelector('#quitGameBtn') as HTMLElement

quitGameBtn.addEventListener('click', stopTimer)

function stopTimer() {
    if (timerInterval !== null) {
        clearInterval(timerInterval)
    }
    timeResult = formatTime(timeInSeconds)
    console.log(timeResult)
}

*/
