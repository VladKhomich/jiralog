const { read, todayFile, write } = require("../utils/file");
const cliSelect = require("cli-select");
const { writeDaySummary } = require("../utils/loggers");

const logFile = todayFile();

function remove() {
  let data = read(logFile);
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
