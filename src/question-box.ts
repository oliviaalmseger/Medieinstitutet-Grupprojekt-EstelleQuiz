export {gamePage, showQuestion};
import quizQuestionsArray from './quizArray.ts';
import {startGame, landingPage} from './main.ts';
import {stopTimer, timeResult} from './progress-top.ts';

// ----------------------------------------------------------------------------------
// ---------------------------- Variables and buttons -------------------------------
// ----------------------------------------------------------------------------------

const questionParagraph = document.querySelector('#questionParagraph') as HTMLElement;

const lockAnswerBtn = document.querySelector('#lockAnswerBtn') as HTMLButtonElement;
lockAnswerBtn.addEventListener('click', checkAnswer);

const onwardBtn = document.querySelector('#onwardBtn') as HTMLButtonElement;
onwardBtn.addEventListener('click', showQuestion);

const gamePage = document.querySelector('#gamePage') as HTMLElement;
const resultPage = document.querySelector('#resultPage') as HTMLElement;

const playAgainBtn = document.querySelector('#playAgainBtn') as HTMLButtonElement;
playAgainBtn.addEventListener('click', playAgain);

const quitGameBtn = document.querySelector('#quitGameBtn') as HTMLButtonElement;
quitGameBtn.addEventListener('click', quitGame);

let currentQuestionIndex = 0;
const progressBarSpan = document.querySelector('#progressBarSpan') as HTMLElement;

let isFirstArray = true;

//----------------- Buttons and spans for response options --------------------------

const optionOne = document.querySelector('#optionOne') as HTMLElement;
const optionOneInput = document.querySelector('#optionOneInput') as HTMLInputElement;

const optionTwo = document.querySelector('#optionTwo') as HTMLElement;
const optionTwoInput = document.querySelector('#optionTwoInput') as HTMLInputElement;

const optionThree = document.querySelector('#optionThree') as HTMLElement;
const optionThreeInput = document.querySelector('#optionThreeInput') as HTMLInputElement;

// ----------------------------------------------------------------------------------
// ---------------------------- Features of the game -------------------------------
// ----------------------------------------------------------------------------------


// Function to randomize the order of the array (Based of Fisher-Yates Sorting Algorithm)
function shuffleArray<T>(array: T[]) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
} 

// -------------------------------- Display questions -------------------------------------------

// New arrays that have split the original array
const firstArray = quizQuestionsArray.slice(0, 10); // Counts from index 0 up to and including (but excluding) 10, so it takes index 0-9
const secondArray = quizQuestionsArray.slice(10, 20); // Same as above but takes index 10-19

// Shuffled arrays of the partitioned
const firstArrayShuffled = shuffleArray(firstArray);
const secondArrayShuffled = shuffleArray(secondArray);

// Function to show the questions one at a time
function showQuestion(): void {
    questionParagraph.innerHTML = '';

    // Clear the "checked" mark from all buttons for a new question
    // Make the answer options clickable again
    const allBtns = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name="answer"]');
    allBtns.forEach(btn => {
        btn.checked = false;
        btn.removeAttribute('disabled');
    });

    // Allows us to lock responses again
    lockAnswerBtn.removeAttribute('disabled');

    // Makes us unable to press onward button, unlocked when we locked an answer
    onwardBtn.setAttribute('disabled', '');

    if (currentQuestionIndex === 10) {
        stopTimer();
        showResultPage();
        return;
    }

    // Displays questions with associated answer options
    // Displays either the first array or the second
    if (isFirstArray) {
        questionParagraph.innerHTML = `${firstArrayShuffled[currentQuestionIndex].question}`;
        optionOne.innerHTML = `${firstArrayShuffled[currentQuestionIndex].options[0].answer}`;
        optionOneInput.dataset.trueOrFalse = firstArrayShuffled[currentQuestionIndex].options[0].trueOrFalse.toString();

        optionTwo.innerHTML = `${firstArrayShuffled[currentQuestionIndex].options[1].answer}`;
        optionTwoInput.dataset.trueOrFalse = firstArrayShuffled[currentQuestionIndex].options[1].trueOrFalse.toString();

        optionThree.innerHTML = `${firstArrayShuffled[currentQuestionIndex].options[2].answer}`;
        optionThreeInput.dataset.trueOrFalse = firstArrayShuffled[currentQuestionIndex].options[2].trueOrFalse.toString();

        currentQuestionIndex += 1;
        progressBarSpan.innerHTML = `Fråga: ${currentQuestionIndex} / 10`;
    } else {
        questionParagraph.innerHTML = `${secondArrayShuffled[currentQuestionIndex].question}`;

        optionOne.innerHTML = `${secondArrayShuffled[currentQuestionIndex].options[0].answer}`;
        optionOneInput.dataset.trueOrFalse = secondArrayShuffled[currentQuestionIndex].options[0].trueOrFalse.toString();

        optionTwo.innerHTML = `${secondArrayShuffled[currentQuestionIndex].options[1].answer}`;
        optionTwoInput.dataset.trueOrFalse = secondArrayShuffled[currentQuestionIndex].options[1].trueOrFalse.toString();

        optionThree.innerHTML = `${secondArrayShuffled[currentQuestionIndex].options[2].answer}`;
        optionThreeInput.dataset.trueOrFalse = secondArrayShuffled[currentQuestionIndex].options[2].trueOrFalse.toString();

        currentQuestionIndex += 1;
        progressBarSpan.innerHTML = `Fråga: ${currentQuestionIndex} / 10`;
    }
}

