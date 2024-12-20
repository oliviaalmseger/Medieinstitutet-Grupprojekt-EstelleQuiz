import '../css/style.scss'
import * as questionBox from './question-box.ts'
import * as progressTop from './progress-top.ts'

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
    username = usernameInput.value
    if (username.length === 0) {
        alert('Du måste ange ett användarnamn!')
        return
    }

    console.log('Användarnamn: ' + username)

    landingPage.classList.add('hidden')
    questionBox.gamePage.classList.remove('hidden')

    progressTop.startTimer()

    // Anropa: starta timer + visa timer
    // Glöm inte att timer ska stoppa när klickar "gå vidare" efter fråga 10.
    // funktion: Starta poängräkning
    // funktion: starta + visa frågeräkning
    // funktion: visa frågor + svarsalternativ

    questionBox.showQuestion()
}
