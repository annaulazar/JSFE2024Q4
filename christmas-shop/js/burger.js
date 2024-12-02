function burgerMenu() {
    document.getElementById('burger-menu').classList.toggle('show_menu')
    document.getElementById('burger-button').classList.toggle('burger-rotated')
    document.querySelector('body').classList.toggle('body-fixed')
}