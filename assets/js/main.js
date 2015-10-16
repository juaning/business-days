var startDate = "2013-04-27";
var holidays = new Array("2013-04-28","2013-05-22","2013-06-28");

/**
 * Converts String Date to Object Date
 *
 * @param  {String} strDate format: yyyy-mm-dd
 * @return {Object} objDate
 */
function convertDateStrToDateObj(strDate) {
  return new Date(strDate.replace(/-/g, '/'));
}

/**
 * Convert holidays Array of String Dates to Object Dates
 * @param  {Array} holidays Array of String Dates
 * @return {Array}          Array of Object Dates
 */
function convertHolidaysDatesToObj(holidays) {
  return holidays.map(function(strDate) {
    return convertDateStrToDateObj(strDate);
  })
}

function calculateDate(startDate, numOfDays, holidays) {
  var endDate = '', count = 0;
  while(count < numOfDays){
      endDate = new Date(startDate.setDate(startDate.getDate() + 1));
      if(endDate.getDay() != 0 && endDate.getDay() != 6 && holidays.indexOf(endDate) !== -1){
         //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)
         count++;
      }
  }
  return endDate;
}

var objDate = convertDateStrToDateObj(startDate);
var arrObjHolidays = convertHolidaysDatesToObj(holidays);

console.log(calculateDate(objDate, 1, arrObjHolidays));
