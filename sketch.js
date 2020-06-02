let started = false;

let keyWorker;
let virus = [];

let score = 0;
let level = 1;

let timer = 300;
let timeWas = 0;

function preload(){
  virusGreenImg = loadImage('./images/virus-green.png');
  virusRedImg = loadImage('./images/virus-red.png');
  virusBlueImg = loadImage('./images/virus-blue.png');

  maleDoctor1 = loadImage('./images/doctor-male-1.png');
  maleDoctor2 = loadImage('./images/doctor-male-2.png');
  maleDoctor3 = loadImage('./images/doctor-male-3.png');

  femaleDoctor1 = loadImage('./images/doctor-female-1.png');
  femaleDoctor2 = loadImage('./images/doctor-female-2.png');
  femaleDoctor3 = loadImage('./images/doctor-female-3.png');
   
  europeImg = loadImage('./images/europe.png');
  asiaImg = loadImage('./images/asia.png');
  africaImg = loadImage('./images/africa.png');
  americaImg = loadImage('./images/america.png');
}

function setup() {
  createCanvas(1000, 500).center();
  textSize(30);
  textFont("Courier New");
  textStyle(BOLD);
  keyWorker = new KeyWorker();
}

function createDropdown() {
  // Gender Dropdown
  dropdown1 = createSelect(); 
  dropdown1.position(300, 90); 
  dropdown1.option("Male"); 
  dropdown1.option("Female");
  
  // Skin colour Dropdown
  dropdown2 = createSelect(); 
  dropdown2.position(400, 90); 
  dropdown2.option("Fair Skin"); 
  dropdown2.option("Medium Skin");
  dropdown2.option("Dark Skin"); 
  
  // Button
  button = createButton('Start Playing');
  button.position(380,120); 
  button.mousePressed(()=> {
    keyWorker.changeCharacter();
    start();
  })
}

function start(){
  started = true;
  loop();
}

function keyPressed() {
  if (keyIsDown(32) || keyIsDown(38)) {
    keyWorker.jump();
  }
}

function loadBackground() {
  if ((level == 1) || (level == 5)) {
    return asiaImg;
  }
  if ((level == 2) || (level == 6)) {
    return europeImg;
  }
  if ((level == 3) || (level == 7)) {
    return africaImg;
  }
  if ((level == 4) || (level == 8)) {
    return americaImg;
  }
}

function draw() {
  if (started === false) {
    createDropdown();
  }
  if (started === true) {
    // Display Background features
    background(166);
    background(loadBackground());
    
    text(`Score: ${score}`, 10, 10, 200, 100);
    text(`Level: ${level}`, 830, 10, 200, 100);

    // Display Virus
    if (frameCount > timeWas + timer && timer != 0) {
      timeWas = frameCount;
      timer = random(100, timer);
      virus.push(new Virus());
    }

    for(let v of virus) {
      v.move();
      v.draw();

      // Game Over if Collision
      if(keyWorker.hits(v)){
        console.log("Game Over");
        text("Game Over", 420, 200, 200, 80);
        noLoop(); 
      }

      // Update Score and Level
      if (v.x == 0) {
        score += 1;
        if (score % 5 == 0) {
          level += 1;
          timer -= 50;
        }
      }
    }

    // Display KeyWorker
    keyWorker.draw();
    keyWorker.move();
  }
}
