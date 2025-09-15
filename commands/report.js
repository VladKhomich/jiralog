const { dateDaysAgo } = require("../utils/date");
const { exists, read, fileDaysAgo } = require("../utils/file");
const { writeDay } = require("../utils/loggers");

function report(options) {
  if (!options.days) {
    return;
  }

  const days = +options.days;

  for (let i = days - 1; i >= 0; i--) {

    const file = fileDaysAgo(i);
    if (!exists(file)) {
      console.log(`📅 Log for: ${dateDaysAgo(i)}`);
      console.log(`No work log found for ${i} days ago`);
      console.log('');
      continue;
    }
    const data = read(file);
    console.log(`📅 Log for: ${dateDaysAgo(i)}`)
    writeDay(data);

  }
}

module.exports.report = report;
