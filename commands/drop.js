const { askForConfirmation } = require("../utils/askFor");
const { exists, remove, todayFile } = require("../utils/file");

const file = todayFile();

async function drop() {
  var confirmation = await askForConfirmation(
    "Do you want to remove worklog for today?"
  );
  if (confirmation) {
    if (exists(file)) {
      remove(file);
      console.log("Removed logged work for today");
    }
  }
}

module.exports.drop = drop;
