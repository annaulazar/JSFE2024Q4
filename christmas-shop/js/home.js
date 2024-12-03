import {GIFTS, TAGS} from "./gifts_data.js";

const days = document.querySelector('#days')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const cardsItems = document.querySelector('.gifts__cards');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const slider = document.querySelector('.slider-row');
const sliderRowWidth = 1995;
let cntSteps = 0;


function timerNewYear() {
    let curentData = new Date()
    let newYearData = new Date(curentData.getUTCFullYear() + 1, 0, 1)

    let left = newYearData.getTime() - curentData.getTime() - curentData.getTimezoneOffset() * 60 * 1000
    let daysLeft = Math.floor(left / 1000 / 60/ 60 / 24)
    let hoursLeft = Math.floor(left / 1000 / 60/ 60) % 24
    let minutesLeft = Math.floor(left / 1000 / 60) % 60
    let secondsLeft = Math.floor(left / 1000) % 60

    days.innerText = daysLeft
    hours.innerText = hoursLeft
    minutes.innerText = minutesLeft
    seconds.innerText = secondsLeft
}

function createCard(cardObj) {
    const card = document.createElement('div');
    card.classList = 'gifts__cards-item card';
    card.classList.add(TAGS[cardObj.category]);
    const content = `<div class="card-image"></div>
                    <div class="card-text">
                        <div class="card-tag header4">${cardObj.category}</div>
                        <h3 class="card-title header3">${cardObj.name}</h3>
                    </div>`;
    card.innerHTML = content;
    return card;
}

function addRandomCards(cnt, array) {
    let randomIndexes = []
    while (randomIndexes.length < cnt) {
        let index = Math.floor(Math.random() * array.length)
        if (!randomIndexes.includes(index)) {
            randomIndexes.push(index)
        }
    }
    let bestCards = []
    for (let i of randomIndexes) {
        bestCards.push(array[i])
    }
    for (let cardObj of bestCards) {
        let cardItem = createCard(cardObj);
        cardsItems.appendChild(cardItem);
    }
}

function getSliderStep() {
    let step;
    let containerWidth = document.querySelector('.slider__content').clientWidth;
    let windowWidth = window.innerWidth;
    if (windowWidth > 768) {
        step = Math.ceil((sliderRowWidth - containerWidth) / 3)
        return {step: step, maxcnt: 3}
    } else {
        step = Math.ceil((sliderRowWidth - containerWidth) / 6)
        return {step: step, maxcnt: 6}
    }
}

function moveSliderLeft() {
    let {step, maxcnt} = getSliderStep();
    cntSteps--;
    let deltaX = -(step * cntSteps)
    slider.style.transform = `translate(${deltaX}px, 0)`;
    if (cntSteps === maxcnt - 1) {
        arrowRight.removeAttribute('disabled')
    }
    if (cntSteps === 0) {
        arrowLeft.setAttribute('disabled', null)
    }

}

function moveSliderRight() {
    let {step, maxcnt} = getSliderStep();
    cntSteps++;
    let deltaX = -(step * cntSteps)
    slider.style.transform = `translate(${deltaX}px, 0)`;
    if (cntSteps === 1) {
        arrowLeft.removeAttribute('disabled')
    }
    if (cntSteps === maxcnt) {
        arrowRight.setAttribute('disabled', null)
    }
}

function resetSlider() {
    cntSteps = 0;
    slider.style.transform = `translate(0, 0)`;
    if (!arrowLeft.hasAttribute('disabled')) {
        arrowLeft.setAttribute('disabled', null)
    }
    if (arrowRight.hasAttribute('disabled')) {
        arrowRight.removeAttribute('disabled')
    }
}

addRandomCards(4, GIFTS)
timerNewYear()
setInterval(timerNewYear, 1000)
arrowLeft.addEventListener('click', moveSliderLeft)
arrowRight.addEventListener('click', moveSliderRight)
window.addEventListener('resize', resetSlider)
