const { askForConfirmation, askForParameter, askForParameterWithDefault} = require("../utils/askFor");
const { templatesFile, exists, read, write } = require("../utils/file");
const cliSelect = require("cli-select");

async function template(remove) {
  const file = templatesFile();

  let templates = [];
  if (exists(file)) {
    templates = read(file);
  }

  if(remove.r){
    removeTemplate(templates, file);    
    return;
  }

  if(remove.d){
    await resetTemplates(templates, file);
    return;
  }

  if(remove.e){
    await editTemplate(templates, file);
    return;
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

const removeTemplate = (templates, file) =>{
  console.log('select template to remove:');
  
  cliSelect(
      {
        values: templates.map((c) => c.alias),
      },
      async (elementToRemove) => {
        const confirmation = await askForConfirmation(
            `are you sure you want to remove template ${elementToRemove.value}?`
        );
        if (!confirmation) {
          return;
        }

        write(
            file,
            templates.filter((a) => a.alias !== elementToRemove.value)
        );
      }
  );
}

const editTemplate = (templates, file) =>{
  console.log('select template to edit:');

  cliSelect(
      {
        values: templates.map((c) => c.alias),
      },
      async (itemToEdit) => {
        const confirmation = await askForConfirmation(
            `are you sure you want to edit template ${itemToEdit.value}?`
        );
        if (!confirmation) {
          return;
        }
        
        const templateToUpdate = templates.find((a) => a.alias === itemToEdit.value); 

        templates.filter((a) => a.alias !== itemToEdit.value)

        const newAlias = await askForParameterWithDefault(
            "new alias?",
            templateToUpdate.alias
        );

        const newDescription = await askForParameterWithDefault(
            "new description?",
            templateToUpdate.text
        );

        const newDuration = await askForParameterWithDefault(
            "new duration?",
            templateToUpdate.duration
        );
        
        templates = [...templates, {
          alias: newAlias,
          duration: newDuration,
          text: newDescription,
        }]
        
        write(
            file,
            templates
        );
      }
  );
}

const resetTemplates =async (templates, file) => {
  const confirmation = await askForConfirmation(
      `are you sure you want to reset template to default ones? All custom created templates will be removed`
  );
  if (!confirmation) {
    return;
  }

  const defaultTemplates = [
    {
      "duration": "0.5",
      "text": "Participated in daily stand-up call. Provided updates on assigned tasks, discussed risks, and mentioned any blockers. Outlined plans for the day.",
      "alias": "daily"
    },
    {
      "duration": "1",
      "text": "Attended sprint planning meeting. Contributed to task estimation and assignment.",
      "alias": "planning"
    },
    {
      "duration": "1",
      "text": "Joined product backlog refinement session. Engaged in discussions on upcoming topics and brainstormed business logic.",
      "alias": "pbr"
    },
    {
      "duration": "1",
      "text": "Participated in technical refinement meeting. Collaborated with the team on task breakdowns and explored potential technical challenges and solutions.",
      "alias": "tr"
    },
  ];


  write(
      file,
      defaultTemplates,
  );
}

module.exports.template = template;
