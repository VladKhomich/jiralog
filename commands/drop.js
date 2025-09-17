const { askForConfirmation } = require("../utils/askFor");
const { exists, remove, todayFile } = require("../utils/file");

async function drop(options = {}) {
  const file = todayFile(options.tag);
  const tagInfo = options.tag ? ` for tag: ${options.tag}` : '';

  if (!exists(file)) {
    console.log(`No worklog found for today${tagInfo}`);
    return;
  }

  var confirmation = await askForConfirmation(
    `Do you want to remove worklog for today${tagInfo}?`
  );
  if (confirmation) {
    remove(file);
    console.log(`Removed logged work for today${tagInfo}`);
  }
}

module.exports.drop = drop;
