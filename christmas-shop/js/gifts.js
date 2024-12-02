import {GIFTS} from "./gifts_data.js";

const giftsMenu = document.querySelector('.gifts__menu')
const cardsItems = document.querySelector('.gifts__cards')
const tags = {
    "For Work": "for-work",
    "For Health": "for-health",
    "For Harmony": "for-harmony",
}

function createCard(cardObj) {
    const card = document.createElement('div');
    card.classList = 'gifts__cards-item card'
    card.classList.add(tags[cardObj.category])
    const content = `<div class="card-image"></div>
                    <div class="card-text">
                        <div class="card-tag header4">${cardObj.category}</div>
                        <h3 class="card-title header3">${cardObj.name}</h3>
                    </div>`
    card.innerHTML = content
    return card
}

const allCards = []
for (let cardObj of GIFTS) {
    allCards.push(createCard(cardObj))
}

function createCards(cardsList) {
    for (let cardItem of cardsList) {
        cardsItems.appendChild(cardItem)
    }
}
function updateCards(filter) {
    cardsItems.innerHTML = ''
    if (filter === 'ALL') {
        createCards(allCards)
    } else {
        let filterCards = allCards.filter((elem) => elem.querySelector('.card-tag').innerText.toUpperCase() === filter)
        createCards(filterCards)
    }
}
function cardsFilter(e) {
    let target = e.target;
    let activeLink = giftsMenu.querySelector('.active-link')
    if (target.classList.contains('gifts__menu-link') && !target.classList.contains('active-link')) {
        activeLink.classList.remove('active-link')
        target.classList.add('active-link')
        updateCards(target.innerText)
    }
}


createCards(allCards)
giftsMenu.addEventListener('click', cardsFilter)
