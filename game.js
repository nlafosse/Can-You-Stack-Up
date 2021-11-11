const canvas = document.querySelector("canvas")
canvas.width = 1000
canvas.height = 480
const ctx = canvas.getContext('2d')

// THE ZOMBIE
let zombieSheet = new Image();
zombieSheet.src = "./images/zombie.png";
zombieSheet.onload = loadImages;
let cols = 18;
let rows = 1;
//Setting the size of individual sprites
let spriteWidth = zombieSheet.width/cols;
let spriteHeight = zombieSheet.height/rows;
//Make the animation play over 8 frames
let totalFrames = 18;
let currentFrame = 0;
//Update source position
let srcX = 0;
let srcY = 0;
//Record number of times zombieAttack function is called
let framesDrawn = 0;

let numOfImages = 1;
function loadImages(){
    if(numOfImages > 0) return;
    zombieAttack();
}

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
butterImage.width =50
butterImage.height =50

let strawberryImage = new Image()
strawberryImage.src = './images/strawberry.png'

let whipCreamImage = new Image()
whipCreamImage.src = './images/whipcream.png'
whipCreamImage.width =100
whipCreamImage.height =100

//BAD TOPPINGS
let sockImage = new Image()
sockImage.src = './images/sock.png'
sockImage.width =200
sockImage.height =200

let broccoliImage = new Image()
broccoliImage.src = './images/broccoli.png'
broccoliImage.width =100
broccoliImage.height =100

let hotsauceImage = new Image()
hotsauceImage.src = './images/hotsauce.png'
hotsauceImage.width =60
hotsauceImage.height =105

//ARRAYS OF TOPPINGS TO ROTATE
let badToppingImages =[sockImage, broccoliImage, hotsauceImage]
let bonusImages =[butterImage, whipCreamImage, strawberryImage]


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
    constructor(id,image){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = image.width,
    this.h = image.height,
    this.speedModifier = Math.random()*2,
    this.id = id
    this.image = image
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
    }
}
class Bonus{
    constructor(id,image){
    this.x = Math.random()*canvas.width,
    this.y = -55,
    this.w = image.width,
    this.h = image.height,
    this.speedModifier = Math.random()*2,
    this.id = id
    this.image = image
    }
}

// arrays of falling objects &

let badToppingsArr = []
let bonusesArr = []
let pancakesArr = []

// intervals for falling objects
let id = 0

setInterval(() => {
    badToppingsArr.push(new badTopping(id++,badToppingImages[Math.floor(Math.random()*badToppingImages.length)]))
    pancakesArr.push(new Pancake(id++))
    bonusesArr.push(new Bonus(id++,bonusImages[Math.floor(Math.random()*bonusImages.length)]))
    }, 3600)


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
Rawr = new sound("./audio/ZombieCry.wav")


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
            document.getElementById('score').innerHTML = "SCORE:" +  newPlate.score;
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
            document.getElementById('score').innerHTML = "SCORE:" + newPlate.score;
        }
}

function zombieAttack(){
    let int = window.requestAnimationFrame(zombieAttack)
    Rawr.play();
 // this prompts the flipping of the sprite to the next one to reach the remaining frames  
    currentFrame = currentFrame % totalFrames; 
 // Update src position to show new sprite
    srcX = currentFrame * spriteWidth;
                       //image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight 
    ctx.save();                  
    resizeImage();        
    ctx.drawImage(zombieSheet, srcX, srcY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    ctx.restore();

    framesDrawn++;
    if(framesDrawn >= 20){
        currentFrame++;
        framesDrawn = 0;
    }
}
function resizeImage(){
    let scaleFactor = .1
    ctx.scale(scaleFactor, scaleFactor);
}

function detectPancakeCollision(thePlate, pancake) {
    if (thePlate.x < pancake.x + pancake.w &&
        thePlate.x + thePlate.w > pancake.x &&
        thePlate.y + stackCollision < pancake.y + pancake.h &&
        thePlate.h + thePlate.y + stackCollision > pancake.y) {
            pancakesArr = pancakesArr.filter(pancakeItem => pancakeItem.id !== pancake.id)
            stackedArray.push(pancake)
            stackCollision -= 8
            Plop.play();
            // for(pancake in stackedArray){
            //     thePlate.y += pancake[i+1].y
            // }
            //COUNTING PANCAKES. If 10 pancakes stacked on plate END OF GAME
           
    // ZOMBIE -- watch out once you reach (x number) of pancakes!
    if(stackedArray.length >= 1){
    zombieAttack();
            }
            if(stackedArray.length === 3) {
                alert("WHO WANTS SOME PANCAKES?");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
    }
}
