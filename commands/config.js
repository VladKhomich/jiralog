const { exists, write, read, configFile } = require("../utils/file");
const {
  askForParameter,
  askForConfirmation,
  askForParameterWithDefault,
  askForSecret,
} = require("../utils/askFor");
const { getConfig } = require("../utils/configBuilder");
const { getGlobalGitUserEmail } = require("../utils/git");

const file = configFile();

async function config() {
  const configExists = exists(file);

  if (configExists) {
    const config = read(file);

    console.log(`base url: ${config.baseUrl}`);
    console.log(`task id: ${config.taskId}`);
    console.log(`jira login: ${config.login}`);
    console.log(`git user email: ${config.gitUserEmail}`);
    console.log(`repositories folder (use 'jira git --repos' to list all of repositories): ${config.gitReposDir}`);

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

    const userName = await askForParameterWithDefault("what is your JIRA username?", config.login);

    const password = await getPassword();
    
    const gitUserEmail = await askForParameterWithDefault(
        "what is your git user email?",
        config.gitUserEmail?? getGlobalGitUserEmail(),
    )

    const gitReposDir = await askForParameterWithDefault(
        "what is your git repositories directory (use 'jira git --repos' to list them)?",
        config.gitReposDir
    )

    const newConfig = getConfig(baseUrl, taskId, userName, password, gitUserEmail, gitReposDir);

    write(file, newConfig);
  } else {
    const baseUrl = await askForParameter("what is base jira server url? (make sure to include full address e.g. https://jira.your.company.com");
    const taskId = await askForParameter("what is task id?");
    const userName = await askForParameter("what is your JIRA username?");

    const password = await getPassword();

    const gitUserEmail = await askForParameterWithDefault(
        "what is your git user email?",
        getGlobalGitUserEmail(),
    );

    const gitReposDir = await askForParameter(
        "what is your git repositories directory (use 'jira git --repos' to list them)?"
    )

    write(file, getConfig(baseUrl, taskId, userName, password, gitUserEmail, gitReposDir));
  }
}

async function getPassword() {
  let password;
  const savePassword = await askForConfirmation(`WOULD YOU LIKE JIRALOG TO SAVE YOUR PASSWORD LOCALLY? In this case you will not need to enter password on every 'jira post' command. It's NOT RECOMMENDED to store password at any system.`)

  if (savePassword) {
    password = askForSecret("what is your JIRA password?");
  }

  return password;
}

module.exports = config;
