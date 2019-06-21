const canvas = document.querySelector('#background')
const ctx = canvas.getContext('2d')
const restart = document.querySelector('#reset-button')

//Variables
let balls = []
//let radius = Math.floor(Math.random() * (canvas.width - 300))
//let ballX = Math.floor(Math.random() * canvas.width)
//let ballY = 0
let interval 
let frames = 0
const images = [
  ["./images/stickman_run-left_1.png","./images/stickman_run-left_2.png"],
  "./images/stickman.png",
  ["./images/stickman_run-right_1.png","./images/stickman_run-right_2.png"]
    ] //cambiar esto por una arreglo de imagenes



//Variables para fisica de la pelota
let vel = 3

class Ball {
  constructor (x, y, radius, velo) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = 'red'
    this.isMoving = true
    this.toUp = false
    this.toLeft = false 
    this.bounce = 0
    
    this.getDistance = function(ball) {
    let xD = this.x-ball.x
    let yD = this.y-ball.y 
    return Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2))
    }

    //this.isTouching = function (ball) {
      //return this.getDistance(ball) < this.radius + ball.radius
    //}
    
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
        if(!this.toUp) {
          this.bounce++
        } 
        this.toUp = true;
      }else if(rY < 0 + this.radius * 2 ){
        if (this.toUp){
          this.bounce++
        }
        this.toUp = false;
      }
      //paredes
      if(rX > canvas.width){
        if (!this.toLeft) {
          this.bounce++
        }
        this.toLeft = true;
      }else if(rX < 0 + this.radius * 2){
        if (this.toLeft){
          this.bounce++
        }
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
    constructor(x, y, images){
      this.x = x
      this.y = y
      this.width =50
      this.height = 70
      this.isRight = false
      this.isLeft = false 
      this.imgStand = new Image ()
      this.imgStand.src = images[1]
      this.img = this.imgStand
      this.imgLeft1 = new Image ()
      this.imgLeft1.src = images[0][0]
      this.imgLeft2 = new Image ()
      this.imgLeft2.src = images[0][1]
      this.imgRight1 = new Image ()
      this.imgRight1.src = images[2][0]
      this.imgRigth2 = new Image ()
      this.imgRigth2.src = images[2][1]
      //this.img.src = images
      //clearRect(0,0, this.width, this.height)
    }
    draw(){
      if(this.isLeft){
        this.img = this.imgLeft1
      }else if (this.isRight) {
        this.img = this.imgRight1
      }else{
        this.img = this.imgStand
      }
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    moveRigth(){
      this.isRight = true
      this.isLeft = false
      if(this.x < canvas.width - this.width){ 
      return this.x+=20
      }
    }
    moveLeft(){
      this.isLeft = true
      this.isRight = false
        if(this.x > canvas.width -  this.width - 450){ 
          return this.x-=20
        }
      }

      getDistance = function(x, y, ball) {
        let xD = x-ball.x
        let yD = y-ball.y 
        
         
        return Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2))
        }

      isTouching(ball){
        return (
        this.getDistance(this.x, this.y, ball) < ball.radius || 
        this.getDistance(this.x + this.width, this.y, ball) < ball.radius ||
        this.getDistance(this.x + (this.width/2), this.y, ball) < ball.radius ||
        this.getDistance(this.x + this.width, this.y + (this.height/2), ball) < ball.radius ||
        this.getDistance(this.x, this.y + (this.height/2), ball) < ball.radius
        )
          // this.x < ball.x + ball.radius &&
          // this.x + this.width > ball.x &&
          // this.y < ball.y + ball.radius &&
          // this.y + this.height > ball.y
        
      }
    }


//Instancias
//const ball = new Ball (ballX, ballY, radius)
//console.log(balls)
const player1 = new Player1(235, canvas.height - 60, images)

//Funciones
function update (){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  drawBalls()
  player1.draw()
  checkCollition()
}

function startGame() {
  if (interval)return
  interval = setInterval(update, 1000/80)
}

function generateBalls(){
  let rndX = Math.random() * canvas.width + 60
  let rndY = Math.random() * canvas.width - 100
  let radius = Math.floor(Math.random() * (canvas.width - 400))
  //let vy = (Math.random() * -15) + -5
  //console.log(vy)
  if (rndX < canvas.width - 150){
    balls.push(new Ball(rndX, rndY, radius))
  }

}

function drawBalls(){
  if(frames % 250 === 0){
    generateBalls()
  }
  balls = balls.filter(ball => ball.bounce <= 10 )

  balls.map(ball=> {
    ball.draw()
  })
}

function checkCollition() {
  balls.map(ball => {
    if (player1.isTouching(ball)) {
      gameOver()
    }
  })
}

function gameOver() {
  clearInterval(interval)
  interval = false
}

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

restart.onclick = e => {
  location.reload()
}
};

//listeners
addEventListener('keydown', (e) => {
  if (e.keyCode === 39){
    player1.moveRigth()
  }else if(e.keyCode === 37){
    player1.moveLeft()
  }
})