const bgMusic = new Audio("bg-music.mp3");  // Percorso relativo per il file della musica di sottofondo
const winSound = new Audio("win-sound.mp3");  // Percorso relativo per il suono di vittoria
const clickSound = new Audio("click.mp3");  // Percorso relativo per il suono del clic
clickSound.volume = 0.1;  // Imposta il volume del suono del clic (tra 0 e 1)

const yeeeSound = new Audio("yeee.mp3");  // Percorso relativo per il suono di vittoria

// Avvia la musica di sottofondo quando la pagina viene caricata
window.onload = () => {
  bgMusic.loop = true; // Fa partire la musica in loop
  bgMusic.play(); // Avvia la musica
  bgMusic.volume = 0.2; // Imposta il volume
};

const min = 1;
const max = 100;
let nombreMystere = Math.floor(Math.random() * max) + min;

let tentative = 0;

const input = document.getElementById("guessInput");
const button = document.getElementById("submitGuess");
const feedback = document.getElementById("feedback");
const tries = document.getElementById("tries");
const playAgainBtn = document.getElementById("playAgain");

button.addEventListener("click", () => {
  // Suono al clic del pulsante
  clickSound.play();

  if (tentative === 0) {
    bgMusic.play(); // Parte la musichetta al primo tentativo
  }

  const value = parseInt(input.value, 10);
  if (isNaN(value)) {
    feedback.textContent = "⛔ Ce n'est pas un nombre valide !";
    return;
  }

  tentative++;

  if (value < nombreMystere) {
    feedback.textContent = "🔺 C'est plus !";
  } else if (value > nombreMystere) {
    feedback.textContent = "🔻 C'est moins !";
  } else {
    feedback.textContent = `🎉 Bravo ! Vous avez trouvé le nombre mystère ${nombreMystere} en ${tentative} tentative(s).`;
    input.disabled = true;
    button.disabled = true;
    playAgainBtn.style.display = "inline-block";
    bgMusic.pause();
    bgMusic.currentTime = 0;
    yeeeSound.play(); // Suono di vittoria
  }

  tries.textContent = `Tentative n°${tentative}`;
  input.value = "";
  input.focus();
});

playAgainBtn.addEventListener("click", () => {
  tentative = 0;
  nombreMystere = Math.floor(Math.random() * max) + min;
  feedback.textContent = "";
  tries.textContent = "";
  input.disabled = false;
  button.disabled = false;
  input.value = "";
  input.focus();
  playAgainBtn.style.display = "none";

  // Reset musica
  bgMusic.pause();
  bgMusic.currentTime = 0;
  winSound.pause();
  winSound.currentTime = 0;

  // Rilancia la musica di sottofondo
  bgMusic.play();
});
