import quizQuestionsArray from './quizArray.ts';
import { startGame } from './main.ts';
import { stopTimer, timeResult } from './progress-top.ts';


export const questionParagraph = document.querySelector('#questionParagraph') as HTMLElement;

export const lockAnswerBtn = document.querySelector('#lockAnswerBtn') as HTMLButtonElement;

export const onwardBtn = document.querySelector('#onwardBtn') as HTMLButtonElement;
onwardBtn.addEventListener('click', showQuestion);
export const gamePage = document.querySelector('#gamePage') as HTMLElement
const resultPage = document.querySelector('#resultPage') as HTMLElement

// TODO: flytta denna till rätt modul, användes här bara för att testa att den byter frågor
export const playAgainBtn = document.querySelector('#playAgainBtn') as HTMLButtonElement;
playAgainBtn.addEventListener('click', playAgain);

export let currentQuestionIndex = 0;
let progressBarSpan = document.querySelector('#progressBarSpan') as HTMLElement;


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
        stopTimer();
        console.log(timeResult); 
        showResultPage()

        // TODO: lägg till att kalla på funktion för att visa bekräftelse-sida
        return;
    }
    if (isFirstArray) {
        questionParagraph.innerHTML = `${firstArrayShuffled[currentQuestionIndex].question}`;
        currentQuestionIndex += 1;
        console.log(currentQuestionIndex);
        progressBarSpan.innerHTML = `Fråga: ${currentQuestionIndex} / 10`;
    } else {
        questionParagraph.innerHTML = `${secondArrayShuffled[currentQuestionIndex].question}`;
        currentQuestionIndex += 1;
        console.log(currentQuestionIndex);
        progressBarSpan.innerHTML = `Fråga: ${currentQuestionIndex} / 10`;
        console.log("Nu drar vi igång runda två!")
    }
}

// TODO: Som med variabeln för knappen, flytta till rätt modul. användes bara som test.
export function playAgain(): void {
    isFirstArray = !isFirstArray;
    currentQuestionIndex = 0;
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
    } else if (score === 2 && score === 3) {
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

