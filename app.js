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
  allProdsCache.push(allProdsObjList[random]);
  allProdsObjList.splice(random, 1);
};

function nextRound() {
  showRandomProd(prod1);
  showRandomProd(prod2);
  showRandomProd(prod3);
}


function finalOutput() {
  addBackCache();
  allProdsObjList.push(allProdsCache[1]);
  renderResults();
  labelDataMaker();
  drawChart();
}

function clickCount() {
  if (clickCounter >= 25) { finalOutput(); }
  else {
    var visibleCount = document.getElementById('countdown');
    var liEltotal = document.createElement('h3');
    liEltotal.id = 'deletthis';
    liEltotal.textContent = 25 - clickCounter;
    visibleCount.appendChild(liEltotal);
  }
}
function addBackCache() {

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

