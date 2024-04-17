const { askForConfirmation } = require("../utils/askFor");
const { exists, configFile, read, todayFile } = require("../utils/file");
const { postWorklog, getDayAt, getTodayAt, getConfirmationMessage, getTargetDate} = require("../utils/post");
const { countTotalHours } = require("../utils/workLog");
const { formatWorkLogRecord } = require("../utils/format");
const { getKey, decryptKey } = require("../utils/configBuilder");

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
  let targetDate = getTodayAt(9);
  
  if(options.y){
    daysOffset = 1;
    targetDate = getDayAt(9, 1);
  }
  
  if(options.offset){
    daysOffset = parseInt(options.offset);
    targetDate = getDayAt(9, daysOffset);
  }
  
  if(options.date){
    daysOffset = undefined;
    targetDate = getTargetDate(options.date);
  }

  const confirmMessage = getConfirmationMessage(daysOffset, targetDate);
  
  await startPost(config, text, totalHoursToday, targetDate, confirmMessage);
  
}

const startPost = async (config, text, totalHoursToday, date, confirmMessage) => {
  const confirmPosting = await askForConfirmation(confirmMessage);
  if (confirmPosting) {
    const baseUrl = `${config.baseUrl}/rest/api/2/issue`;
    const taskId = config.taskId;
    const url = `${baseUrl}/${taskId}/worklog`;
    
    let key = decryptKey(config.key);
    
    if(!key){
      const password = await askForSecret('enter your password (It will NOT be saved anywhere by jiralog)')
      key = getKey(config.login, password);
    }
    postWorklog(url, key, text, totalHoursToday, date);
  }
}

module.exports.post = post;
