'use strict';

var storeResultsEl = document.getElementById('storeResults');

var resolvedTime = function (hour) {
  let amPm = 'am';
  //in case of pm
  if (hour > 12) {
    hour = hour - 12;
    amPm = 'pm';
  }
  return `${hour}${amPm}`;
};
var writeStoreData = function (parentElement, locations) {
  //for each location
  for (let i = 0; i < locations.length; i++){
    let storeHeadder = document.createElement('h3');
    let wrappingUlEl = document.createElement('ul');
    storeHeadder.innerText = locations[i].locationName;
    wrappingUlEl.appendChild(storeHeadder);

    for (let j = 0; j < locations[i].cookiesSold.hourlyBreakdown.length; j++){
      let newLi = document.createElement('li');
      newLi.innerText = `${resolvedTime(j+6)}: ${locations[i].cookiesSold.hourlyBreakdown[j]} cookies` ;
      wrappingUlEl.appendChild(newLi);
    }
    parentElement.appendChild(wrappingUlEl);
    let total = document.createElement('li');
    total.classList.add('bold');
    let totalText =`Total: ${locations[i].cookiesSold.totalSold} cookies`;
    total.innerText = totalText;
    wrappingUlEl.appendChild(total);
  }
};
var getSalesNumbers = function (maxCust, minCust, avgCookieSale) {
  let total = 0;
  let temp = 0;
  let res = {
    totalSold: 0,
    hourlyBreakdown: []
  };
  for (let i = 0; i < 15; i++) {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_number_between_two_values

    //Updated w/ plus one as a result of in class discussion.
    temp = Math.floor((Math.random() * (maxCust - minCust + 1) + minCust) * avgCookieSale);
    total += temp;
    res.hourlyBreakdown.push(
      temp
    );
  }
  res.totalSold = total;

  return res;
};
var calculateDaysSales = function (locationArray) {
  for (let i = 0; i < locationArray.length; i++) {
    locationArray[i].cookiesSold = getSalesNumbers(locationArray[i].maxCust, locationArray[i].minCust, locationArray[i].avgCookieSale);
  }
};

var firstAndPike = {
  locationName: '1st and Pike',
  minCust: 23,
  maxCust: 65,
  avgCookieSale: 6.3,
  cookiesSold: {}
};
var seaTacAirport = {
  locationName: 'SeaTac Airport',
  minCust: 2,
  maxCust: 24,
  avgCookieSale: 1.2,
  cookiesSold: {}
};
var seattleCenter = {
  locationName: 'Seattle Center',
  minCust: 11,
  maxCust: 38,
  avgCookieSale: 3.7,
  cookiesSold: {}
};
var capitolHill = {
  locationName: 'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  avgCookieSale: 2.3,
  cookiesSold: {}
};
var alki = {
  locationName: 'Alki',
  minCust: 2,
  maxCust: 16,
  avgCookieSale: 4.6,
  cookiesSold: {}
};
var locationArray = [firstAndPike, seaTacAirport, seattleCenter, capitolHill, alki];
calculateDaysSales(locationArray);
writeStoreData(storeResultsEl,locationArray);
