const { read, todayFile, write } = require("../utils/file");
const cliSelect = require("cli-select");

const logFile = todayFile();

function remove() {
  const data = read(logFile);
  cliSelect(
    {
      values: data.map((c) => c.activity),
    },
    (elementToRemove) => {
      write(
        logFile,
        data.filter((a) => a.activity !== elementToRemove.value)
      );
    }
  );
}

module.exports.remove = remove;
