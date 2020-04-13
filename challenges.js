/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, activePlayer, roundScore, gamePlaying, dice, lastDice;

const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');
const diceImg = document.querySelector('.dice');

init();

// document.querySelector(`#current-${activePlayer}`).innerHTML = `<em>${dice}</em>`;

btnRoll.addEventListener('click', () => {
    if(gamePlaying) {
        dice = Math.floor(Math.random() * 6) + 1;

        diceImg.style.display = 'block';
        diceImg.src = `dice-${dice}.png`;
        
        if(dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector(`#score-${activePlayer}`).textContent = 0;
            nextPlayer();
        }
        // Update the round score if the rolled number was not a 1
        else if (dice !== 1) {
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }
        
        lastDice = dice;
    } 
});

btnHold.addEventListener('click', () => {
    if(gamePlaying) {
        scores[activePlayer] += roundScore;

        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];


        if(scores[activePlayer] >= 100) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner';
            diceImg.style.display = 'none';

            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

btnNew.addEventListener('click', init);

function init() {
    gamePlaying = true;

    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector(".player-1-panel").classList.remove('winner');
    document.querySelector(".player-0-panel").classList.remove('active');
    document.querySelector(".player-1-panel").classList.remove('active');
    document.querySelector(".player-0-panel").classList.add('active');


};

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        diceImg.style.display = 'none';
};