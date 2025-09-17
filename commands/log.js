const { exists, read, write, todayFile } = require("../utils/file");
const { writeDaySummary } = require("../utils/loggers");

function log(hours, activity, options = {}) {
  const file = todayFile(options.tag);
  let data;
  if (exists(file)) {
    data = read(file);

    data.push({ hours, activity });
  } else {
    data = [{ hours, activity }];
  }
    write(file, data);
  const tagInfo = options.tag ? ` (tag: ${options.tag})` : '';
  console.log(`added [${activity}] with [${hours}] to today's log${tagInfo}`);
  writeDaySummary(data);
}

module.exports = log;
