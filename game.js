const canvas = document.querySelector("canvas")
canvas.width = 990
canvas.height = 480
const ctx = canvas.getContext('2d')

// THE PLATE 
let plate = new Image()
plate.src = './images/plate.png'
plate.onload = () => {
    ctx.drawImage(plate, 150, canvas.height - 100, 200, 60)
    document.getElementById('score').innerHTML = "SCORE: " + newPlate.score;
    
}

let stackedArray = []  // new array for collided objs that need to stack

let newPlate = {
    x: 150,
    y: canvas.height-100,
    w: 200,
    h: 60,
    // SCORE COUNTER
    score: 0,
    // PANCAKE COUNTER
    pancakeCount: 0
} 

// // THE PANCAKE

let pancakeImage = new Image()
pancakeImage.src = './images/Pancake1.png'

//GOOD TOPPINGS
let butterImage = new Image()
butterImage.src = './images/butter.png'

// let strawberryImage = new Image()
// strawberryImage = './images/strawberry.png'

let whipCreamImage = new Image()
whipCreamImage.src = './images/whipcream.png'

//BAD TOPPINGS
let sillySquidImage = new Image()
sillySquidImage.src = './images/sillysquid.png'

let broccoliImage = new Image()
broccoliImage.src = './images/broccoli.png'

let hotsauceImage = new Image()
hotsauceImage.src = './images/hotsauce.png'

//ARRAYS OF TOPPINGS TO ROTATE
let badToppingImages =[sillySquidImage, broccoliImage, hotsauceImage]
let bonusImages =[butterImage, whipCreamImage]


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
    this.image = badToppingImages[Math.floor(Math.random()*badToppingImages.length)]
    }
}
class Pancake{
    constructor(id){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = 200,
    this.h = 60,
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
    this.image = bonusImages[Math.floor(Math.random()*bonusImages.length)]
    }
}

// arrays of falling objects &

let badToppingsArr = []
let bonusesArr = []
let pancakesArr = []

// intervals for falling objects
let id = 0

setInterval(() => {
    badToppingsArr.push(new badTopping(id++))
    pancakesArr.push(new Pancake(id++))
    bonusesArr.push(new Bonus(id++))
    }, 2000)


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
    let int = window.requestAnimationFrame(startGame)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // SOUND TEST -- GLITCHY
    
    backgroundMusic.play();
    // draw badToppings objects
    for (let badTopping of badToppingsArr){
        ctx.drawImage(badTopping.image, badTopping.x, badTopping.y +=(2*badTopping.speedModifier), badTopping.w, badTopping.h)
        detectBadToppingCollision(newPlate, badTopping)
        }
   
    // draw pancakes objects
    for (let pancake of pancakesArr){
        ctx.drawImage(pancakeImage, pancake.x, pancake.y +=(2*pancake.speedModifier), pancake.w, pancake.h)
        detectPancakeCollision(newPlate, pancake)
        }
    
    // draw bonus objects
    for (let bonus of bonusesArr){
        ctx.drawImage(bonus.image, bonus.x, bonus.y +=(2*bonus.speedModifier), bonus.w, bonus.h)
        detectBonusCollision(newPlate, bonus)
        } 

    // plate catcher
    ctx.drawImage(plate, newPlate.x, newPlate.y, newPlate.w, newPlate.h)
    for(let i =0; i < stackedArray.length; i++){
        let pancake=stackedArray[i]
        ctx.drawImage(pancakeImage, newPlate.x, newPlate.y-10*(i+1), newPlate.w, pancake.h)
    }
}


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
            if(stackedArray.length === 30) {
                alert("WHO WANTS SOME PANCAKES?");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
    }
}
