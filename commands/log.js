const { exists, read, write, todayFile } = require("../utils/file");

const file = todayFile();

function log(hours, activity) {
  if (exists(file)) {
    const data = read(file);

    data.push({ hours, activity });

    write(file, data);
  } else {
    write(file, [{ hours, activity }]);
  }
  console.log(`added [${activity}] with [${hours}] to today's log`);
}

module.exports = log;
