const { askForConfirmation } = require("../utils/askFor");
const { exists, configFile, read, todayFile } = require("../utils/file");
const { postWorklog, getDayAt } = require("../utils/post");

const logFile = todayFile();

async function post(options) {
  const configExists = exists(configFile());

  if (!configExists) {
    console.log("Not configured, run [jira config] first");
    return;
  }

  if (!exists(logFile)) {
    console.log("No log for today. Run [jira log] first");
    return;
  }

  const worklog = read(logFile);

  const totalHoursToday = countTotalHours(worklog);

  if (totalHoursToday !== 8) {
    const confirm = await askForConfirmation(
      `${totalHoursToday} were logged (Not 8h). Are you sure you want to post?`
    );
    if (!confirm) {
      return;
    }
  }

  const config = read(configFile());
  console.log(`posting to jira ${config.baseUrl}`);
  let text = "";
  worklog.forEach((logItem) => {
    text += `- (${logItem.hours}h) ${logItem.activity}\n`;
  });

  console.log(text);

  let daysOffset = 0;
  
  if(options.y){
    daysOffset = 1;
  }
  
  if(options.offset){
    daysOffset = parseInt(options.offset);
  }
  
  await startPost(config, text, totalHoursToday, daysOffset);
  
}

const startPost = async (config, text, totalHoursToday, daysOffset) => {
  let confirmMessage;
  
  switch (daysOffset){
    case 0: 
      confirmMessage = 'are you sure you want to post this to jira server for today?';
      break;
    case 1:
      confirmMessage = 'are you sure you want to post this to jira server for yesterday?';
      break;
    default:
      confirmMessage = `are you sure you want to post this to jira server for ${daysOffset} back?`;      
  }

  const confirmPosting = await askForConfirmation(confirmMessage);
  if (confirmPosting) {
    const baseUrl = `${config.baseUrl}/rest/api/2/issue`;
    const taskId = config.taskId;
    const url = `${baseUrl}/${taskId}/worklog`;
    const key = config.key;
    postWorklog(url, key, text, totalHoursToday, getDayAt(9, daysOffset));
  }
}

const countTotalHours = (worklog) => {
  return worklog.map((w) => w.hours).reduce((a, b) => +a + +b, 0);
};

module.exports.post = post;
