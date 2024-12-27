export {startGame, landingPage};
import '../css/style.scss';
import * as questionBox from './question-box.ts';
import * as progressTop from './progress-top.ts';

//-----------------------------------------------------------------------
//------------------------- Landing page --------------------------------
//-----------------------------------------------------------------------

// Variabel för username
let username;
const landingPage = document.querySelector('#landingPage') as HTMLElement;

// Hämtar inputfält och start game btn
const usernameInput = document.querySelector('#usernameInput') as HTMLInputElement;
const startGameBtn = document.querySelector('#startGameBtn') as HTMLButtonElement;

// Klickevent på starta spel
startGameBtn.addEventListener('click', startGame);

//-----------------------------------------------------------------------
//---------------------------- Starta spelet ----------------------------
//-----------------------------------------------------------------------

function startGame() {
    username = usernameInput.value;
    if (username.length === 0) {
        // TODO: Kanske ge användaren feedback genom en annan metod än alert?
        alert('Du måste ange ett användarnamn!');
        return;
    }

    landingPage.classList.add('hidden');
    questionBox.gamePage.classList.remove('hidden');

    progressTop.startTimer();

    questionBox.showQuestion();
}
