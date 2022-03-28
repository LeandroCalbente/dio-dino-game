const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let posicao = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (posicao >= 150) {
            clearInterval(upInterval);
            //descer
            let downInterval = setInterval(() => {
                if (posicao <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    posicao -= 20;
                    dino.style.bottom = posicao + 'px';
                }
            }, 20);
        } else {
            //subir
            posicao += 20;
            dino.style.bottom = posicao + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosicao = 1000;
    let randomTime = Math.random() * 6000;


    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {

        if (cactusPosicao < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosicao > 0 && cactusPosicao < 60 && posicao < 60) {
            //Fim do jogo
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim do jogo</h1>';

        }

        {
            cactusPosicao -= 10;
            cactus.style.left = cactusPosicao + 'px';
        }
    }, 20);
    setTimeout(createCactus, randomTime);
}
createCactus();
document.addEventListener('keyup', handleKeyUp);