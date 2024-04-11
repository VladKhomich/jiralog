const {countTotalHours} = require("./workLog");

function writeDay(data) {
  let total = 0;
  data.forEach((element) => {
    console.log(`(${element.hours}h) ${element.activity}`);
    total += +element.hours;
  });
  console.log(`${total}h TOTAL`);
}

function writeDaySummary(workLog){
  console.log(`${countTotalHours(workLog)}h total today`)
  
}

module.exports.writeDay = writeDay;
module.exports.writeDaySummary = writeDaySummary;
