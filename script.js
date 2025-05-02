let duration = 3000;
let score = 0;
let cross = true;
let restart = document.querySelector('.restart');
let gamedone = document.querySelector('.gamedone');
let mainscore = document.querySelector('.mainscore');
let keycode;
let refreshpage = ()=>{
    window.location.reload();
};

document.onkeydown = function(e){
    // console.log('key code is' , e.key)
    keycode = e.key;
    if((keycode == 'ArrowUp') || (keycode == 'w') || (keycode == 'W')){
        dino = document.querySelector('.mainplayer');
        // console.log('i am jumping');
        dino.classList.add('jump');
        setTimeout(()=>{
            dino.classList.remove('jump');
        },400);
    }else if(keycode == ' '){
        document.querySelector('.right').classList.toggle('pause');
        if(cross){
          cross = false
        }else{
          cross = true;
        }
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

let maingamelogic = setInterval(()=>{

if((offsetx >= -100) && (offsetx <= 120) && (offsety <=100) ){
  clearInterval(maingamelogic);
    document.querySelector('.right').classList.add('pause');
    dino.style.bottom =`${dy}px`;
    document.querySelector('.right').style.left = `${offsetx}px`;
    
   
    document.querySelector('.restart').style.visibility = 'visible';
    document.querySelector('.right').style.animationDuration = `${duration}ms`
    // to store the highest score in cache
    let highestscore = parseInt(localStorage.getItem('highestscore'));
    if(highestscore < parseInt(mainscore.innerHTML)){
      document.querySelector('.gamedone').innerHTML = 'Game Over ! New highest Score';
      localStorage.setItem("highestscore",mainscore.innerHTML)
    }else{
      document.querySelector('.gamedone').innerHTML = 'Game Over ! Good Score';
    }
    return;
}else if (cross){
    // to increase score
    mainscore.innerHTML = ++score; 
    // to increase speed of game
    let  right = document.querySelector('.right');
     right.style.animationDuration = `${--duration}ms`
}
},100);



