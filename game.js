const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
let backgroundMusic;


// THE PLATE 
let plate = new Image()
plate.src = './images/plate.png'
plate.onload = () => {
    ctx.drawImage(plate, 150, canvas.height - 200, 200, 60)
    document.getElementById('score').innerHTML = "SCORE: " + newPlate.score;
    
}

let stackedArray = []  // new array for collided objs that need to stack

let newPlate = {
    x: 150,
    y: canvas.height-200,
    w: 200,
    h: 60,
    // SCORE COUNTER
    score: 0,
    // PANCAKE COUNTER
    pancakeCount: 0
} 

// // THE PANCAKE -- in progress!

let pancakeImage = new Image()
pancakeImage.src = './images/Pancake1.png'

let newPancake = {
    x: Math.random()*canvas.width,
    y: 55,
    w: 140,
    h: 50
}

let butterImage = new Image()
butterImage.src = './images/butter.png'

let sillySquidImage = new Image()
sillySquidImage.src = './images/sillysquid.png'

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
    this.id = id,
    this.src = 'images/Pancake1.png'
    this.sound = 'sound1'
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
    badToppingsArr.push(new badTopping(id++))
    pancakesArr.push(new Pancake(id++))
    bonusesArr.push(new Bonus(id++))
    }, 2000)

let int


// GAME ENGINE 

let stackCollision = 0

// SOUND FUNCTION
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute('preload', 'auto');
  this.sound.setAttribute('controls', 'none');
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function() {
    this.sound.pause();
  }
}

backgroundMusic = new sound("./audio/Pancaketown.mp3");
Plop = new sound("./audio/plop.flac");
Yum = new sound("./audio/Yum.mp3");
Yuck = new sound("./audio/Yuck.mp3")


function startGame() {
    int = window.requestAnimationFrame(startGame)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // SOUND TEST -- GLITCHY
    
    backgroundMusic.play();
    // draw badToppings objects
    for (let badTopping of badToppingsArr){
        ctx.drawImage(sillySquidImage, badTopping.x, badTopping.y +=(2*badTopping.speedModifier), badTopping.w, badTopping.h)
        detectBadToppingCollision(newPlate, badTopping)
        }
    // draw pancakes objects
    for (let pancake of pancakesArr){
        ctx.drawImage(pancakeImage, pancake.x, pancake.y +=(2*pancake.speedModifier), pancake.w, pancake.h)
        detectPancakeCollision(newPlate, pancake)
        }
    
    // draw bonus objects
    // ctx.fillStyle = 'pink'
    for (let bonus of bonusesArr){
        ctx.drawImage(butterImage, bonus.x, bonus.y +=(2*bonus.speedModifier), bonus.w, bonus.h)
        detectBonusCollision(newPlate, bonus)
        } 

    // plate catcher
    ctx.drawImage(plate, newPlate.x, newPlate.y, newPlate.w, newPlate.h)

    for(let i =0; i < stackedArray.length; i++){
        let pancake=stackedArray[i]
        ctx.drawImage(pancakeImage, newPlate.x, newPlate.y-10*(i+1), newPlate.w, pancake.h)
    }
}
  
// startGame()



// Collision Logics

function detectBadToppingCollision(thePlate, badTopping) {
    if (thePlate.x < badTopping.x + badTopping.w &&
        thePlate.x + thePlate.w > badTopping.x &&
        thePlate.y + stackCollision < badTopping.y + badTopping.h &&
        thePlate.h + thePlate.y + stackCollision > badTopping.y) {
            badToppingsArr = badToppingsArr.filter(badItem => badItem.id !== badTopping.id)
            Yuck.play();
            // SUBTRACT FROM SCORE
            thePlate.score -= 5
            // UPDATE SCORE DISPLAY
            document.getElementById('score').innerHTML = "SCORE: " + newPlate.score;
        }
}

function detectBonusCollision(thePlate, bonus) {
    if (thePlate.x < bonus.x + bonus.w &&
        thePlate.x + thePlate.w > bonus.x &&
        thePlate.y + stackCollision < bonus.y + bonus.h &&
        thePlate.h + thePlate.y + stackCollision > bonus.y) {
            bonusesArr = bonusesArr.filter(bonusItem => bonusItem.id !== bonus.id)
            Yum.play();
            // ADD TO SCORE
            thePlate.score += 10
            // UPDATE SCORE DISPLAY
            document.getElementById('score').innerHTML = "SCORE: " + newPlate.score;
        }
}

function detectPancakeCollision(thePlate, pancake) {
    if (thePlate.x < pancake.x + pancake.w &&
        thePlate.x + thePlate.w > pancake.x &&
        thePlate.y + stackCollision < pancake.y + pancake.h &&
        thePlate.h + thePlate.y + stackCollision > pancake.y) {
            pancakesArr = pancakesArr.filter(pancakeItem => pancakeItem.id !== pancake.id)
            stackedArray.push(pancake)
            stackCollision -= 20
            Plop.play();
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
