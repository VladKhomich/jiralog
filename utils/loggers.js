const {countTotalHours} = require("./workLog");
const {formatWorkLogRecord} = require("./format");

function writeDay(data) {
  let total = 0;
  data.forEach((element) => {
    console.log(`${formatWorkLogRecord(element)}`);
    total += +element.hours;
  });
  console.log(`${total}h TOTAL`);
}

function writeDaySummary(workLog){
  console.log(`${countTotalHours(workLog)}h total today`)
  
}

function writeConfigIsMissing(){
  console.log('configuration is missing. Use `jira config` first.')
}

module.exports ={
  writeDay,
  writeDaySummary,
  writeConfigIsMissing,
} 
