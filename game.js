const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

// THE PLATE 

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
//  Falling Obstacle

class badTopping{
    constructor(x,y,w,h){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = 50,
    this.h = 50,
    this.speedModifier = Math.random()*2
    }
}

let pointcounterBadTopping = 0
const badToppings = []

setInterval(() => {
    pointcounterBadTopping+=100
badToppings.push(new badTopping())
}, 2500)

let int

function animate() {
    int = window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'purple'
for (let badTopping of badToppings){
    ctx.fillRect(badTopping.x, badTopping.y +=(2*badTopping.speedModifier), badTopping.w, badTopping.h)
    detectCollision(newPlate, badTopping)
    }
console.log(badToppings)
  
    ctx.drawImage(plate, newPlate.x, newPlate.y, newPlate.w, newPlate.h)
  
    document.querySelector('body p').innerHTML = pointcounterBadTopping

  }
  
  animate()

// Falling pancakes 

class pancake{
    constructor(x,y,w,h){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = 50,
    this.h = 50,
    this.speedModifier = Math.random()*2
    }
}

let pointcounterPancake = 0
const pancakes = []

setInterval(() => {
    pointcounter+=100
pancakes.push(new pancake())
}, 2500)

// let int

// function animate() {
//     int = window.requestAnimationFrame(animate)
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.fillStyle = 'purple'
// for (let pancake of pancakes){
//     ctx.fillRect(pancake.x, pancake.y +=(2*pancake.speedModifier), pancake.w, pancake.h)
//     detectCollision(newPlate, pancake)
//     }
// console.log(pancakes)
  
//     ctx.drawImage(plate, newPlate.x, newPlate.y, newPlate.w, newPlate.h)
  
//     document.querySelector('body p').innerHTML = pointcounter

//   }
  
//   animate()

// Falling bonus 





// Collision Logics

  function detectCollision(thePlate, badTopping) {
    if (thePlate.x < badTopping.x + badTopping.w &&
        thePlate.x + thePlate.w > badTopping.x &&
        thePlate.y < badTopping.y + badTopping.h &&
        thePlate.h + thePlate.y > badTopping.y) {
        console.log('collision')
        // window.cancelAnimationFrame(int)
        window.location.reload()
    }
  }

//   Our pancake stack
// let theStack = new Array [] 
// function stackMyCakes{
// if(something colides & is the object we want) 
// {theStack.push(that thing)}


