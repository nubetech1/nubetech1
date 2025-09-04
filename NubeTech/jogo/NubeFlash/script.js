//lista das cores disponiveis
window.addEventListener('DOMContentLoaded', () => {

const colors = ['green', 'red', 'yellow', 'blue'];
let gameSequence = []; //Sequencia gerada pelo jogo 
let playerSequence = [];//Sequência gerada pelo jogador 
let round = 0;//fase atual
let score = 0;//pontuação atual
const maxRounds = 5;//total de fases 

// Elementos do DOM
const startButton = document.getElementById('start');
const colorButtons = document.querySelectorAll('.color');
const scoreDisplay = document.getElementById('score');
const phaseDisplay = document.getElementById('phase');

//inicia o jogo
startButton.addEventListener('click', startGame);
// Evento de clique nas cores
colorButtons.forEach(button => {
  button.addEventListener('click', () => handlePlayerClick(button.id));
});
// Começa o jogo zerando tudo 
function startGame() {
  console.log('Jogo iniciado!');
  startButton.disabled=true;
  gameSequence = [];
  playerSequence = [];
  round = 0;
  score = 0;
  updateScore();
  nextRound();
}
// Gera uma fase nova
function nextRound() {
  round++;
  if (round > maxRounds) {
    showModal(`Parabéns! Você completou todas as ${maxRounds} fases!`);
    return;
  }

  playerSequence = [];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
  updateScore();
  playSequence();
}
// Reproduz a sequência de cores
function playSequence() {
  let delay = 500;

  gameSequence.forEach((color, index) => {
    setTimeout(() => {
      flashColor(color);
    }, delay * (index + 1));
  });
}
// Animação da cor clicada
function flashColor(color) {
  const el = document.getElementById(color);
  el.classList.add('flash');
  setTimeout(() => el.classList.remove('flash'), 300);
}
// Lida com a entrada do jogador
function handlePlayerClick(color) {
  playerSequence.push(color);
  flashColor(color);

  const currentStep = playerSequence.length - 1;
  if (playerSequence[currentStep] !== gameSequence[currentStep]) {
    endGame();
    return;
  }

  if (playerSequence.length === gameSequence.length) {
    score++;
    updateScore();
    setTimeout(nextRound, 1000);
  }
}

// Atualiza os valores da pontuação e fase na tela
function updateScore() {
  scoreDisplay.textContent = score;
  phaseDisplay.textContent = round;
}
//finaliza o jogo e mostra modal 
function endGame() {
  showModal('Você errou! Fim de jogo.');
  startButton.disabled = false;
  score = 0;
  round = 0;
  gameSequence = [];
  playerSequence = [];
  updateScore();
}

//exibe o modal com mensagem
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const modalButton = document.getElementById('modal-button');

modal.classList.add('hidden')
//Fecha o modal ao clicar no botão 
modalButton.addEventListener('click', () => {
  modal.classList.add('hidden');
  modal.style.display='none'
  startButton.disabled = false;
});

function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.remove('hidden');
  modal.style.display = 'flex'; // <- força ele a aparecer mesmo com display: none anterior
}


});