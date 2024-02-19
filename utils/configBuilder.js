function getKey(login, password) {
  return Buffer.from(`${login}:${password}`).toString("base64");
}

function getConfig(baseUrl, taskId, login, password) {
  return {
    baseUrl,
    taskId,
    key: getKey(login, password),
  };
}

module.exports.getConfig = getConfig;
