export {startGame, landingPage};
import '../css/style.scss';
import * as questionBox from './question-box.ts';
import * as progressTop from './progress-top.ts';

//-----------------------------------------------------------------------
//------------------------- Landing page --------------------------------
//-----------------------------------------------------------------------

// Variable for username
let username;
const landingPage = document.querySelector('#landingPage') as HTMLElement;

// Fetch input field and start game btn
const usernameInput = document.querySelector('#usernameInput') as HTMLInputElement;
const startGameBtn = document.querySelector('#startGameBtn') as HTMLButtonElement;

// Click event on start game
startGameBtn.addEventListener('click', startGame);

usernameInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        startGame();
    }
});

//-----------------------------------------------------------------------
//---------------------------- Start game ----------------------------
//-----------------------------------------------------------------------

function startGame() {
    username = usernameInput.value;
    if (username.length === 0) {
        alert('Du måste ange ett användarnamn!');
        return;
    }

    landingPage.classList.add('hidden');
    questionBox.gamePage.classList.remove('hidden');

    progressTop.startTimer();

    questionBox.showQuestion();
}
