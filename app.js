'use strict';

var prod1 = document.getElementById('prod1');
var prod2 = document.getElementById('prod2');
var prod3 = document.getElementById('prod3');
var allProds = ['bag.jpg',
  'breakfast.jpg',
  'dog-duck.jpg',
  'scissors.jpg',
  'unicorn.jpg',
  'banana.jpg',
  'bubblegum.jpg',
  'dragon.jpg',
  'shark.jpg',
  'usb.gif',
  'bathroom.jpg',
  'chair.jpg',
  'pen.jpg',
  'sweep.png',
  'water-can.jpg',
  'boots.jpg',
  'cthulhu.jpg',
  'pet-sweep.jpg',
  'tauntaun.jpg',
  'wine-glass.jpg',
];
var allProdsObjList = [];

function ProdPic(filename) {
  // debugger;
  var fileArray = filename.split('.');
  this.filepath = `images/${fileArray[0]}.${fileArray[1]}`;
  this.name = fileArray[0];
  this.views = 0;
  this.clicks = 0;
  allProdsObjList.push(this);
};

function prodObjListMaker(){
  // debugger;
  for (var i = 0; i < allProds.length; i++){
    new ProdPic(allProds[i]);
  }
};
prodObjListMaker();


function showRandomProd(prodNumber) {
  var random = Math.floor(Math.random() * allProds.length);
  prodNumber.src = allProdsObjList[random].filepath;
  prodNumber.alt = allProdsObjList[random].name;
  prodNumber.title = allProdsObjList[random].name;
  prodNumber.clicks = allProdsObjList[random].clicks;
  allProdsObjList[random].views++;
  // console.log('current Product, ', allProdsObjList[random]);
};

function nextRound(){
showRandomProd(prod1);
showRandomProd(prod2);
showRandomProd(prod3);
}


function handleClick(event) {
  for(var i = 0; i < allProdsObjList.length; i++){
    if (allProdsObjList[i].name === event.target.title){
      allProdsObjList[i].clicks++;
    }
  }
  console.log(event.target.title);
  console.log(event.target);
  console.log('target, ', event.target);
  nextRound();
};

prod1.addEventListener('click', handleClick);
prod2.addEventListener('click', handleClick);
prod3.addEventListener('click', handleClick);

nextRound();