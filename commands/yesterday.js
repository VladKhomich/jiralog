const { yesterdayFile, exists } = require("../utils/file");

function yesterday() {
  const file = yesterdayFile();
  if (!exists(yesterdayFile(file))) {
    console.log("no work log for yesterday");
    return;
  }
}

module.exports.yesterday = yesterday;
