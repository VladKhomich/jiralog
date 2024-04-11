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
  const configExists = exists(file);

  if (configExists) {
    const config = read(file);

    console.log(`base url: ${config.baseUrl}`);
    console.log(`task id: ${config.taskId}`);

    const override = await askForConfirmation(
      "do you want to override the configuration?"
    );
    if (!override) {
      return;
    }

    const baseUrl = await askForParameterWithDefault(
      "what is base jira server url?",
      config.baseUrl
    );

    const taskId = await askForParameterWithDefault(
      "what is task id?",
      config.taskId
    );

    const userName = await askForParameter("what is your username?");
    const password = askForSecret("what is your password?");

    const newConfig = getConfig(baseUrl, taskId, userName, password);

    write(file, newConfig);
  } else {
    const baseUrl = await askForParameter("what is base jira server url? (make sure to include full address e.g. https://jira.your.company.com");
    const taskId = await askForParameter("what is task id?");
    const userName = await askForParameter("what is your username?");
    const password = askForSecret("what is your password?");

    write(file, getConfig(baseUrl, taskId, userName, password));
  }
}

module.exports = config;
