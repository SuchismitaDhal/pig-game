/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var diceDOM = document.querySelector('.dice');


/**************************************************************************************
* the function defined is an anonymous function as it is defined inside the event listner
***************************************************************************************/

/////////////////// Rolling the die functionality ///////////////////////////
document.querySelector('.btn-roll').addEventListener('click', function()
{
if(gamePlaying)
{
    //generate random number
    var dice = Math.floor(Math.random()*6)+1;

    //update UI
    diceDOM.style.display = 'block';
    diceDOM.src = "dice-" + dice +".png";

    if(dice === 1)
    {
        activePlayer = nextPlayer(activePlayer);
    }
    else
    {
        //add to round score
        roundScore += dice;
        document.getElementById('current-'+activePlayer).textContent = roundScore;
    }
}  
});

document.querySelector('.btn-hold').addEventListener('click', function()
{
if(gamePlaying)
{
    //update global score, set round score to 0, check if player won the game, change player
    scores[activePlayer] += roundScore;
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.win-score').value;
    var final;

    //undefined, 0, null or "" are COERCED to false
    if(input)
        final = input;
    else
        final = 100;

    if(scores[activePlayer] >= final)
    {
        document.getElementById('name-'+activePlayer).textContent = "winner!";
        diceDOM.style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }
    else
        activePlayer = nextPlayer(activePlayer);
}
});

function nextPlayer(player)
{
    //set round score to 0, change active player
    roundScore = 0;
    document.getElementById('current-'+player).textContent = roundScore;

    //toggle adds the class if it not there and removes it if the class is there
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    return (player ? 0 : 1);
}

//init is a callback function as it is defined outside the event listner
document.querySelector('.btn-new').addEventListener('click', init);

function init() 
{
    //intialises the game statistics and interface
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    //get element by ID is faster than query selector
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //for the case when new-game button is clicked after winner is declared
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    //we have to remove and then add active class to eliminate the chance of getting 
    //two active class for the same panal
    document.querySelector('.player-0-panel').classList.add('active');
}