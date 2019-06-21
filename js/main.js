const canvas = document.querySelector('#background')
const ctx = canvas.getContext('2d')

//Variables
let balls = []
//let radius = Math.floor(Math.random() * (canvas.width - 300))
//let ballX = Math.floor(Math.random() * canvas.width)
//let ballY = 0
let interval 
let frames = 0
const images = {
  monito: "./images/stickman.png" //cambiar esto por una arreglo de imagenes
}
//Variables para fisica de la pelota
let vel = 5

class Ball {
  constructor (x, y, radius, velo) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = 'red'
    this.isMoving = true
    this.toUp = false
    this.toLeft = false 
    
    this.getDistance = function(ball) {
    let xD = this.x-ball.x
    let yD = this.y-ball.y 
    return Math.sqrt(Mat.pw(xD, 2) + Math.pow(yD, 2))
    }

    this.isTouching = function (ball) {
      return this.getDistance(ball) < this.radius + ball.radius
    }
    
    this.move = function(){
      if(!this.isMoving) return;
      var rX = this.x + this.radius;
      var rY = this.y + this.radius;
      //arriba y abajo
      if(this.toUp){
        this.y-=velo ? velo : vel;
      }else{
        this.y+=velo ? velo : vel;
      }
      //izq derecha
      if(this.toLeft){
        this.x-=velo ? velo: vel;
      }else{
        this.x+=velo ? velo : vel;
      }
      //techo y pis
      if(rY > canvas.height){
        this.toUp = true;
      }else if(rY < 0 + this.radius * 2 ){
        this.toUp = false;
      }
      //paredes
      if(rX > canvas.width){
        this.toLeft = true;
      }else if(rX < 0 + this.radius * 2){
        this.toLeft = false;
      }
    }

    this.draw = function(){
      this.move();
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      
    }
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
//const ball = new Ball (ballX, ballY, radius)
//console.log(balls)
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
  let rndY = Math.random() * canvas.width + 60
  let radius = Math.floor(Math.random() * (canvas.width - 400))
  //let vy = (Math.random() * -15) + -5
  //console.log(vy)
  if (rndX < canvas.width - 150){
    balls.push(new Ball(rndX, rndY, radius))
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