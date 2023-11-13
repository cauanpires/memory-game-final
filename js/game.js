const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer')
const personagens = [
    'andrey',
    'cauã',
    'carlos',
    'la coca',
];

const createElement = (tag, className)=>{
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstcard = '';
let secundcard= '';

const checkendgame = ()=> {
    const disabledcards = document.querySelectorAll('.disabled-card');

    if (disabledcards.length == 8){
        clearInterval(this.loop);
        alert(`Parabens ${spanPlayer.innerHTML}! Seu tempo foi ${timer.innerHTML}`);
    }
}

const startTime = () => {

    this.loop = setInterval (() => {

        const  currenttimer = +timer.innerHTML;
        timer.innerHTML = currenttimer + 1;

    }, 1000 );

}

const checkcards =() => {
    const firstperso = firstcard.getAttribute('data-personagem');
    const secundperso = secundcard.getAttribute('data-personagem');

    if(firstperso == secundperso) {

        firstcard.firstChild.classList.add('disabled-card');
        secundcard.firstChild.classList.add('disabled-card');

        firstcard = '';
        secundcard = '';

        checkendgame();

    }else {
        setTimeout(() => {
            firstcard.classList.remove('reveal-card');
            secundcard.classList.remove('reveal-card');

            firstcard = '';
            secundcard = '';
        
        }, 500)

    
    }
}

const revealcard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')){
        return;
    }
    if(firstcard == ''){
        target.parentNode.classList.add('reveal-card');
        firstcard = target.parentNode;
    }else if(secundcard == ''){
        target.parentNode.classList.add('reveal-card');
        secundcard = target.parentNode;

        checkcards()
    }
}

const createCard = (personagem) =>{
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${personagem}.jpeg')` ;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealcard);
    card.setAttribute('data-personagem', personagem);

    return card;
}

const loadGame =  () =>{

    const duplicatepersonagens = [ ... personagens, ... personagens];

    const embraralhar = duplicatepersonagens.sort(() => Math.random() -0.5);

    embraralhar.forEach((personagem) => {
        const  card = createCard(personagem);
        grid.appendChild(card)
    });
}







window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTime();
    loadGame();
}