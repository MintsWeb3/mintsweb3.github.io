let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let playerCoins = 100;  // Starting coins.
let currentBet = 10;    // Default bet amount.

window.onload = function() {
    initializeDeck();
    updateScores();
    updateCoinDisplay();
    
    //activate deal button
    document.getElementById('dealButton').disabled = false;

    // Deactivate the "hit" and "stay" buttons
    document.getElementById('hitButton').disabled = true;
    document.getElementById('stayButton').disabled = true;
}


function initializeDeck() {
    let suits = ['club', 'spade', 'diamond', 'heart'];
    let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];

    for (let suit of suits) {
        for (let value of values) {
            deck.push({
                value: value,
                suit: suit,
                imageUrl: `cards/${value}${suit}.png`
            });
        }
    }

    deck.sort(() => Math.random() - 0.5);
}

function placeBet() {
    let betAmount = parseInt(document.getElementById('betAmount').value);
    if (betAmount <= playerCoins && betAmount > 0) {
        playerCoins -= betAmount;
        currentBet = betAmount; // update currentBet so that other functions can refer to it
        updateCoinDisplay();
        return true; // bet was successful
    } else {
        alert("Insufficient coins or invalid bet.");
        return false; // bet failed
    }
}


function winBet(amount) {
    playerCoins += 2 * amount;
    updateCoinDisplay();
  // sound of coin when bet is won
 coinSound.play();
  
}

function loseBet() {
loseSound.play();
    // No additional logic needed for losing a bet since coins were already subtracted.
}

function updateCoinDisplay() {
    document.getElementById('coinDisplay').textContent = 'Coins: ' + playerCoins;
}

function displayHands(showDealerDownCard = false) {
    document.getElementById('playerHand').innerHTML = '';
    document.getElementById('dealerHand').innerHTML = '';

    playerHand.forEach(card => {
        let cardElem = document.createElement('img');
        cardElem.src = card.imageUrl;
        document.getElementById('playerHand').appendChild(cardElem);
    });

    dealerHand.forEach((card, index) => {
        let cardElem = document.createElement('img');
        if (showDealerDownCard || index !== 0) {
            cardElem.src = card.imageUrl;
        } else {
            cardElem.src = 'cards/cardback.png'; // assuming a card back image named back.png
        }
        document.getElementById('dealerHand').appendChild(cardElem);
    });
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    
    hand.forEach(card => {
        switch (card.value) {
            case 'a':
                score += 11;
                aces++;
                break;
            case 'k':
            case 'q':
            case 'j':
                score += 10;
                break;
            default:
                score += parseInt(card.value);
        }
    });

    while (score > 21 && aces) {
        score -= 10;
        aces--;
    }

    return score;
}

function updateScores() {
    playerScore = calculateScore(playerHand);
    
    // Only calculate score for the first card which is face up
    dealerScore = calculateScore([dealerHand[1]]);  

    document.getElementById('playerScore').textContent = 'Player Score: ' + playerScore;
    document.getElementById('dealerScore').textContent = 'Dealer Score: ' + dealerScore;
}


function deal() { checkGameStatus();  document.getElementById("dealerComment").innerText = 'Good Luck!';
    if (placeBet(currentBet)) {
        deck = [];
        playerHand = [];
        dealerHand = [];
        playerScore = 0;
        dealerScore = 0;

      document.getElementById('dealButton').disabled = true; // Disable the deal button      
       document.getElementById('hitButton').disabled = false;
        document.getElementById('stayButton').disabled = false;

        initializeDeck();

        playerHand.push(deck.pop());
        playerHand.push(deck.pop());
        dealerHand.push(deck.pop());
        dealerHand.push(deck.pop());

        displayHands();
        updateScores();
      // Enable the "Double Down" button right after dealing
    document.getElementById('doubleDownButton').disabled = false;
    }

}

function hit() {
   document.getElementById('doubleDownButton').disabled = true;
    playerHand.push(deck.pop());
    displayHands();
    updateScores();

    if (playerScore > 21) {
        loseBet();
         document.getElementById("dealerComment").innerText = 'Player busts! Dealer wins.';
        
        document.getElementById('hitButton').disabled = true;
        document.getElementById('stayButton').disabled = true;
      checkGameStatus();
        
      
        
        // Enable dealButton only if player has coins
        if (playerCoins > 0) {
            document.getElementById('dealButton').disabled = false;
        }
    }
}

 



