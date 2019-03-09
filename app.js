'use strict';
var clickCounter = 0;


var numberOfRounds = 30;
var numberOfImages = 3 /** only use the number 3 for now */;
var imageVariableArray = [];
var imageCollection = document.getElementById('imagecollection');

function renderTags(){
  for(var i = 0; i < numberOfImages ; i++){
    var image = document.createElement('td');
    image.innerHTML = `<img id="prod${i}" src="" alt="" title="">`;
    imageCollection.appendChild(image);
    imageVariableArray.push(`prod${i}`);
  };
}
renderTags();

var prod0 = document.getElementById('prod0');
var prod1 = document.getElementById('prod1');
var prod2 = document.getElementById('prod2');

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
  allProdsCache.push(allProdsObjList[random]);
  allProdsObjList.splice(random, 1);
};

function nextRound() {
  showRandomProd(prod0);
  showRandomProd(prod1);
  showRandomProd(prod2);


}


function finalOutput() {
  addBackCache();
  renderResults();
  labelDataMaker();
  drawChart();
}

function clickCount() {
  if (clickCounter >= numberOfRounds) { finalOutput(); }
  else {
    var visibleCount = document.getElementById('countdown');
    var liEltotal = document.createElement('h3');
    liEltotal.id = 'deletthis';
    liEltotal.textContent = numberOfRounds - clickCounter;
    visibleCount.appendChild(liEltotal);
  }
}
function addBackCache() {
  for (var i = 0; i < numberOfImages; i++) {
    allProdsObjList.push(allProdsCache[i]);
  };
  allProdsCache.splice(0, numberOfImages);
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

imageCollection.addEventListener('click', handleClick);

nextRound();
clickCount();

var finalTable = document.getElementById('resultstable')

function renderResults() {
  var main = document.getElementById('main');
  main.parentElement.removeChild(main);
  var header = document.createElement('tr');
  header.innerHTML = '<th>Thumbnail</th><th>Name of Item</th><th>Times Displayed</th><th>Times Clicked</th><th>Percentage Clicked</th>';
  finalTable.appendChild(header);

  for (var i = 0; i < allProdsObjList.length; i++) {
    var row = document.createElement('tr');
    var name = document.createElement('td');
    var views = document.createElement('td');
    var clicks = document.createElement('td');
    var image = document.createElement('td');
    var percentageText = document.createElement('td');

    var view = allProdsObjList[i].views;
    var click = allProdsObjList[i].clicks;
    name.textContent = allProdsObjList[i].name;
    views.textContent = view;
    clicks.textContent = click;
    image.innerHTML = `<img src = "${allProdsObjList[i].filepath}"></img>`;
    var percentage = Math.floor(click / view * 100);
    percentageText.textContent = percentage + '%';

    row.appendChild(image);
    row.appendChild(name);
    row.appendChild(views);
    row.appendChild(clicks);
    if (isNaN(percentage)) { percentageText.textContent = '0%' }
    else { };
    row.appendChild(percentageText);
    finalTable.appendChild(row);
  }
}

var labelArray = [];
var clickArray = [];
var viewArray = [];
var backgroundColor = [];
var borderColor = [];
var percentageArray = [];

function labelDataMaker() {
  for (var i = 0; i < allProdsObjList.length; i++) {
    labelArray.push(allProdsObjList[i].name);
    clickArray.push(allProdsObjList[i].clicks);
    viewArray.push(allProdsObjList[i].views);
    percentageArray.push(allProdsObjList[i].clicks / allProdsObjList[i].views * 100);
    backgroundColor.push('rgba(' + (Math.floor(Math.random() * 256)) + ', ' + Math.floor((Math.random() * 256)) + ', ' + Math.floor((Math.random()) * 256) + ', 0.2)');
    borderColor.push('rgba(' + Math.floor((Math.random() * 256)) + ', ' + Math.floor((Math.random() * 256)) + ', ' + Math.floor((Math.random() * 256)) + ', 0.2)');
  };
};

function drawChart() {
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labelArray,
      datasets: [{
        label: '# of Clicks',
        data: clickArray,
        backgroundColor: backgroundColor[0],
        borderColor: borderColor,
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: viewArray,
        backgroundColor: backgroundColor[3],
        borderColor: borderColor,
        borderWidth: 1
      },
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }]
      }
    }
  });
}

