import quizQuestionsArray from "./quizArray.ts";
import { startGame } from "./main.ts";

export const questionParagraph = document.querySelector('#questionParagraph') as HTMLElement;

export const lockAnswerBtn = document.querySelector('#lockAnswerBtn') as HTMLButtonElement;

export const onwardBtn = document.querySelector('#onwardBtn') as HTMLButtonElement;
onwardBtn.addEventListener('click', showQuestion);

export const playAgainBtn = document.querySelector('#playAgainBtn') as HTMLButtonElement;
playAgainBtn.addEventListener('click', playAgain)

export let currentQuestionIndex = 0;

let isFirstArray = true;



// export function chooseQuestions() {
//     const firstArray = quizQuestionsArray.slice(0, 9);
//     const secondArray = quizQuestionsArray.slice(10,19);
// }

export function showQuestion() {
    questionParagraph.innerHTML = '';
    const firstArray = quizQuestionsArray.slice(0, 9);
    const secondArray = quizQuestionsArray.slice(10,19);
    console.log(currentQuestionIndex);
    
    // TODO: Kom tillbaka och fixa denna, efter 10 frågor har visats
    if (currentQuestionIndex > 9) {
        alert('du har nått slutet');
        return;
    }
    if (isFirstArray) {
        questionParagraph.innerHTML = `${firstArray[currentQuestionIndex].question}`;
        currentQuestionIndex += 1;
    }
    else {
        questionParagraph.innerHTML = `${secondArray[currentQuestionIndex].question}`;
        currentQuestionIndex += 1;
    }
}

export function playAgain() {
    isFirstArray = !isFirstArray;
    currentQuestionIndex = 0;
    startGame();
}

/* När vi trycker på spela igen knappen:

    isFirstArray = !isFirstArray;
    currentQuestionIndex = 0;
    startGame();
*/ 