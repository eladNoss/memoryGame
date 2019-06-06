const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var counter = 0;
var correct = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;

    checkMatch();
}


function checkMatch() {

    let isMactch = firstCard.dataset.framework ==
        secondCard.dataset.framework;
    if (firstCard.dataset.framework !== secondCard.dataset.framework) {
        counter++;
        $("#score").html(counter);
        console.log(counter);
    } else {
        correct++;

    }
    if (correct == 8) {
        alert("you got " + correct + " out of " + counter + "turns !!");
        location.reload();

    }



    isMactch ? disableCards() : unflipCards()

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
        cards.forEach(card => card.addEventListener('click', flipCard));

    });

};
shuffle();