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

let stackedArray = []  // new array for collided objs that need to stack

let newPlate = {
    x: 150,
    y: canvas.height-260,
    w: 325,
    h: 250,
} 

// class newPlate {
//     constructor(x, y, w, h){
//     this.x =150,
//     this.y = canvas.height-260,
//     this.w = 325,
//     this.h = 250
//     // this.stackedArray = [plate]
//     }
// }

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
    constructor(id){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = 50,
    this.h = 50,
    this.speedModifier = Math.random()*2,
    this.id = Math.random()
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


// arrays of falling objects &
let pointcounterBadTopping = 0
let badToppingsArr = []

let pointcounterBonus = 0
const bonusesArr = []

let pointcounterPancake = 0
const pancakesArr = []

// intervals for falling objects
let id = 0

setInterval(() => {
    //pointcounterBadTopping+=100
    badToppingsArr.push(new badTopping(id++))
    }, 2000)

setInterval(() => {
    pointcounterPancake+=100
    pancakesArr.push(new Pancake())
    }, 2500)
    
setInterval(() => {
    pointcounterBonus+=100
    bonusesArr.push(new Bonus())
    }, 3000)

let int


// GAME ENGINE 


function animate() {
    int = window.requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // draw badToppings objs
    ctx.fillStyle = 'purple'
    for (let badTopping of badToppingsArr){
        ctx.fillRect(badTopping.x, badTopping.y +=(2*badTopping.speedModifier), badTopping.w, badTopping.h)
        console.log(badToppingsArr)
        detectBadToppingCollision(newPlate, badTopping)
        }
    // draw pancakes objs
    ctx.fillStyle = 'yellow'
    for (let pancake of pancakesArr){
        ctx.fillRect(pancake.x, pancake.y +=(2*pancake.speedModifier), pancake.w, pancake.h)
        detectPancakeCollision(newPlate, pancake)
        }
    // draw bonus objs
    ctx.fillStyle = 'pink'
    for (let bonus of bonusesArr){
        ctx.fillRect(bonus.x, bonus.y +=(2*bonus.speedModifier), bonus.w, bonus.h)
        detectBonusCollision(newPlate, bonus)
        } 
    // plate catcher
    ctx.drawImage(plate, newPlate.x, newPlate.y, newPlate.w, newPlate.h)
    // for (let i =0; i< stackedArray.length; i++){
    //     ctx.fillRect(newPlate.x, newPlate.y - stackedArray[i+1] * 50, stackedArray[i].w, stackedArray[i].h)
    //     // detectCollision(newPlate, stackedArray[i])
    // }
  
    // document.querySelector('body p').innerHTML = pointcounterBadTopping
}
  
animate()


// Collision Logics

function detectBadToppingCollision(plate, obj) {
if (plate.x < obj.x + obj.w &&
    plate.x + plate.w > obj.x &&
    plate.y < obj.y + obj.h &&
    plate.h + plate.y > obj.y) {
    console.log(obj.id)
    badToppingsArr = badToppingsArr.filter(badItem => badItem.id !== obj.id)
    // window.cancelAnimationFrame(int)
    // stackedArray.push(badTopping)
    // need to delete initial obj that collided with array
    // debugger
    // window.location.reload()
}
}
function detectPancakeCollision(thePlate, pancake) {
if (thePlate.x < pancake.x + pancake.w &&
    thePlate.x + thePlate.w > pancake.x &&
    thePlate.y < pancake.y + pancake.h &&
    thePlate.h + thePlate.y > pancake.y) {
    console.log('collision', pancake)
    // pancakesArr = pancakesArr.filter(badItem => {
    //     return badItem.id !== pancake.id
    // })
    // window.cancelAnimationFrame(int)
    // stackedArray.push(pancake)
    // need to delete initial obj that collided with array
    
    // debugger
    // window.location.reload()
}
}
function detectBonusCollision(thePlate, bonus) {
if (thePlate.x < bonus.x + bonus.w &&
    thePlate.x + thePlate.w > bonus.x &&
    thePlate.y < bonus.y + bonus.h &&
    thePlate.h + thePlate.y > bonus.y) {
    console.log('collision', bonus)
    // bonussArr = bonussArr.filter(badItem => {
    //     return badItem.id !== bonus.id
    // })
    // window.cancelAnimationFrame(int)
    // stackedArray.push(bonus)
    // need to delete initial obj that collided with array
    // debugger
    // window.location.reload()
}
}

//   Our bonus stack
// let theStack = new Array [] 
// function stackMyCakes{
// if(something colides & is the object we want) 
// {theStack.push(that thing)}
