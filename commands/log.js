const { exists, read, write, todayFile } = require("../utils/file");
const { writeDaySummary } = require("../utils/loggers");

const file = todayFile();

function log(hours, activity) {
  let data;
  if (exists(file)) {
    data = read(file);

    data.push({ hours, activity });
  } else {
    data = [{ hours, activity }];
  }
    write(file, data);
  console.log(`added [${activity}] with [${hours}] to today's log`);
  writeDaySummary(data);
}

module.exports = log;
