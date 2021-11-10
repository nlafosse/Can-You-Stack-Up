const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')



// THE PLATE 
let plate = new Image()
plate.src = 'images/pancake.jpeg'
plate.onload = () => {
    ctx.drawImage(plate, 150, canvas.height - 260, 158, 250)
    document.getElementById('score').innerHTML = "SCORE: " + newPlate.score;
    
}

let stackedArray = []  // new array for collided objs that need to stack

let newPlate = {
    x: 150,
    y: canvas.height-260,
    w: 325,
    h: 250,
    // SCORE COUNTER
    score: 0,
    // PANCAKE COUNTER
    pancakeCount: 0
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
    constructor(id){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = 50,
    this.h = 50,
    this.speedModifier = Math.random()*2,
    this.id = id
    }
}
class Pancake{
    constructor(id){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = 50,
    this.h = 50,
    this.speedModifier = Math.random()*2,
    this.id = id
    }
}
class Bonus{
    constructor(id){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = 50,
    this.h = 50,
    this.speedModifier = Math.random()*2,
    this.id = id
    }
}


// arrays of falling objects &
// let pointcounterBadTopping = 0
let badToppingsArr = []

// let pointcounterBonus = 0
let bonusesArr = []

// let pointcounterPancake = 0
let pancakesArr = []

// intervals for falling objects
let id = 0

setInterval(() => {
    //pointcounterBadTopping+=100
    badToppingsArr.push(new badTopping(id++))
    }, 2000)

setInterval(() => {
    // pointcounterPancake+=100
    pancakesArr.push(new Pancake(id++))
    }, 2500)
    
setInterval(() => {
    // pointcounterBonus+=100
    bonusesArr.push(new Bonus(id++))
    }, 3000)

let int


// GAME ENGINE 


function startGame() {
    int = window.requestAnimationFrame(startGame)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // draw badToppings objects
    ctx.fillStyle = 'purple'
    for (let badTopping of badToppingsArr){
        ctx.fillRect(badTopping.x, badTopping.y +=(2*badTopping.speedModifier), badTopping.w, badTopping.h)
        console.log(badToppingsArr)
        detectBadToppingCollision(newPlate, badTopping)
        }
    // draw pancakes objects
    ctx.fillStyle = 'yellow'
    for (let pancake of pancakesArr){
        ctx.fillRect(pancake.x, pancake.y +=(2*pancake.speedModifier), pancake.w, pancake.h)
        detectPancakeCollision(newPlate, pancake)
        }
    // draw bonus objects
    ctx.fillStyle = 'pink'
    for (let bonus of bonusesArr){
        ctx.fillRect(bonus.x, bonus.y +=(2*bonus.speedModifier), bonus.w, bonus.h)
        detectBonusCollision(newPlate, bonus)
        } 
    // plate catcher
    ctx.drawImage(plate, newPlate.x, newPlate.y, newPlate.w, newPlate.h)

    for(let i =0; i < stackedArray.length; i++){
        let pancake=stackedArray[i]
        ctx.drawImage(plate,newPlate.x, newPlate.y-50*(i+1), pancake.w, pancake.h)
        newPlate.y += pancake.y-50*(i+1)
    }
    
}
  
// startGame()


// Collision Logics

function detectBadToppingCollision(plate, badTopping) {
    if (plate.x < badTopping.x + badTopping.w &&
        plate.x + plate.w > badTopping.x &&
        plate.y < badTopping.y + badTopping.h &&
        plate.h + plate.y > badTopping.y) {
            badToppingsArr = badToppingsArr.filter(badItem => badItem.id !== badTopping.id)
            // SUBTRACT FROM SCORE
            plate.score -= 5
            // UPDATE SCORE DISPLAY
            document.getElementById('score').innerHTML = "SCORE: " + newPlate.score;
        }
}

function detectBonusCollision(thePlate, bonus) {
    if (thePlate.x < bonus.x + bonus.w &&
        thePlate.x + thePlate.w > bonus.x &&
        thePlate.y < bonus.y + bonus.h &&
        thePlate.h + thePlate.y > bonus.y) {
            bonusesArr = bonusesArr.filter(bonusItem => bonusItem.id !== bonus.id)
            // ADD TO SCORE
            thePlate.score += 10
            // UPDATE SCORE DISPLAY
            document.getElementById('score').innerHTML = "SCORE: " + newPlate.score;
        }
}

function detectPancakeCollision(thePlate, pancake) {
    if (thePlate.x < pancake.x + pancake.w &&
        thePlate.x + thePlate.w > pancake.x &&
        thePlate.y < pancake.y + pancake.h &&
        thePlate.h + thePlate.y > pancake.y) {
            pancakesArr = pancakesArr.filter(pancakeItem => pancakeItem.id !== pancake.id)
            stackedArray.push(pancake)
            // for(pancake in stackedArray){
            //     thePlate.y += pancake[i+1].y
            // }
            //COUNTING PANCAKES. If 10 pancakes stacked on plate END OF GAME
            if(stackedArray.length === 10) {
                alert("WHO WANTS SOME PANCAKES?");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
    }
}
