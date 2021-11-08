const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

let plate = new Image()
plate.src = 'images/pancake.jpeg'
plate.onload = () => {
    ctx.drawImage(plate, 150, canvas.height - 260, 158, 250)
    
}

let newPlate = {
    x: 150,
    y: canvas.height-260,
    w: 325,
    h: 250,
} 

window.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowLeft':
        newPlate.x -= 50;
            break;

        case 'ArrowRight':
        newPlate.x += 50;
        break
    } 
}

class Roadblock{
    constructor(x,y,w,h){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = 50,
    this.h = 50,
    this.speedModifier = Math.random()*2
    }
}

let pointcounter = 0
const roadblocks = []

setInterval(() => {
    pointcounter+=100
roadblocks.push(new Roadblock())
}, 2500)

let int

function animate() {
    int = window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'purple'
for (let roadblock of roadblocks){
    ctx.fillRect(roadblock.x, roadblock.y +=(2*roadblock.speedModifier), roadblock.w, roadblock.h)
    detectCollision(newPlate, roadblock)
    }
console.log(roadblocks)
  
    ctx.drawImage(plate, newPlate.x, newPlate.y, newPlate.w, newPlate.h)
  
    document.querySelector('body p').innerHTML = pointcounter

  }
  
  animate()

  function detectCollision(thePlate, theObstacle) {
    if (thePlate.x < theObstacle.x + theObstacle.w &&
        thePlate.x + thePlate.w > theObstacle.x &&
        theCar.y < theObstacle.y + theObstacle.h &&
        theCar.h + theCar.y > theObstacle.y) {
        console.log('collision')
        window.cancelAnimationFrame(int)
        // window.location.reload()
    }
  }