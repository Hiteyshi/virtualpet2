var dog,sadDog,database,happyDog;
var foodS,foodStock; 
var fedTime,lastFed; 
var feed,addFood; 
var foodObj;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database()
  foodObj=new Food();
  database.ref('food').on("value",function(data){
    foodS=data.val();
  })
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addfoods);
  

}

function draw() {
  background(46,139,87);
  foodObj.display();
  database.ref('feedTime').on("value",function(data){
    lastFed=data.val();
  })
  drawSprites();
}

//function to read food Stock
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updatefoodStock(foodObj.getFoodStock()*0);
   }else{
     food.Obj.updateFoodStock(foodObj.getFoodStock()-1);
     }
database.ref('/').update({
  food:foodObj.getfoodStock,
  feedTime:hour()
})
//function to update food stock and last fed time
}


//function to add food in stock
function addfoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
