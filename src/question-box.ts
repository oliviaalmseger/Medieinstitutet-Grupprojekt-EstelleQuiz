import quizQuestionsArray from './quizArray.ts';
import { startGame } from './main.ts';

export const questionParagraph = document.querySelector('#questionParagraph') as HTMLElement;

export const lockAnswerBtn = document.querySelector('#lockAnswerBtn') as HTMLButtonElement;

export const onwardBtn = document.querySelector('#onwardBtn') as HTMLButtonElement;
onwardBtn.addEventListener('click', showQuestion);

// TODO: flytta denna till rätt modul, användes här bara för att testa att den byter frågor
export const playAgainBtn = document.querySelector('#playAgainBtn') as HTMLButtonElement;
playAgainBtn.addEventListener('click', playAgain);

export let currentQuestionIndex = 0;

let isFirstArray = true;

// Funktion för att slumpa fram ordningen på arrayen (Baserad på Fisher-Yates Sorting Algorithm)
function shuffleArray<T>(array: T[]) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

const firstArray = quizQuestionsArray.slice(0, 10); // Räknar från index 0 till och med (men exklusive) 10, alltså tar den index 0-9
const secondArray = quizQuestionsArray.slice(10, 20); // Samma som ovan fast tar index 10-19

const firstArrayShuffled = shuffleArray(firstArray);
const secondArrayShuffled = shuffleArray(secondArray);

export function showQuestion(): void {
    questionParagraph.innerHTML = '';

    if (currentQuestionIndex === 10) {
        alert('Du har nu svarat på alla frågor');
        // TODO: lägg till att kalla på funktion för att visa bekräftelse-sida
        return;
    }
    if (isFirstArray) {
        questionParagraph.innerHTML = `${firstArrayShuffled[currentQuestionIndex].question}`;
        currentQuestionIndex += 1;
    } else {
        questionParagraph.innerHTML = `${secondArrayShuffled[currentQuestionIndex].question}`;
        currentQuestionIndex += 1;
    }
}

// TODO: Som med variabeln för knappen, flytta till rätt modul. användes bara som test.
export function playAgain(): void {
    isFirstArray = !isFirstArray;
    currentQuestionIndex = 0;
    startGame();
}
