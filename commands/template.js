const { askForConfirmation, askForParameter } = require("../utils/askFor");
const { templatesFile, exists, read, write } = require("../utils/file");

async function template() {
  const file = templatesFile();

  let templates = [];
  if (exists(file)) {
    templates = read(file);
  }

  const alias = await askForParameter("alias for command:");

  if (templates.find((t) => t.alias === alias)) {
    const override = await askForConfirmation(
      `Are you sure you want to override ${alias}?`
    );
    if (!override) {
      return;
    }
    templates = templates.filter((t) => t.alias !== alias);
  }

  const text = await askForParameter("default description of activity:");
  const duration = await askForParameter("default duration:");

  const template = { duration, text, alias };
  console.log(`added template [${template.alias}]`);
  templates.push(template);

  write(file, templates);
}

module.exports.template = template;
