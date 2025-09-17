const { read, todayFile, write, exists } = require("../utils/file");
const cliSelect = require("cli-select");
const { writeDaySummary } = require("../utils/loggers");

function remove(options = {}) {
  const logFile = todayFile(options.tag);

  if (!exists(logFile)) {
    const tagInfo = options.tag ? ` for tag: ${options.tag}` : '';
    console.log(`No log file found for today${tagInfo}`);
    return;
  }

  let data = read(logFile);

  if (data.length === 0) {
    console.log("No entries to remove");
    return;
  }

  cliSelect(
    {
      values: data.map((c) => c.activity),
    },
    (elementToRemove) => {
      data = data.filter((a) => a.activity !== elementToRemove.value);
      write(
        logFile,
        data
      );
      writeDaySummary(data);
    }
  );
}

module.exports.remove = remove;