function stay() {
   document.getElementById('doubleDownButton').disabled = true;
  document.getElementById('dealButton').disabled = false;
    document.getElementById('hitButton').disabled = true;
    document.getElementById('stayButton').disabled = true;
    displayHands(true);  // Reveal dealer's down card
    dealerScore = calculateScore(dealerHand);  // Now calculate the full dealer score
    document.getElementById('dealerScore').textContent = 'Dealer Score: ' + dealerScore;

    setTimeout(() => {
        while (dealerScore < 17) {
            dealerHand.push(deck.pop());
            dealerScore = calculateScore(dealerHand);
            displayHands(true);
            document.getElementById('dealerScore').textContent = 'Dealer Score: ' + dealerScore;
        }

        setTimeout(() => {
            if (dealerScore > 21 || playerScore > dealerScore) {
                winBet(currentBet);
                document.getElementById("dealerComment").innerText = dealerCrack();
            
            } else if (dealerScore === playerScore) {
                playerCoins += currentBet;  // Player gets their bet back in case of a tie.
                updateCoinDisplay();
               document.getElementById("dealerComment").innerText = 'It\'s a tie!';
         
            } else {
                loseBet();
                dealerTaunt();
             
            }
          checkGameStatus();
        }, 500);
    }, 100);
}






// game over and player wins function at 0 or 200
function gameOver() {
    document.getElementById('dealButton').disabled = true;
    document.getElementById('hitButton').disabled = true;
    document.getElementById('stayButton').disabled = true;

    let message = "Better luck next time.";
    document.getElementById('endGameMessage').innerText = message;
    document.getElementById('endGameMessage').style.display = "block";

    document.getElementById('playAgainButton').style.display = "block";
}


function playerWins() {
    document.getElementById('dealButton').disabled = true;
    document.getElementById('hitButton').disabled = true;
    document.getElementById('stayButton').disabled = true;

    let message = "Great work! Thank you for playing.  Take a screen shot and post it on X.  Tag @metaversemints and recieve a prize!";
    document.getElementById('endGameMessage').innerText = message;
    document.getElementById('endGameMessage').style.display = "block";

    document.getElementById('playAgainButton').style.display = "block";
}


//check game status
function checkGameStatus() {
    if (playerCoins == 0) {
        gameOver();
    } else if (playerCoins >= 200) {
        playerWins();
      winSound.play();
    }
}

// play again button stuff
document.getElementById('playAgainButton').addEventListener('click', function() {
    playerCoins = 100; // Resetting coins to 100 for the next game
    updateCoinDisplay();
    document.getElementById('playAgainButton').style.display = "none";
    document.getElementById('endGameMessage').style.display = "none";
    document.getElementById('dealButton').disabled = false;
    document.getElementById('hitButton').disabled = true;
    document.getElementById('stayButton').disabled = true;
});


const dealerMessages = [
    "Better luck next time!",
    "Is that all you got?",
    "Too easy!",
    "Maybe this isn't your game...",
    "You should try something simpler.",
    "I almost feel bad for winning... almost.",
    "Do you even know how to play?",
    "Another one bites the dust!",
    "You can't beat me!",
    "Try harder next time!"
];

function dealerTaunt() {
    const randomMessage = dealerMessages[Math.floor(Math.random() * dealerMessages.length)];
document.getElementById("dealerComment").innerText = randomMessage;
}

const dealerRemarks = [
    "Well, aren't you lucky today!",
    "Even a broken clock is right twice a day.",
    "I must be losing my touch.",
    "Don't get too comfortable with winning.",
    "Beginner's luck, I guess.",
    "Enjoy it while it lasts.",
    "Don't spend it all in one place.",
    "Maybe you're not as bad as I thought.",
    "That won't happen again.",
    "Next time won't be so easy."
];
function dealerCrack() {
    const randomIndex = Math.floor(Math.random() * dealerRemarks.length);
    return dealerRemarks[randomIndex];
}





const winSound = new Audio('yay.mp3');
const coinSound = new Audio('coins.wav');
const loseSound = new Audio ('loser.wav')

// Play sound when needed:
//winSound.play();
//loseSound.play();

function doubleDown() {
    // 1. Double the player's bet
    if (placeBet(currentBet)) {  // Use your placeBet function to make sure player has enough coins
        currentBet *= 2;

        // 2. Deal one additional card to the player
        hit();

        // 3. If the player's score is over 21, they bust and lose
        if (playerScore > 21) {
            loseBet();
            document.getElementById("dealerComment").innerText = 'Player busts with double down! Dealer wins.';
            document.getElementById('doubleDownButton').disabled = true;
            checkGameStatus();  // Check if game is over or player has won based on coins
            return;  // End the function since the player busted
        }

        // 4. Player didn't bust, continue with dealer's turn
        stay();  // This will let the dealer play and determine the winner
    } else {
        alert("Not enough coins to double down!");
    }
}


document.getElementById('doubleDownButton').addEventListener('click', doubleDown);







document.getElementById('dealButton').addEventListener('click', deal);
document.getElementById('hitButton').addEventListener('click', hit);
document.getElementById('stayButton').addEventListener('click', stay);
