const { exists, read, todayFile, getAllFilesForDate } = require("../utils/file");
const { writeDay } = require("../utils/loggers");

function today(options = {}) {
  if (options.tag) {
    const file = todayFile(options.tag);
    if (exists(file)) {
      const data = read(file);
      console.log(`📅 Today's log (tag: ${options.tag}):`);
      writeDay(data);
    } else {
      console.log(`no logged work today for tag: ${options.tag}`);
    }
  } else {
    const today = new Date().toISOString().slice(0, 10);
    const allFiles = getAllFilesForDate(today);

    if (allFiles.length === 0) {
      console.log("no logged work today");
      return;
    }

    allFiles.forEach(fileInfo => {
      const data = read(fileInfo.path);
      if (fileInfo.tag) {
        console.log(`📅 Today's log (tag: ${fileInfo.tag}):`);
      } else {
        console.log(`📅 Today's log:`);
      }
      writeDay(data);
      console.log('');
    });
  }
}

module.exports = today;
