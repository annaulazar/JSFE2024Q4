const days = document.querySelector('#days')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')

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

timerNewYear()
setInterval(timerNewYear, 1000)
