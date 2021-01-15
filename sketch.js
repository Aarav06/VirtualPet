var  dogNormal, happyDog, database, foodS, foodStock;
var database;
var dog;
function preload()
{
	happyDog = loadImage("dogImg1.png");
  dogNormal = loadImage("dogImg.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
   dog = createSprite(2000, 500, 20, 20);
  dog.addImage(dogNormal);

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);
  scale(0.2);
  if(keyWentDown(UP_ARROW)) {
    foodS--;
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  fill("white");
  textSize(60);
  text("FOOD: "+ foodS, 200, 200);
  text("PRESS UP ARROW TO FEED!", 200, 400);
  if(foodS <=0) {
    text("YOU HAVE RUN OUT OF FOOD :(", 200, 600)
    dog.addImage(dogNormal);
  }
}

function readStock(data) {
  foodS = data.val();
}
function writeStock(x) {

  database.ref("/").update({
    Food:x
  });

}





