/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
 
*/

var scores, roundScore, activePlayer, gamePlaying;
init();

document.getElementById('roll-dice').addEventListener('click', function(){
    if (gamePlaying) {
    // Random number 
    var dice = Math.floor(Math.random() * 6) + 1;
   
    // Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
 
    // Update the round score IF the rolled number isn't 1
    if (dice !== 1){
        //Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }else{
        //Next player
       nextPlayer();
        }
    } 
});

document.getElementById('hold').addEventListener('click', function(){
    if (gamePlaying) {

    // Add current score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 50){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player' + activePlayer).classList.add('winner');
        document.querySelector('.player' + activePlayer).classList.remove('active');
        gamePlaying = false;
    } else {
        nextPlayer();
        }
    }
    // DRY 
    /* nextPlayer(); */
});


function nextPlayer (){
     //Next player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0;
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     document.querySelector('.player0').classList.toggle('active');
     document.querySelector('.player1').classList.toggle('active');

     // document.querySelector('.player1').classList.remove('active');
     // document.querySelector('.player2').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

// Reset function (New game btn)
document.getElementById('new-game').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    // reset scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Reset UI
    document.getElementById('name-1').textContent = 'player 2';
    document.getElementById('name-0').textContent = 'player 1';
    document.querySelector('.player0').classList.remove('winner');
    document.querySelector('.player1').classList.remove('winner');
    document.querySelector('.player0').classList.remove('active');
    document.querySelector('.player1').classList.remove('active');

    //to avoid duplicate active
    document.querySelector('.player0').classList.add('active');
}




// Add to current player score
//document.querySelector('#current-' + activePlayer).textContent = dice;
//var x = document.querySelector('#score-0').textContent;
//console.log(x);