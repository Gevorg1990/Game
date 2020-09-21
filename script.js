let cvs = document.getElementById('canvas');

let ctx = cvs.getContext('2d')

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeUp.src = "images/pipeUp.png";
pipeBottom.src = "images/pipeBottom.png";


// zvuki

let fly = new Audio();
let score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src="audio/score.mp3"

let gap = 90;
// click func
document.addEventListener("keydown", moveUp);
function moveUp() {
   yPos -= 25;
   fly.play()
}

// bloki

let pipe = [];
pipe[0] = {
   x: cvs.width,
   y:0
}


// pos bird
let xPos = 10;
let yPos = 150;
let grav = 1.5;
let score = 0;
let dop =0;



function draw() {
   ctx.drawImage(bg, 0, 0,)
   
   for (let i = 0; i < pipe.length; i++){
      ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
      ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
      
      pipe[i].x--;

      if (pipe[i].x == 125) {
         pipe.push({
            x: cvs.width,
            y:Math.floor(Math.random()*pipeUp.height)-pipeUp.height
         })
      }

      if (xPos + bird.width >= pipe[i].x
         && xPos <= pipe[i].x + pipeUp.width
         && (yPos <= pipe[i].y + pipeUp.height
         || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
         ){
       
         location.reload()
    }
      if (pipe[i].x == 5) {
         score++;
         
         if (score > dop) {
            localStorage.setItem('num', dop++);
         }
         score_audio.play();
      }

      if ( yPos + bird.height >= cvs.height - fg.height) {
         location.reload()
         alert('Game over')
      }
   }

   
   
   ctx.drawImage(fg, 0, cvs.height - fg.height)
   ctx.drawImage(bird, xPos, yPos)
   
   yPos += grav;
   ctx.fillStyle = "#000";
   ctx.font = "24px Verdana";
   ctx.fillText('score: ' + score, 10, cvs.height - 20)
 
   ctx.fillText('record: ' + dop, 140, cvs.height - 20)


   
  

   


   


 

   requestAnimationFrame(draw)
}


if (localStorage.getItem('num')!==null) {
 
   let don = localStorage.getItem('num');
   
      dop = don;

     
   
}



pipeBottom.onload = draw;








  
