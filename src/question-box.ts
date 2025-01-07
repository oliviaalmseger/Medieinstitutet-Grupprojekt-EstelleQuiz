export {gamePage, showQuestion};
import quizQuestionsArray from './quizArray.ts';
import {startGame, landingPage} from './main.ts';
import {stopTimer, timeResult} from './progress-top.ts';

// ----------------------------------------------------------------------------------
// ---------------------------- Variabler och knappar -------------------------------
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

//----------------- Knappar och span:ar för svaralternativ --------------------------

const optionOne = document.querySelector('#optionOne') as HTMLElement;
const optionOneInput = document.querySelector('#optionOneInput') as HTMLInputElement;

const optionTwo = document.querySelector('#optionTwo') as HTMLElement;
const optionTwoInput = document.querySelector('#optionTwoInput') as HTMLInputElement;

const optionThree = document.querySelector('#optionThree') as HTMLElement;
const optionThreeInput = document.querySelector('#optionThreeInput') as HTMLInputElement;

// ----------------------------------------------------------------------------------
// ---------------------------- Funktioner för spelet -------------------------------
// ----------------------------------------------------------------------------------


// Funktion för att slumpa fram ordningen på arrayen (Baserad på Fisher-Yates Sorting Algorithm)
function shuffleArray<T>(array: T[]) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
} 

// -------------------------------- Visa upp frågor -------------------------------------------

// Nya arrayer som har delat upp original-arrayen
const firstArray = quizQuestionsArray.slice(0, 10); // Räknar från index 0 till och med (men exklusive) 10, alltså tar den index 0-9
const secondArray = quizQuestionsArray.slice(10, 20); // Samma som ovan fast tar index 10-19

// Shuffleade arrayer av de uppdelade
const firstArrayShuffled = shuffleArray(firstArray);
const secondArrayShuffled = shuffleArray(secondArray);

// Funktion för att visa frågorna en i taget
function showQuestion(): void {
    questionParagraph.innerHTML = '';

    // Rensa "checked" markering från alla knappar vid ny fråga
    // Gör att svarsalternativen går att klicka på igen
    const allBtns = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name="answer"]');
    allBtns.forEach(btn => {
        btn.checked = false;
        btn.removeAttribute('disabled');
    });

    // Gör att vi kan låsa svar igen
    lockAnswerBtn.removeAttribute('disabled');

    // Gör att vi inte kan trycka på "gå vidare"-knapp, låses upp när vi låst ett svar
    onwardBtn.setAttribute('disabled', '');

    if (currentQuestionIndex === 10) {
        stopTimer();
        showResultPage();
        return;
    }

    // Visar upp frågor med tillhörande svarsalternativ
    // Visar antingen första arrayen eller andra
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

// ---------------------------------- Kontrollera svar ------------------------------------------

let score: number = 0;

function checkAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked') as HTMLInputElement;

    // Om inget är iklickat
    if (selectedAnswer == null) {
        return;
    }
    const isAnswerCorrect = selectedAnswer.dataset.trueOrFalse;

    // Uppdaterar variabeln "score" utifrån om vi svarat rätt eller fel
    if (isAnswerCorrect === 'true') {
        score += 1;
        // TODO: Byt till en span istället för questionParagraph + töm/rensa denna vid ny fråga också
        questionParagraph.innerHTML = 'Du svarade rätt!';
    }
    else {
        score += 0;
        // TODO: Byt till en span istället för questionParagraph
        questionParagraph.innerHTML = 'Du svarade fel!';
    }

    // Gör att "Gå vidare"-knappen går att klicka på
    onwardBtn.removeAttribute('disabled');

    // Gör att lås-knappen inte kan tryckas på igen, och på så sätt hindra användare från att få fler poäng för samma svar
    lockAnswerBtn.setAttribute('disabled', '');

    // Gör att vi inte kan byta svar efter vi låst svaret
    const allBtns = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name="answer"]');
    allBtns.forEach(btn => {
        btn.setAttribute('disabled', '');
    });
    
    selectedAnswer.removeAttribute('disabled');
    selectedAnswer.checked = true;
}

// ------------------------------------ Spela igen ---------------------------------------

function playAgain(): void {
    isFirstArray = !isFirstArray;
    currentQuestionIndex = 0;
    score = 0;
    resultPage.classList.add('hidden');
    startGame();
}

// ------------------------------------ Avsluta spel --------------------------------------

function quitGame(): void {
    isFirstArray = !isFirstArray;
    currentQuestionIndex = 0;
    score = 0;
    resultPage.classList.add('hidden');
    gamePage.classList.add('hidden');
    landingPage.classList.remove('hidden');
}

// -------------------------------- Visa resultat ------------------------------------------

const resultTicket = document.querySelector('#resultTicket') as HTMLImageElement; 

// Funktion för att få fram confirmation page
// Presenterar resultat, tid och olika fraser för olika antal rätt
function showResultPage(): void {
    gamePage.classList.add('hidden');
    resultPage.classList.remove('hidden');

    const resultParagraph = document.querySelector('#resultParagraph') as HTMLElement;
    let resultMessage = '';

    if(score < 2) {
        resultMessage = '<strong>Regissörens mardröm</strong>- Aj då! Du verkar ha missat de flesta filmerna. Kanske en filmkväll med klassiker är på sin plats?';
        resultTicket.src = 'assets/images/tickets_3_bronze.png';
        resultTicket.alt = '';
    } else if (score === 2 || score === 3) {
        resultMessage = '<strong>Filmupptäckare</strong>-Du är på väg att hitta dina favoritfilmer – dags att dyka ner i några filmklassiker!';
        resultTicket.src = 'assets/images/tickets_3_bronze.png';
        resultTicket.alt = '';
    } else if (score >= 4 && score <= 6) {
        resultMessage = '<strong>Popcornproffs</strong>-Inte illa! Du missar några detaljer, men du är klart på väg mot en Oscarsvinst i filmkunskap!';
        resultTicket.src = 'assets/images/tickets_4_silver.png';
        resultTicket.alt = '';
    } else if (score >= 7 && score <= 9) {
        resultMessage = '<strong>Filmfantast</strong>-Bra jobbat! Du känner igen fler scener än vad en regissör gör på premiärdagen';
        resultTicket.src = 'assets/images/tickets_4_silver.png';
        resultTicket.alt = '';
    } else if (score === 10){
        resultMessage = '<strong>Filmgeni</strong>-Wow! Du är ett levande filmlexikon – Spielberg ringer nog snart för tips!'
        resultTicket.src = 'assets/images/tickets_5_gold.png';
        resultTicket.alt = '';
    } else {
        resultMessage = 'Nu vart det fel, hmmm';
    }

    resultParagraph.innerHTML = `
        <span>Tid: ${timeResult}</span>
        <span>Poäng: ${score}</span> 
        <p>${resultMessage}</p>`;
}

