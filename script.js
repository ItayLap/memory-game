const cards = document.querySelectorAll('.card');

let isFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let attempts = 12;

function setOrder() {
    [...cards].forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
    attempts = 12;
}

setOrder();

function flipCard() {
    let item = event.target.parentElement
    if (lockBoard) return lockBoard;
    if (event.target.parentElement == firstCard) return firstCard;

    item.classList.add('flip');

    if (!isFlippedCard) {
        isFlippedCard = true;
        firstCard = event.target.parentElement;
        return;
    }
    secondCard = event.target.parentElement;
    if (firstCard.dataset.card_pair === secondCard.dataset.card_pair) {
        disableCards()
    }
    else {
        unflipCards();
        setTimeout(() => {
            --attempts;
            if (!attempts) {
                alert("Увы ты проиграл! Давай начнем заново.");
                resetAll();
                setOrder();
            }
        }, 1000)

    }
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
    }, 1000);
}

function resetBoard() {
    [isFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetAll() {
    cards.forEach(card => card.classList.remove("flip"))
}

cards.forEach(card => card.addEventListener('click', flipCard));