const readline = require("readline");
const readlineSync = require("readline-sync");
const { Writable } = require("stream");

function askForParameter(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} : `, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function askForSecret(question) {
  return readlineSync.question(`${question} : `, {
    hideEchoBack: true,
  });
}

function askForParameterWithDefault(question, defaultAnswer) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} : `, (answer) => {
      rl.close();
      resolve(answer ? answer : defaultAnswer);
    });
    rl.write(defaultAnswer);
  });
}

function askForConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} y/n : `, (answer) => {
      rl.close();      
      answer = answer.toLowerCase();
      resolve(answer === 'yes' || answer === 'y');
    });
  });
}

module.exports.askForParameter = askForParameter;
module.exports.askForSecret = askForSecret;
module.exports.askForParameterWithDefault = askForParameterWithDefault;
module.exports.askForConfirmation = askForConfirmation;
