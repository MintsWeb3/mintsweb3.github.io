let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;

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

function displayHands(showDealerDownCard = false) {
    const playerHandDiv = document.getElementById('playerHand');
    const dealerHandDiv = document.getElementById('dealerHand');

    // Clear previous hand displays
    playerHandDiv.innerHTML = 'Player Hand:';
    dealerHandDiv.innerHTML = 'Dealer Hand:';

    // Display player's hand
    for (let card of playerHand) {
        let cardImg = document.createElement('img');
        cardImg.src = card.imageUrl;
        cardImg.style.width = 'auto'; 
        cardImg.style.height = '150px'; 
        playerHandDiv.appendChild(cardImg);
    }

    // Display dealer's hand 
    for (let i = 0; i < dealerHand.length; i++) {
        let cardImg = document.createElement('img');
        if (i === 1 && !showDealerDownCard) {
            cardImg.src = 'cards/cardback.png';  
        } else {
            cardImg.src = dealerHand[i].imageUrl; 
        }
        cardImg.style.width = 'auto'; 
        cardImg.style.height = '150px'; 
        dealerHandDiv.appendChild(cardImg);
    }
}




function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;

    for (let card of hand) {
        if (['j', 'q', 'k'].includes(card.value)) {
            score += 10;
        } else if (card.value === 'a') {
            score += 11;
            aceCount += 1;
        } else {
            score += parseInt(card.value);
        }
    }

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount -= 1;
    }

    return score;
}

function updateScores() {
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);

    document.getElementById('playerScore').textContent = 'Player Score: ' + playerScore;
    document.getElementById('dealerScore').textContent = 'Dealer Score: ' + calculateScore([dealerHand[0]]);
}

function deal() {
    deck = [];
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;

    initializeDeck();

    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    dealerHand.push(deck.pop());

    displayHands();
    updateScores();
}

function hit() {
    playerHand.push(deck.pop());

    displayHands();
    updateScores();

    if (playerScore > 21) {
        setTimeout(() => {
            alert('Player busts! Game over.');
        }, 100); // Adjust the delay as necessary
    }
}

function stay() {
    displayHands(true);  // Reveal the dealer's down card
    updateScores();

    setTimeout(() => {
        while (dealerScore < 17) {
            dealerHand.push(deck.pop());
            updateScores();
            displayHands(true);  // Update the display with the new card and keep the down card revealed
        }

        document.getElementById('dealerScore').textContent = 'Dealer Score: ' + dealerScore;

        // Determine the winner with a slight delay to allow the browser to render the changes
        setTimeout(() => {
            if (dealerScore > 21 || playerScore > dealerScore) {
                alert('Player wins!');
            } else if (dealerScore === playerScore) {
                alert('It\'s a tie!');
            } else {
                alert('Dealer wins!');
            }
        }, 500); 
    }, 100);
}




window.onload = function() {
    initializeDeck();
    updateScores();
}

document.getElementById('dealButton').addEventListener('click', deal);
document.getElementById('hitButton').addEventListener('click', hit);
document.getElementById('stayButton').addEventListener('click', stay);
