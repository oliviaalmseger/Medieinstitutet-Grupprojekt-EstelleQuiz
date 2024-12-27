export {gamePage, showQuestion}
import quizQuestionsArray from './quizArray.ts';
import { startGame } from './main.ts';
import { stopTimer, timeResult } from './progress-top.ts';


const questionParagraph = document.querySelector('#questionParagraph') as HTMLElement;

const lockAnswerBtn = document.querySelector('#lockAnswerBtn') as HTMLButtonElement;
lockAnswerBtn.addEventListener('click', checkAnswer)

const onwardBtn = document.querySelector('#onwardBtn') as HTMLButtonElement;
onwardBtn.addEventListener('click', showQuestion);
const gamePage = document.querySelector('#gamePage') as HTMLElement
const resultPage = document.querySelector('#resultPage') as HTMLElement

// TODO: flytta denna till rätt modul, användes här bara för att testa att den byter frågor
const playAgainBtn = document.querySelector('#playAgainBtn') as HTMLButtonElement;
playAgainBtn.addEventListener('click', playAgain);

let currentQuestionIndex = 0;
const progressBarSpan = document.querySelector('#progressBarSpan') as HTMLElement;


let isFirstArray = true;

//Knappar och spanar för svaralternativ
const optionOne = document.querySelector('#optionOne') as HTMLElement;
const optionOneInput = document.querySelector('#optionOneInput') as HTMLInputElement;


const optionTwo = document.querySelector('#optionTwo') as HTMLElement;
const optionTwoInput = document.querySelector('#optionTwoInput') as HTMLInputElement;


const optionThree = document.querySelector('#optionThree') as HTMLElement;
const optionThreeInput = document.querySelector('#optionThreeInput') as HTMLInputElement;


//Lås svar knapp ska kontrollera svarets boolean värde. 
//Inputen ska kopplas till svaret som har värdet true eller false. 


// Funktion för att slumpa fram ordningen på arrayen (Baserad på Fisher-Yates Sorting Algorithm)
function shuffleArray<T>(array: T[]) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
 
    return shuffled;
} 

// Nya arrayer som har tagit delar av original-arrayen
const firstArray = quizQuestionsArray.slice(0, 10); // Räknar från index 0 till och med (men exklusive) 10, alltså tar den index 0-9
const secondArray = quizQuestionsArray.slice(10, 20); // Samma som ovan fast tar index 10-19

// Shuffleade array
const firstArrayShuffled = shuffleArray(firstArray);
const secondArrayShuffled = shuffleArray(secondArray);

// Funktion för att visa frågorna en i taget
function showQuestion(): void {
    questionParagraph.innerHTML = '';

    // Rensa "checked" markering från alla knappar vid ny fråga
    const allBtns = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name="answer"]');
    allBtns.forEach(btn => {
        btn.checked = false;
    });

    // Gör att svarsalternativen går att klicka på igen
    allBtns.forEach(btn => {
        btn.removeAttribute('disabled');
    });

    // Gör att vi kan låsa svar igen
    lockAnswerBtn.removeAttribute('disabled');

    // Disable gå vidare knapp
    onwardBtn.setAttribute('disabled', '');

    if (currentQuestionIndex === 10) {
        alert('Du har nu svarat på alla frågor'); 
        stopTimer();
        console.log(timeResult); 
        showResultPage()

        // TODO: lägg till att kalla på funktion för att visa bekräftelse-sida
        return;
    }
    if (isFirstArray) {
        questionParagraph.innerHTML = `${firstArrayShuffled[currentQuestionIndex].question}`;
        optionOne.innerHTML = `${firstArrayShuffled[currentQuestionIndex].options[0].answer}`;
        optionOneInput.dataset.trueOrFalse = firstArrayShuffled[currentQuestionIndex].options[0].trueOrFalse.toString();

        optionTwo.innerHTML = `${firstArrayShuffled[currentQuestionIndex].options[1].answer}`;
        optionTwoInput.dataset.trueOrFalse = firstArrayShuffled[currentQuestionIndex].options[1].trueOrFalse.toString();

        optionThree.innerHTML = `${firstArrayShuffled[currentQuestionIndex].options[2].answer}`;
        optionThreeInput.dataset.trueOrFalse = firstArrayShuffled[currentQuestionIndex].options[2].trueOrFalse.toString();

        currentQuestionIndex += 1;
        console.log(currentQuestionIndex);
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
        console.log(currentQuestionIndex);
        progressBarSpan.innerHTML = `Fråga: ${currentQuestionIndex} / 10`;
        console.log("Nu drar vi igång runda två!")
    }
}

