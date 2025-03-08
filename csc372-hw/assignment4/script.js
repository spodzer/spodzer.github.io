
let choices = ['rock', 'paper', 'scissors'];
let playerSelection = '';

function playerChoice(choice, element) {
    document.querySelectorAll('#player-throw img').forEach(img => img.classList.remove('selected'));
    element.classList.add('selected');
    playerSelection = choice;
    computerThrow();
}

function computerThrow() {
    let computerImage = document.getElementById('computer-image');
    let count = 0;
    let shuffleInterval = setInterval(() => {
        computerImage.src = choices[count % 3] + '.png';
        count++;
    }, 500);
    
    setTimeout(() => {
        clearInterval(shuffleInterval);
        let computerSelection = choices[Math.floor(Math.random() * 3)];
        computerImage.src = computerSelection + '.png';
        decideWinner(computerSelection);
    }, 3000);
}

function decideWinner(computerSelection) {
    let resultText = document.getElementById('result');
    if (playerSelection === computerSelection) {
        resultText.textContent = "It's a tie!";
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        resultText.textContent = "You win!";
    } else {
        resultText.textContent = "Computer wins!";
    }
}

function resetGame() {
    document.querySelectorAll('#player-throw img').forEach(img => img.classList.remove('selected'));
    document.getElementById('computer-image').src = 'images/hmm.png';
    document.getElementById('result').textContent = "Waiting for your throw...";
}