const readline = require("readline");

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

function askForParameterWithDefault(question, defaultAnswer) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} : (${defaultAnswer}) `, (answer) => {
      rl.close();
      resolve(answer ? answer : defaultAnswer);
    });
  });
}

function askForConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} yes/no : `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "yes");
    });
  });
}

module.exports.askForParameter = askForParameter;
module.exports.askForParameterWithDefault = askForParameterWithDefault;
module.exports.askForConfirmation = askForConfirmation;
