const { askForParameterWithDefault } = require("../utils/askFor");
const { read, todayFile, write, exists } = require("../utils/file");
const cliSelect = require("cli-select");
const { writeDaySummary } = require("../utils/loggers");

function edit(options = {}) {
  const logFile = todayFile(options.tag);

  if (!exists(logFile)) {
    const tagInfo = options.tag ? ` for tag: ${options.tag}` : '';
    console.log(`No log file found for today${tagInfo}`);
    return;
  }

  var data = read(logFile);

  if (data.length === 0) {
    console.log("No entries to edit");
    return;
  }

  cliSelect(
    {
      values: data.map((c) => `(${c.hours}h) ${c.activity}`),
    },
    async (selectedElement) => {
      const elementToEdit = data[selectedElement.id];
      elementToEdit.hours = await askForParameterWithDefault(
        "What is a duration?",
        elementToEdit.hours
      );
      elementToEdit.activity = await askForParameterWithDefault(
        "What is a new description?",
        elementToEdit.activity
      );
      write(logFile, data);
      writeDaySummary(data);
    }
  );
}

module.exports.edit = edit;
