const { exists, read, todayFile } = require("../utils/file");
const { writeDay } = require("../utils/loggers");

const file = todayFile();

function today() {
  if (exists(file)) {
    const data = read(file);
    writeDay(data);
  } else {
    console.log("No logged work today");
  }
}

module.exports = today;
