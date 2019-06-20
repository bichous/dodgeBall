const canvas = document.querySelector('#background')
const ctx = canvas.getContext('2d')
let interval
let frames = 0
let balls = []


const images = {
  monito: "./images/stickman.png" //cambiar esto por una arreglo de imagenes
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
    return this.x+=10
    }
  }
  moveLeft(){
      if(this.x > canvas.width -  this.width - 450){ 
      return this.x-=10
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
  class Ball{
    constructor (x,y, rnd ){
      this.x =x
      this.y =y
      this.width= 30
      this.height= 25
      this.rnd = Math.floor(Math.random() * (this.width + 50 ))      
    }
    draw(){
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.rnd, 0, Math.PI * 2)
      ctx.fillStyle='white'
      ctx.fill()
      //ctx.stroke()
      ctx.closePath()
      this.y++
     }
  }

const player1 = new Player1(235, canvas.height - 60, images.monito)
const ball = new Ball(0,0)

function update (){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  player1.draw()
  checkCollition()
  drawBalls()
}

function generateBalls(){
  let rndX = Math.random() * canvas.width + 60   //aqui define la posicion random de x dentro del canvas donde sale la pelota
  if (rndX < canvas.width - 150){
    balls.push(new Ball(rndX,0))
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
function gameOver() {
  clearInterval(interval)
  interval = false
}
function checkCollition() {
  balls.map(ball => {
    if (player1.isTouching(ball)) {
      gameOver()
    }
  })
}

function startGame() {
  if (interval)return
  interval = setInterval(update, 1000/240)
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