let score: number = 0;

function checkAnswer() {
    

    const selectedAnswer = document.querySelector('input[name="answer"]:checked') as HTMLInputElement;

    // const selectedAnswerParent = selectedAnswer.parentElement;

    if (selectedAnswer  == null) {
        console.log('Det var inget svar iklickat');
        return;
    }

    const isAnswerCorrect = selectedAnswer.dataset.trueOrFalse;

    if (isAnswerCorrect === 'true') {
        score += 1;
        questionParagraph.innerHTML = 'Du svarade rätt!'
    }
    else {
        score += 0;
        questionParagraph.innerHTML = 'Du svarade fel!'
    }

    // Gör att "Gå vidare"-knappen går att klicka på
    onwardBtn.removeAttribute('disabled');

    // Gör att lås-knappen inte kan tryckas på igen, och på så sätt få fler poäng för samma svar
    lockAnswerBtn.setAttribute('disabled', '');

    // Gör att vi inte kan byta svar efter vi låst svaret
    const allBtns = document.querySelectorAll<HTMLInputElement>('input[type="radio"][name="answer"]');
    allBtns.forEach(btn => {
        btn.setAttribute('disabled', '');
    });
    
    selectedAnswer.removeAttribute('disabled');
    selectedAnswer.checked = true;

    console.log(score);
}

// TODO: Som med variabeln för knappen, flytta till rätt modul. användes bara som test.
function playAgain(): void {
    isFirstArray = !isFirstArray;
    currentQuestionIndex = 0;
    score = 0; 
    resultPage.classList.add('hidden'); 
    startGame();
}

//  funktion för att få fram confirmation page
// presentera resultat, tid och olika fraser för olika antal rätt

function showResultPage() {
    gamePage.classList.add('hidden')
    resultPage.classList.remove('hidden')

    const resultParagraph = document.querySelector('#resultParagraph') as HTMLElement
    let resultMessage = '';

    if(score < 2) {
        resultMessage = '<strong>Regissörens mardröm</strong>- Aj då! Du verkar ha missat de flesta filmerna. Kanske en filmkväll med klassiker är på sin plats?'
    } else if (score === 2 || score === 3) {
        resultMessage = '<strong>Filmupptäckare</strong>-Du är på väg att hitta dina favoritfilmer – dags att dyka ner i några filmklassiker!'
    } else if (score >= 4 && score <= 6) {
        resultMessage = '<strong>Popcornproffs</strong>-Inte illa! Du missar några detaljer, men du är klart på väg mot en Oscarsvinst i filmkunskap!'
    } else if (score >= 7 && score <= 9) {
        resultMessage = '<strong>Filmfantast</strong>-Bra jobbat! Du känner igen fler scener än vad en regissör gör på premiärdagen'
    } else if (score === 10){
        resultMessage = '<strong>Filmgeni</strong>-Wow! Du är ett levande filmlexikon – Spielberg ringer nog snart för tips!'
    } else {
        console.log('Något blev fel med poängsystemet');
    }

    resultParagraph.innerHTML = `
        <span>Tid: ${timeResult}</span>
        <span>Poäng: ${score}</span> 
        <p>${resultMessage}</p>`;
}

