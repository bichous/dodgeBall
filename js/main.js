const canvas = document.querySelector('#background')
const ctx = canvas.getContext('2d')

//Variables
let balls = []
let radius = Math.floor(Math.random() * (canvas.width - 300))
let ballX = Math.floor(Math.random() * canvas.width)
let ballY = 0
let interval 
let frames = 0
const images = {
  monito: "./images/stickman.png" //cambiar esto por una arreglo de imagenes
}
//Variables para fisica de la pelota
let vx = 5.0
let vy = (Math.random() * -15) + -5
let gravity = 0.9
let bounce = 0.7
let xFriction = 0.1

class Ball {
  constructor (x, y, radius, vx, vy, gravity, bounce) {
    this.x = x,
    this.y = y,
    this.radius = radius,
    this.status = 0;
    this.color = 'red'
    this.vx = vx
    this.vy = vy
    this.gravity = gravity 
    this.bounce = bounce 
  }
  draw(){
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
    //this.y+=vy
    this.ballMovement()
  }
  ballMovement(){
    this.x += vx;
    this.y += vy;
    vy += gravity;
    
    //If either wall is hit, change direction on x axis
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0){
        vx *= -1;
    } 
    
      // Ball hits the floor
    if (this.y + this.radius > canvas.height){// ||
      
        // Re-positioning on the base
       this.y = canvas.height - this.radius;
        //bounce the ball
          vy *= -bounce;
        //do this otherwise, ball never stops bouncing
          if(vy<0 && vy>-2.1)
                     vy=0;
        //do this otherwise ball never stops on xaxis
         if(Math.abs(vx)<1.1)
             vx=0;
   
         this.xF();
         
        }
    }

    xF(){
      if(vx>0)
          vx = vx - xFriction;
      if(vx<0)
          vx = vx + xFriction;
        }

  }


class Player1 {
    constructor(x, y, img){
      this.x = x
      this.y = y
      this.width =50
      this.height = 70
      this.img = new Image()
      this.img.src = img
      //clearRect(0,0, this.width, this.height)
    }
    draw(){
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    moveRigth(){
      if(this.x < canvas.width - this.width){ 
      return this.x+=15
      }
    }
    moveLeft(){
        if(this.x > canvas.width -  this.width - 450){ 
        return this.x-=15
        }
      }
      isTouching(ball){
        return(
          this.x < ball.x + ball.rnd &&
          this.x + this.width > ball.x &&
          this.y < ball.y + ball.rnd &&
          this.y + this.height > ball.y
        )
      }
    }


//Instancias
const ball = new Ball (ballX, ballY, radius)
console.log(balls)
const player1 = new Player1(235, canvas.height - 60, images.monito)

//Funciones
function update (){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  player1.draw()
  //checkCollition()
  drawBalls()
}

function startGame() {
  if (interval)return
  interval = setInterval(update, 1000/120)
}

function generateBalls(){
  let rndX = Math.random() * canvas.width + 60
  let radius = Math.floor(Math.random() * (canvas.width - 400))
  let vy = (Math.random() * -15) + -5
  console.log(vy)
  if (rndX < canvas.width - 150){
    balls.push(new Ball(rndX, ballY, radius, vx, vy, gravity, bounce))
  }

}

function drawBalls(){
  if(frames % 200 === 0){
    generateBalls()
  }
  balls.map(ball=> {
    ball.draw()
  })
}

// function checkCollition() {
  // balls.map(ball => {
    // if (player1.isTouching(ball)) {
      // gameOver()
    // }
  // })
// }

function gameOver() {
  clearInterval(interval)
  interval = false
}

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
  
};

//listeners
addEventListener('keydown', (e) => {
  if (e.keyCode === 39){
    player1.moveRigth()
  }else if(e.keyCode === 37){
    player1.moveLeft()
  }
})