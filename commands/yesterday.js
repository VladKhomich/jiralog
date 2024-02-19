const { yesterdayFile, exists, read } = require("../utils/file");
const { writeDay } = require("../utils/loggers");

function yesterday() {
  const file = yesterdayFile();
  if (!exists(yesterdayFile(file))) {
    console.log("no work log for yesterday");
    return;
  }
  if (exists(file)) {
    const data = read(file);
    writeDay(data);
  } else {
    console.log("No logged work yesterday");
  }
}

module.exports.yesterday = yesterday;
