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
        newPlate.x -= 40;
            break;
        case 'ArrowRight':
        newPlate.x += 40;
        break
    } 
}

//  Falling objects
class badTopping{
    constructor(x,y,w,h){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = 50,
    this.h = 50,
    this.speedModifier = Math.random()*2
    }
}
class Pancake{
    constructor(x,y,w,h){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = 50,
    this.h = 50,
    this.speedModifier = Math.random()*2
    }
}
class Bonus{
    constructor(x,y,w,h){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = 50,
    this.h = 50,
    this.speedModifier = Math.random()*2
    }
}


// arrays of falling objects
let pointcounterBadTopping = 0
const badToppings = []

let pointcounterBonus = 0
const bonuses = []

let pointcounterPancake = 0
const pancakes = []

let stackedArray = []  // new array for collided objs that need to stack


// intervals for falling objects
setInterval(() => {
    pointcounterBadTopping+=100
    badToppings.push(new badTopping())
    }, 2000)

setInterval(() => {
    pointcounterPancake+=100
    pancakes.push(new Pancake())
    }, 2500)
    
setInterval(() => {
    pointcounterBonus+=100
    bonuses.push(new Bonus())
    }, 3000)

let int

function animate() {
    int = window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // draw badToppings objs
    ctx.fillStyle = 'purple'
    for (let badTopping of badToppings){
        ctx.fillRect(badTopping.x, badTopping.y +=(2*badTopping.speedModifier), badTopping.w, badTopping.h)
        detectCollision(newPlate, badTopping)
        }
    // draw pancakes objs
    ctx.fillStyle = 'yellow'
    for (let pancake of pancakes){
        ctx.fillRect(pancake.x, pancake.y +=(2*pancake.speedModifier), pancake.w, pancake.h)
        detectCollision(newPlate, pancake)
        }
    // draw bonus objs
    ctx.fillStyle = 'pink'
    for (let bonus of bonuses){
        ctx.fillRect(bonus.x, bonus.y +=(2*bonus.speedModifier), bonus.w, bonus.h)
        detectCollision(newPlate, bonus)
        } 
    // plate catcher
    ctx.drawImage(plate, newPlate.x, newPlate.y, newPlate.w, newPlate.h)
    for (let i =0; i< stackedArray.length; i++){
        ctx.fillRect(newPlate.x, newPlate.y - stackedArray[i+1] * 50, stackedArray[i].w, stackedArray[i].h)
        detectCollision(newPlate, stackedArray[i])
    }
  
    // document.querySelector('body p').innerHTML = pointcounterBadTopping
}
  
animate()


// Collision Logics

function detectCollision(thePlate, badTopping) {
if (thePlate.x < badTopping.x + badTopping.w &&
    thePlate.x + thePlate.w > badTopping.x &&
    thePlate.y < badTopping.y + badTopping.h &&
    thePlate.h + thePlate.y > badTopping.y) {
    console.log('collision')
    // window.cancelAnimationFrame(int)
    // stackedArray.push(badTopping)
    // need to delete initial obj that collided with array
    console.log(stackedArray)
    // debugger
    // window.location.reload()
}
}

//   Our bonus stack
// let theStack = new Array [] 
// function stackMyCakes{
// if(something colides & is the object we want) 
// {theStack.push(that thing)}