// ---------------------------------- Check answers ------------------------------------------

let score: number = 0;

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked') as HTMLInputElement;

    // If nothing is clicked
    if (selectedAnswer == null) {
        return;
    }
    const isAnswerCorrect = selectedAnswer.dataset.trueOrFalse;

    // Updates the variable "score" based on whether we answered correctly or incorrectly
    if (isAnswerCorrect === 'true') {
        score += 1;
        // TODO: Switch to a span instead of questionParagraph + empty/clear this for a new question as well
        questionParagraph.innerHTML = 'Du svarade rätt!';
    }
    else {
        score += 0;
        // TODO: Change to a span instead of questionParagraph
        questionParagraph.innerHTML = 'Du svarade fel!';
    }

    // Make the "onward" button clickable
    onwardBtn.removeAttribute('disabled');

    // Prevents the lock button from being pressed again, thus preventing users from getting more points for the same answer
    lockAnswerBtn.setAttribute('disabled', '');

    // Makes us unable to change answers after we lock the answer
    const allBtns = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name="answer"]');
    allBtns.forEach(btn => {
        btn.setAttribute('disabled', '');
    });
    
    selectedAnswer.removeAttribute('disabled');
    selectedAnswer.checked = true;
}

// ------------------------------------ Play again ---------------------------------------

function playAgain(): void {
    isFirstArray = !isFirstArray;
    currentQuestionIndex = 0;
    score = 0;
    resultPage.classList.add('hidden');
    startGame();
}

// ------------------------------------ End game --------------------------------------

function quitGame(): void {
    isFirstArray = !isFirstArray;
    currentQuestionIndex = 0;
    score = 0;
    resultPage.classList.add('hidden');
    gamePage.classList.add('hidden');
    landingPage.classList.remove('hidden');
}

// -------------------------------- Show results ------------------------------------------

const resultTicket = document.querySelector('#resultTicket') as HTMLImageElement; 

// Function to bring up the confirmation page
// Presents results, time and different phrases for different numbers of correct
function showResultPage(): void {
    gamePage.classList.add('hidden');
    resultPage.classList.remove('hidden');

    const resultParagraph = document.querySelector('#resultParagraph') as HTMLElement;
    let resultMessage = '';

    if(score < 2) {
        resultMessage = '<strong>Regissörens mardröm</strong>- Aj då! Du verkar ha missat de flesta filmerna. Kanske en filmkväll med klassiker är på sin plats?';
        resultTicket.src = 'public/images/tickets_bronze.png';
        resultTicket.alt = 'en biobiljett som är bronsfärgad.';
    } else if (score === 2 || score === 3) {

        resultMessage = '<strong>Filmupptäckare</strong>-Du är på väg att hitta dina favoritfilmer – dags att dyka ner i några filmklassiker!';
        resultTicket.src = 'public/images/tickets_bronze.png';
        resultTicket.alt = 'en biobiljett som är bronsfärgad.';
    } else if (score >= 4 && score <= 6) {

        resultMessage = '<strong>Popcornproffs</strong>-Inte illa! Du missar några detaljer, men du är klart på väg mot en Oscarsvinst i filmkunskap!';
        resultTicket.src = 'public/images/tickets_silver.png';
        resultTicket.alt = 'en biobiljett som är silverfärgad.';
    } else if (score >= 7 && score <= 9) {
        resultMessage = '<strong>Filmfantast</strong>-Bra jobbat! Du känner igen fler scener än vad en regissör gör på premiärdagen';
        resultTicket.src = 'public/images/tickets_silver.png';
        resultTicket.alt = 'en biobiljett som är silverfärgad.';
    } else if (score === 10){
        resultMessage = '<strong>Filmgeni</strong>-Wow! Du är ett levande filmlexikon – Spielberg ringer nog snart för tips!'
        resultTicket.src = 'public/images/tickets_gold.png';
        resultTicket.alt = 'en biobiljett som är guldfärgad.';
    } else {
        resultMessage = 'Nu vart det fel, hmmm';
    }

    resultParagraph.innerHTML = `
        <span>Tid: ${timeResult}</span>
        <span>Poäng: ${score}</span> 
        <p>${resultMessage}</p>`;
}

