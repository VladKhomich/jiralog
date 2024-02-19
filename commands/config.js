const { exists, write, read, configFile } = require("../utils/file");
const {
  askForParameter,
  askForConfirmation,
  askForParameterWithDefault,
  askForSecret,
} = require("../utils/askFor");
const { getConfig } = require("../utils/configBuilder");

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

    const baseUrl = await askForParameterWithDefault(
      "What is base jira server url?",
      config.baseUrl
    );

    const taskId = await askForParameterWithDefault(
      "What is task id?",
      config.taskId
    );

    const userName = await askForParameter("What is your username?");
    const password = askForSecret("What is your password?");

    const newConfig = getConfig(baseUrl, taskId, userName, password);

    write(file, newConfig);
  } else {
    var baseUrl = await askForParameter("What is base jira server url?");
    var taskId = await askForParameter("What is task id?");
    const userName = await askForParameter("What is your username?");
    var password = askForSecret("What is your password?");

    write(file, getConfig(baseUrl, taskId, userName, password));
  }
}

module.exports = config;
