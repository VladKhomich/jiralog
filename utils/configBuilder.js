function getKey(login, password) {
  return Buffer.from(`${login}:${password}`).toString("base64");
}

function getConfig(baseUrl, taskId, login, password, gitUserEmail, gitReposDir) {
  return {
    baseUrl,
    taskId,
    key: getKey(login, password),
    gitUserEmail,
    gitReposDir,
  };
}

module.exports.getConfig = getConfig;
