import "../css/style.scss";
import quizQuestionsArray from "./quizArray.ts";

quizQuestionsArray.forEach(index => {
    console.log(index.options);
});


/*************************** Landing page ****************************/
//variabel för username
let username;
// hämtar inputfält och start game btn
const usernameInput = document.querySelector('#usernameInput') as HTMLInputElement;
const startGameBtn = document.querySelector('#startGameBtn') as HTMLButtonElement;

// klickevent på starta spel
startGameBtn.addEventListener('click', startGame);

function startGame() {
    // När username är ifyllt kan spelet starta, annars return
    if (usernameInput) {
        username = usernameInput.value;
      if(username.length > 0) {
          // Hämta värdet och spara i en variabel
          console.log('Användarnamn:', username);

            const landingPage = document.querySelector('#landingPage') as HTMLElement;
            landingPage.classList.add('hidden');

        // funktion: starta + visa timer
        // funktion: Starta poängräkning
        // funktion: starta + visa frågeräkning
        // funktion: visa frågor + svarsalternativ
         
      } 
      else {
        alert("Du måste ange ett användarnamn!");
        return;
      }

    } 
}