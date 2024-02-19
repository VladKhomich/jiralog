const { exists, write, read, configFile } = require("../utils/file");
const {
  askForParameter,
  askForConfirmation,
  askForParameterWithDefault,
} = require("../utils/askFor");

const file = configFile();

async function config() {
  var configExists = exists(file);

  if (configExists) {
    var config = read(file);

    console.log(`base url: ${config.baseUrl}`);
    console.log(`key: ${config.key}`);
    console.log(`task id: ${config.taskId}`);

    var override = await askForConfirmation(
      "Do you want to override the configuration?"
    );
    if (!override) {
      return;
    }

    config.baseUrl = await askForParameterWithDefault(
      "What is base jira server url?",
      config.baseUrl
    );
    config.key = await askForParameterWithDefault(
      "What is your key?",
      config.key
    );
    config.taskId = await askForParameterWithDefault(
      "What is task id?",
      config.taskId
    );
    write(file, config);
  } else {
    var baseUrl = await askForParameter("What is base jira server url?");
    var key = await askForParameter("What is your key?");
    var taskId = await askForParameter("What is task id?");

    write(file, { baseUrl, key, taskId });
  }
}

module.exports = config;
