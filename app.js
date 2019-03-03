'use strict';
var clickCounter = 0;
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
var allProdsCache = [];

function ProdPic(filename) {

  var fileArray = filename.split('.');
  this.filepath = `images/${fileArray[0]}.${fileArray[1]}`;
  this.name = fileArray[0];
  this.views = 0;
  this.clicks = 0;
  allProdsObjList.push(this);
};

function prodObjListMaker() {
  for (var i = 0; i < allProds.length; i++) {
    new ProdPic(allProds[i]);
  }
};
prodObjListMaker();


function showRandomProd(prodNumber) {
  var random = Math.floor(Math.random() * allProdsObjList.length);
  prodNumber.src = allProdsObjList[random].filepath;
  prodNumber.alt = allProdsObjList[random].name;
  prodNumber.title = allProdsObjList[random].name;
  prodNumber.clicks = allProdsObjList[random].clicks;
  allProdsObjList[random].views++;
  console.log(allProdsObjList);
  console.log(allProdsObjList[random]);
  allProdsCache.push(allProdsObjList[random]);
  allProdsObjList.splice(random, 1);
  console.log(allProdsCache);
};

function nextRound() {
  showRandomProd(prod1);
  showRandomProd(prod2);
  showRandomProd(prod3);
}
function renderTable() {
  var main = document.getElementById('main');
  main.parentElement.removeChild(main);
}

function finalOutput(){
  addBackCache();
  allProdsObjList.push(allProdsCache[0])
  renderTable();
}

function clickCount() {
  if (clickCounter >= 25) { finalOutput(); }
  else {
    var visibleCount = document.getElementById('countdown');
    var liEltotal = document.createElement('td');
    liEltotal.id = 'deletthis';
    liEltotal.textContent = 25 - clickCounter;
    visibleCount.appendChild(liEltotal);
  }
}
function addBackCache(){
  for (var i = 0; i < allProdsCache.length / 2; i++) {
    allProdsObjList.push(allProdsCache[i]);
  };
  allProdsCache.splice(0, allProdsCache.length / 2);
}
function handleClick(event) {
  for (var i = 0; i < allProdsCache.length; i++) {
    if (allProdsCache[i].name === event.target.title) {
      allProdsCache[i].clicks++;
    }
  }
  nextRound();
  addBackCache();
  clickCounter++;
  var delet = document.getElementById('deletthis');
  delet.parentNode.removeChild(delet);
  clickCount();
};

prod1.addEventListener('click', handleClick);
prod2.addEventListener('click', handleClick);
prod3.addEventListener('click', handleClick);

nextRound();
clickCount();

