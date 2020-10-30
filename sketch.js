var dog, happyDog, database, foodS, foodStock
var feed, addFood
var fedTime, lastFed
var foodObj
function preload()
{
dogImage = loadImage("images/dogImg.png")
happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database()

  
  //Create the Bodies Here.   
 dog = createSprite(240,350)
  dog.addImage(dogImage)
dog.scale = (0.2)


 Foodstock=database.ref('Food');
 Foodstock.on("value", readStock);
  
  foodObj = new Food()

feed = createButton("Feed dog");
feed.position(685,110)
feed.mousePressed(feedDog)

addFood = createButton("Add food")
addFood.position(785,110)
addFood.mousePressed(addFoods)
}


function draw() {
  
  background(46, 139, 87);

// if(keyWentDown(UP_ARROW)){
//   writeStock(foodS);
//   dog.addImage(happyDog);
// }
foodObj.display()
fedTime = database.ref("FeedTime")
fedTime.on("value", function(data){
  lastFed = data.val()
})

fill("white")

text("Food Remaining: "+foodS, 200,100)
 

fill(255,255,254);
textSize(15);

if(lastFed>=12){
text("Last Feed: " + lastFed%12+"PM", 250,30)
}
else if(lastFed==0){
text("Last Feed: 12 AM", 250, 30)
}
else{
  text("Last feed: "+ lastFed+"AM", 250, 30)
}
//display();

drawSprites();

}

function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS)
}

function feedDog(){
       dog.addImage(happyDog);

       foodObj.updateFoodStock(foodObj.getFoodStock()-1);
       database.ref('/').update({
         Food:foodObj.getFoodStock(),
         FeedTime: hour()
       })
     }

     function addFoods(){
foodS++;
      database.ref('/').update({
        Food:foodS
      })
    }