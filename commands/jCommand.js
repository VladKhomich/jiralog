const {
  askForParameter,
  askForParameterWithDefault,
} = require("../utils/askFor");
const { exists, templatesFile, read } = require("../utils/file");
const log = require("./log");
const cliSelect = require("cli-select");
const { git } = require("./git");

async function jCommand(alias, overrideDuration) {
  if (!alias) {
    let templates = [];
    if (exists(templatesFile())) {
      templates = read(templatesFile());
    } else {
      console.log(
        "no templates saved. run [template] first to create a template. Or run [template -d] to create default templates."
      );
      return;
    }
    console.log("select a template to log activity");
    cliSelect(
      {
        values: ['select from git contributions', ...templates.map((c) => c.alias)],
      },
      (selectedItem) => {
        if(selectedItem.value === 'select from git contributions'){
          git();
          return;
        }
        logActivityFromTemplate(selectedItem.value, true);
      }
    );

    return;
  }

  await logActivityFromTemplate(alias, overrideDuration);
}

async function logActivityFromTemplate(alias, overrideDuration) {
  let templates = [];
  if (exists(templatesFile())) {
    templates = read(templatesFile());
  }

  const template = templates.find((t) => t.alias === alias);

  if (!template) {
    console.log(`No template was found for ${alias}`);
    return;
  }

  let activity = template.text;

  if (template.parameters) {
    template.parameters.forEach(async (parameter) => {
      const value = await askForParameter(parameter.name);
      activity = activity.replace("{!0!}", value);
    });
  }

  if (overrideDuration) {
    const duration = await askForParameterWithDefault(
      "duration?",
      template.duration
    );
    template.duration = duration;
  }

  log(template.duration, activity);
}

module.exports.jCommand = jCommand;
