let duration = 2500;
let score = 0;
let cross = true;
let restart = document.querySelector('.restart');
let gamedone = document.querySelector('.gamedone');
let mainscore = document.querySelector('.mainscore');
let dino = document.querySelector('.mainplayer');
let obstacles = document.querySelector('.block1');
let right = document.querySelector('.right');
let gamedonecontainer = document.querySelector('.gamedone');
let keycode;
let refreshpage = () => {
    window.location.reload();
};

const controls = (e) => {
    // console.log('key code is', e.key)
    keycode = e.key;
    if ((keycode == 'ArrowUp') || (keycode == 'w') || (keycode == 'W')) {
        dino.classList.add('jump');
        setTimeout(() => {
            dino.classList.remove('jump');
        }, 500);
    } else if (keycode == ' ') {
        right.classList.toggle('pause');
        if (cross) {
            cross = false
        } else {
            cross = true;
        }
        return
    }
}

document.addEventListener("keydown", controls);

// to check for collision
let dx, dy, ox, oy, offsetx, offsety;
const checkforcollision = setInterval(() => {
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));
    ox = parseInt(window.getComputedStyle(obstacles, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacles, null).getPropertyValue('bottom'));
    offsetx = ox - dx;
    offsety = dy - oy;
}, 10);

// function to update score by 1 digits

let maingamelogic = setInterval(() => {

    if ((offsetx >= -100) && (offsetx <= 120) && (offsety <= 100)) {
        clearInterval(maingamelogic);
        clearInterval(checkforcollision);
        document.removeEventListener("keydown", controls);
        obstacles.classList.add('pause');
        dino.style.bottom = `${dy}px`;
        // obstacles.style.left = `${offsetx}px`;


        restart.style.visibility = 'visible';
        right.style.animationDuration = `${duration}ms`
        // to store the highest score in cache
        let highestscore = parseInt(localStorage.getItem('highestscore'));
        if (highestscore < parseInt(mainscore.innerText)) {
            gamedonecontainer.innerText = 'Game Over ! New highest Score';
            localStorage.setItem("highestscore", mainscore.innerText)
        } else {
            gamedonecontainer.innerText = 'Game Over ! Try again';
        }
        return;
    } else if (cross) {
        // to increase score
        mainscore.innerText = ++score;
        // to increase speed of game
        right.style.animationDuration = `${duration}ms`
    }
}, 50);



