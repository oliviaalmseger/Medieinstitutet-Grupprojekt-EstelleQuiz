import quizQuestionsArray from './quizArray.ts';
import { startGame } from './main.ts';
import { stopTimer, timeResult } from './progress-top.ts';

export const questionParagraph = document.querySelector('#questionParagraph') as HTMLElement;

export const lockAnswerBtn = document.querySelector('#lockAnswerBtn') as HTMLButtonElement;
lockAnswerBtn.addEventListener('click', checkAnswer)

export const onwardBtn = document.querySelector('#onwardBtn') as HTMLButtonElement;
onwardBtn.addEventListener('click', showQuestion);

// TODO: flytta denna till rätt modul, användes här bara för att testa att den byter frågor
export const playAgainBtn = document.querySelector('#playAgainBtn') as HTMLButtonElement;
playAgainBtn.addEventListener('click', playAgain);

export let currentQuestionIndex = 0;
let progressBarSpan = document.querySelector('#progressBarSpan') as HTMLElement;

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
export function showQuestion(): void {
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
export function playAgain(): void {
    isFirstArray = !isFirstArray;
    currentQuestionIndex = 0;
    startGame();
}

