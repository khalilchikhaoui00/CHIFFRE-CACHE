let maxAttempts, range, randomNumber, attempts, guessed;

document.getElementById('facile').addEventListener('click', () => startGame(10, 10));
document.getElementById('intermediaire').addEventListener('click', () => startGame(7, 50));
document.getElementById('difficile').addEventListener('click', () => startGame(5, 100));

document.getElementById('submitGuess').addEventListener('click', submitGuess);
document.getElementById('resetButton').addEventListener('click', resetGame);

function startGame(attemptsLimit, numberRange) {
    maxAttempts = attemptsLimit;
    range = numberRange;
    randomNumber = Math.floor(Math.random() * range) + 1;
    attempts = 0;
    guessed = false;

    document.getElementById('difficultySection').classList.add('hidden');
    document.getElementById('gameArea').classList.remove('hidden');
    document.getElementById('instructions').textContent = `Devinez un chiffre entre 1 et ${range}. Vous avez ${maxAttempts} tentatives.`;
    document.getElementById('attemptsLeft').textContent = `Tentatives restantes : ${maxAttempts}`;
    document.getElementById('feedback').textContent = '';
    document.getElementById('guessInput').value = '';
}

function submitGuess() {
    if (guessed || attempts >= maxAttempts) return;

    const userGuess = parseInt(document.getElementById('guessInput').value, 10);
    attempts++;
    document.getElementById('attemptsLeft').textContent = `Tentatives restantes : ${maxAttempts - attempts}`;

    if (userGuess === randomNumber) {
        document.getElementById('feedback').textContent = `Félicitations ! Vous avez trouvé le chiffre en ${attempts} tentatives.`;
        blaskConfetti();
        guessed = true;
    } else if (userGuess < randomNumber) {
        document.getElementById('feedback').textContent = "Le chiffre est plus grand.";
    } else {
        document.getElementById('feedback').textContent = "Le chiffre est plus petit.";
    }

    if (attempts >= maxAttempts && !guessed) {
        document.getElementById('feedback').textContent = `Désolé, vous avez épuisé vos ${maxAttempts} tentatives. Le chiffre était ${randomNumber}.`;
    }

    document.getElementById('guessInput').value = '';
}

function resetGame() {
    document.getElementById('difficultySection').classList.remove('hidden');
    document.getElementById('gameArea').classList.add('hidden');
    document.getElementById('feedback').textContent = '';
    document.getElementById('attemptsLeft').textContent = '';
}

document.getElementById('guessInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        submitGuess();
    }
});
const blaskConfetti = () => {
    const duration = 15 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
  
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
  
    const particleCount = 50 * (timeLeft / duration);
  
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};