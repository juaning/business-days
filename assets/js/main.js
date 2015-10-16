var startDate = "2013-05-21";
var holidays = new Array("2015-10-19","2015-10-22","2015-10-28");
var DATEFORMAT = 'dd/mm/yy';

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

/**
 * Calculate Date from Starting Date & Number of Days
 * @param  {[type]} startDate [description]
 * @param  {[type]} numOfDays [description]
 * @param  {[type]} holidays  [description]
 * @return {[type]}           [description]
 */
function calculateDate(startDate, numOfDays, holidays) {
  var endDate = '', count = 0;
  while(count < numOfDays){
      endDate = new Date(startDate.setDate(startDate.getDate() + 1));
      if(endDate.getDay() != 0 && endDate.getDay() != 6
        && holidays.map(Number).indexOf(+endDate) < 0){
         count++;
      }
  }
  return endDate;
}

// var objDate = convertDateStrToDateObj(startDate);
var arrObjHolidays = convertHolidaysDatesToObj(holidays);
//
// console.log(calculateDate(objDate, 1, arrObjHolidays));

$.datepicker.setDefaults({
  dateFormat: DATEFORMAT
});

$(function(){
  $('#date').datepicker();

  $(document).on('submit', '#calculate-form', function(e){
    e.preventDefault();
  });

  $(document).on('click', '.btn-default', function(e) {
    e.preventDefault();
    console.log('Clicked', $('#date').val(), $('#days').val(), DATEFORMAT);
    var arrDate = $('#date').val().split('/');
    var startDate = convertDateStrToDateObj(arrDate[2] + '-' + arrDate[1] + '-' + arrDate[0]);
    console.log('startDate', startDate);
    var result = 'Business day is: ' + calculateDate(startDate, $('#days').val(), arrObjHolidays)
    $('#date-result').html(result);
  })
})
