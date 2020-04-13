/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const diceImg = document.querySelector('.dice');
const scores = [0,0];

let roundScore = 0;
let activePlayer = 0;


document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';



// document.querySelector(`#current-${activePlayer}`).innerHTML = `<em>${dice}</em>`;

btnRoll.addEventListener('click', () => {
    const dice = Math.floor(Math.random() * 6) + 1;
    
    diceImg.style.display = 'block';
    diceImg.src = `dice-${dice}.png`;

    // Update the round score if the rolled number was not a 1
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
        // Next player
        nextPlayer();
    }
});

btnHold.addEventListener('click', () => {
    scores[activePlayer] += roundScore;

    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];


    if(scores[activePlayer] >= 100) {
        document.querySelector(`#name-${activePlayer}`).textContent = 'Winner';
        diceImg.style.display = 'none';

        document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    } else {
        nextPlayer();
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        diceImg.style.display = 'none';
}