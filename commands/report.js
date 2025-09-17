const { dateDaysAgo } = require("../utils/date");
const { exists, read, fileDaysAgo, getAllFilesForDate } = require("../utils/file");
const { writeDay } = require("../utils/loggers");

function report(options) {
  if (!options.days) {
    return;
  }

  const days = +options.days;

  for (let i = days - 1; i >= 0; i--) {
    const dateStr = dateDaysAgo(i);

    if (options.tag) {
      const file = fileDaysAgo(i, options.tag);
      if (!exists(file)) {
        console.log(`📅 Log for: ${dateStr} (tag: ${options.tag})`);
        console.log(`No work log found for ${i} days ago with tag: ${options.tag}`);
        console.log('');
        continue;
      }
      const data = read(file);
      console.log(`📅 Log for: ${dateStr} (tag: ${options.tag})`);
      writeDay(data);
    } else {
      const allFiles = getAllFilesForDate(dateStr);

      if (allFiles.length === 0) {
        console.log(`📅 Log for: ${dateStr}`);
        console.log(`No work log found for ${i} days ago`);
        console.log('');
        continue;
      }

      allFiles.forEach((fileInfo, index) => {
        const data = read(fileInfo.path);
        if (fileInfo.tag) {
          console.log(`📅 Log for: ${dateStr} (tag: ${fileInfo.tag})`);
        } else {
          console.log(`📅 Log for: ${dateStr}`);
        }
        writeDay(data);

        if (index < allFiles.length - 1) {
          console.log('');
        }
      });
    }

    console.log('');
  }
}

module.exports.report = report;
