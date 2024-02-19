const { askForParameterWithDefault } = require("../utils/askFor");
const { read, todayFile, write } = require("../utils/file");
const cliSelect = require("cli-select");

const logFile = todayFile();

function edit() {
  var data = read(logFile);
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
    }
  );
}

module.exports.edit = edit;
