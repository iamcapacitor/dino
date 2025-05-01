let duration = 3000;
let score = 0;
let cross = true;
let restart = document.querySelector('.restart');
let gamedone = document.querySelector('.gamedone');
let mainscore = document.querySelector('.mainscore');
let refreshpage = ()=>{
    window.location.reload();
};

document.onkeydown = function(e){
    console.log('key code is' , e.keyCode)
    keycode = e.keyCode;
    if((keycode == 38) || (keycode == 87)){
        dino = document.querySelector('.mainplayer');
        console.log('i am jumping');
        dino.classList.add('jump');
        setTimeout(()=>{
            dino.classList.remove('jump');
        },400);
    }else if(keycode == 32){
        document.querySelector('.right').classList.toggle('pause');
        return
    }
};

// to check for collision
setInterval(()=>{
    dino = document.querySelector('.mainplayer');
    obstacles = document.querySelector('.obstacles');
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));
    ox = parseInt(window.getComputedStyle(obstacles, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacles, null).getPropertyValue('bottom'));
    offsetx = ox-dx;
    offsety = dy-oy;
},10);

// function to update score by 1 digits

setInterval(()=>{

if((offsetx >= -100) && (offsetx <= 120) && (offsety <=100) ){
    document.querySelector('.right').classList.add('pause');
    dino.style.bottom =`${dy}px`;
    document.querySelector('.right').style.left = `${offsetx}px`;
    document.querySelector('.gamedone').innerHTML = 'Game Over ! Good Score';
    document.querySelector('.restart').style.visibility = 'visible';
    document.querySelector('.right').style.animationDuration = `${duration}ms`
    return;
}else if (keycode !== 32){
    // to increase score
    mainscore.innerHTML = ++score; 
    // to increase speed of game
    let  right = document.querySelector('.right');
     right.style.animationDuration = `${--duration}ms`
}
},100);



