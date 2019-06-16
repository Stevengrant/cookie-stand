'use strict';

var table = document.querySelector('table');
var locationArray = [];
var newStoreElement = document.getElementById('salesForm');
newStoreElement.addEventListener('submit', (event) => {
  event.preventDefault();
  let name = (typeof event.target[1].value === 'string') ? event.target[1].value : null;
  console.log(name);
  let min = (typeof parseInt(event.target[2].value) === 'number') ? parseInt(event.target[2].value) : null;
  let max = (typeof parseInt(event.target[3].value) === 'number') ? parseInt(event.target[3].value) : null;
  let avg = (typeof parseInt(event.target[4].value) === 'number') ? parseInt(event.target[4].value) : null;
  let tempStore = new Store(name, min, max, avg);
  locationArray.push(tempStore);
  table.innerHTML = '';
  calculateDaysSales(locationArray);
  drawTableHead();
  drawTable(table, locationArray);
  drawTableFooter();
});
var getSalesNumbers = function (maxCust, minCust, avgCookieSale) {
  let total = 0;
  let temp = 0;
  let res = {
    totalSold: 0,
    hourlyBreakdown: []
  };
  for (let i = 0; i < 15; i++) {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_number_between_two_values
    //Updated w/ plus one as a result of in class discussion. Currently hitting max and min
    temp = (Math.random() * (maxCust - minCust + 1) + minCust);
    temp *= avgCookieSale;
    temp = Math.floor(temp);
    total += temp;
    res.hourlyBreakdown.push(temp);
  }

  res.totalSold = total;
  return res;
};
var calculateDaysSales = function (locationArray) {
  for (let i = 0; i < locationArray.length; i++) {
    let numberSold = getSalesNumbers(locationArray[i].maxCust, locationArray[i].minCust, locationArray[i].avgCookieSale);
    locationArray[i].cookiesSold = numberSold;

  }
};
//Store Constructor
var Store = function (locationName, minCust, maxCust, avgCookieSale, cookiesSold = {}) {
  this.locationName = locationName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookieSale = avgCookieSale;
  this.cookiesSold = cookiesSold;
};
var makeTimeString = function (hour) {
  let amPm = 'am';
  if (hour > 12) {
    hour -= 12;
    amPm = 'pm';
  }
  return `${hour}${amPm}`;
};
Store.prototype.render = function (parentElement) {
  let trEl = document.createElement('tr');
  let tdEl = document.createElement('td');
  tdEl.innerText = this.locationName;
  trEl.appendChild(tdEl);
  for (let i = 0; i < this.cookiesSold.hourlyBreakdown.length; i++) {
    tdEl = document.createElement('td');
    tdEl.innerText = this.cookiesSold.hourlyBreakdown[i];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.innerText = this.cookiesSold.totalSold;
  trEl.appendChild(tdEl);
  parentElement.appendChild(trEl);
};
locationArray.push(new Store('1st and Pike', 23, 65, 6.3));
locationArray.push(new Store('SeaTac Airport', 2, 24, 1.2));
locationArray.push(new Store('Seattle Center', 11, 38, 3.7));
locationArray.push(new Store('Capitol Hill', 20, 38, 2.3));
locationArray.push(new Store('Alki', 2, 16, 4.6));

calculateDaysSales(locationArray);

var drawTable = function (tableEl, locationArray) {
  for (let i = 0; i < locationArray.length; i++) {
    let workingRow = document.createElement('tr');
    //location name
    let locationNameEl = document.createElement('td');
    locationNameEl.innerText = locationArray[i].locationName;
    workingRow.appendChild(locationNameEl);
    //hourly sales
    locationArray[i].render(tableEl);
  }
};


var drawTableHead = function () {
  let headEl = document.createElement('thead');
  let tdEl = document.createElement('td');
  tdEl.innerText = 'Location';
  headEl.appendChild(tdEl);
  for (let i = 0; i < 15; i++) {
    tdEl = document.createElement('td');
    tdEl.innerText = makeTimeString(i + 6);
    headEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.innerText = 'Total:';
  headEl.appendChild(tdEl);
  table.appendChild(headEl);
};
var drawTableFooter = function () {
  let hourlyTotals = [];
  let tfootEl = document.createElement('tfoot');
  let tdEl = document.createElement('td');
  tdEl.innerText = 'totals:';
  tfootEl.appendChild(tdEl);
  //Over the locations
  for (let i = 0; i < locationArray.length; i++) {
    for (let j = 0; j < locationArray[i].cookiesSold.hourlyBreakdown.length; j++) {
      if (!hourlyTotals[j]) {
        hourlyTotals[j] = 0;
      }
      hourlyTotals[j] += locationArray[i].cookiesSold.hourlyBreakdown[j];
    }
  }
  hourlyTotals.forEach((el) => {
    tdEl = document.createElement('td');
    tdEl.innerText = el;
    tfootEl.appendChild(tdEl);
  });
  let totalTotals = document.createElement('td');
  totalTotals.innerText = hourlyTotals.reduce((a, c) => a + c);

  tfootEl.appendChild(totalTotals);
  table.appendChild(tfootEl);
};

drawTableHead();
drawTable(table, locationArray);
drawTableFooter();
