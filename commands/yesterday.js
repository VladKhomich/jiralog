const { yesterdayFile, exists, read, getAllFilesForDate } = require("../utils/file");
const { writeDay } = require("../utils/loggers");
const { dateDaysAgo } = require("../utils/date");

function yesterday(options = {}) {
  if (options.tag) {
    // Show specific tag
    const file = yesterdayFile(options.tag);
    if (exists(file)) {
      const data = read(file);
      console.log(`📅 Yesterday's log (tag: ${options.tag}):`);
      writeDay(data);
    } else {
      console.log(`no logged work yesterday for tag: ${options.tag}`);
    }
  } else {
    const yesterday = dateDaysAgo(1);
    const allFiles = getAllFilesForDate(yesterday);

    if (allFiles.length === 0) {
      console.log("no work log for yesterday");
      return;
    }

    allFiles.forEach(fileInfo => {
      const data = read(fileInfo.path);
      if (fileInfo.tag) {
        console.log(`📅 Yesterday's log (tag: ${fileInfo.tag}):`);
      } else {
        console.log(`📅 Yesterday's log:`);
      }
      writeDay(data);
      console.log('');
    });
  }
}

module.exports.yesterday = yesterday;
