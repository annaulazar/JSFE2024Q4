import {GIFTS, TAGS} from "./gifts_data.js";
const cardsItems = document.querySelector('.gifts__cards');
const body = document.querySelector('body');
const modalFon = document.querySelector('.modal-fon')


function getGiftItem(target) {
    let item;
    if (target.classList.contains('card-tag') || target.classList.contains('card-title')) {
        item = target.parentElement.parentElement;
    } else if (target.classList.contains('card-text') || target.classList.contains('card-image')) {
        item = target.parentElement
    } else {
        item = null
    }
    if (item) {
        let name = item.querySelector('.card-title').innerText
        for (let element of GIFTS) {
            if (element.name.toUpperCase() === name) {
                return element
            }
        }
    }
    return null
}

function createCardModal(cardObj) {
    const cardModal = document.createElement('div');
    cardModal.classList = 'card card_modal'
    cardModal.classList.add(TAGS[cardObj.category]);
    const content = `<button class="burger burger-rotated" type="button">
                                <span class="burger-item"></span>
                                <span class="burger-item"></span>
                            </button>
                <div class="card-image"></div>
                    <div class="card-text">
                        <div class="card-text-top">
                            <div class="card-tag header4">${cardObj.category}</div>
                            <h3 class="card-title header3">${cardObj.name}</h3>
                            <p class="card-description paragraph">${cardObj.description}</p>
                        </div>
                        <div class="superpowers">
                            <h4 class="superpowers-title header4">Adds superpowers to:</h4>
                            <ul class="superpowers-list">
                                <li class="superpowers-item">
                                    <div class="superpowers-name paragraph">Live</div>
                                    <div class="superpowers-value paragraph">${cardObj.superpowers.live}</div>
                                    <ul class="superpowers-snows"><li class="snow"></li><li class="snow"></li>
                                        <li class="snow"></li><li class="snow"></li><li class="snow"></li></ul>
                                </li>
                                <li class="superpowers-item">
                                    <div class="superpowers-name paragraph">Create</div>
                                    <div class="superpowers-value paragraph">${cardObj.superpowers.create}</div>
                                    <ul class="superpowers-snows"><li class="snow"></li><li class="snow"></li>
                                        <li class="snow"></li><li class="snow"></li><li class="snow"></li></ul>
                                </li>
                                <li class="superpowers-item">
                                    <div class="superpowers-name paragraph">Love</div>
                                    <div class="superpowers-value paragraph">${cardObj.superpowers.love}</div>
                                    <ul class="superpowers-snows"><li class="snow"></li><li class="snow"></li>
                                        <li class="snow"></li><li class="snow"></li><li class="snow"></li></ul>
                                </li>
                                <li class="superpowers-item">
                                    <div class="superpowers-name paragraph">Dream</div>
                                    <div class="superpowers-value paragraph">${cardObj.superpowers.dream}</div>
                                    <ul class="superpowers-snows"><li class="snow"></li><li class="snow"></li>
                                        <li class="snow"></li><li class="snow"></li><li class="snow"></li></ul>
                                </li>
                            </ul>
                        </div>
                    </div>`;
    cardModal.innerHTML = content;
    let superItems = cardModal.querySelectorAll('.superpowers-item')
    for (let superItem of superItems) {
        let value = +superItem.querySelector('.superpowers-value').innerText[1]
        let brightSnows = superItem.querySelectorAll('.snow')
        while (value > 0) {
            brightSnows[value - 1].classList.add('snow-bright')
            value--
        }
    }
    body.appendChild(cardModal)
}


function openModalCard(e) {
    let giftItem = getGiftItem(e.target)
    if (giftItem) {
        createCardModal(giftItem)
    }
    body.classList.add('modal-open')
    modalFon.style.display = 'block'
    const modalCloseButton = document.querySelector('.card_modal').querySelector('.burger')
    modalCloseButton.addEventListener('click', closeModalCard)
}

function closeModalCard() {
    body.classList.remove('modal-open')
    modalFon.style.display = 'none'
    let modal = document.querySelector('.card_modal')
    body.removeChild(modal)
}

cardsItems.addEventListener('click', openModalCard)
modalFon.addEventListener('click', closeModalCard)

