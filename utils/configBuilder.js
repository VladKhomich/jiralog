const CryptoJS = require("crypto-js");
const cryptoKey = `63H.kc!Dq-${ new Date().getMonth()}`;

function getKey(login, password) {
  return Buffer.from(`${login}:${password}`).toString("base64");
}

function getKeyEncrypted(login, password) {
  return CryptoJS.AES.encrypt(Buffer.from(`${login}:${password}`).toString("base64"), cryptoKey).toString();
}

function decryptKey (encrypted) {
  try{
    const bytes  = CryptoJS.AES.decrypt(encrypted, cryptoKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  catch {
    return '';
  }
}

function getConfig(baseUrl, taskId, login, password, gitUserEmail, gitReposDir) {
  return {
    baseUrl,
    taskId,
    login,
    key: password ? getKeyEncrypted(login, password) : undefined,
    gitUserEmail,
    gitReposDir,
  };
}

module.exports = {
  getConfig,
  getKey,
  decryptKey,
}
