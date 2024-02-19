const fs = require("fs");
const os = require("os");
const path = require("path");

function exists(file) {
  return fs.existsSync(file);
}

function read(file) {
  try {
    const currentContent = fs.readFileSync(file, "utf8");
    return JSON.parse(currentContent);
  } catch (error) {
    console.error("Error parsing log file content:", error);
    return;
  }
}

function write(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

function remove(file) {
  fs.rmSync(file);
}

function todayFile() {
  const today = new Date().toISOString().slice(0, 10);
  const fileName = `${today.replace(/-/g, "_")}.jira`;
  return path.join(getDirectory(), fileName);
}

function yesterdayFile() {
  const toDayOfTheWeek = new Date(Date.now()).getDay();
  const dayOffset = 24 * 3600 * 1000;
  var offset = 0;

  switch (toDayOfTheWeek) {
    case 1:
      offset = 3 * dayOffset;
      break;
    case 0:
      offset = 2 * dayOffset;
      break;
    default:
      dayOffset;
  }

  const yday = new Date(Date.now() - offset).toISOString().slice(0, 10);
  const fileName = `${yday.replace(/-/g, "_")}.jira`;
  return path.join(getDirectory(), fileName);
}

function configFile() {
  return path.join(getDirectory(), "config.jira");
}

function templatesFile() {
  return path.join(getDirectory(), "templates.jira");
}

function getDirectory() {
  const d = `${os.homedir()}/jiracli`;
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d);
  }
  return d;
}

module.exports.exists = exists;
module.exports.read = read;
module.exports.write = write;
module.exports.remove = remove;
module.exports.todayFile = todayFile;
module.exports.yesterdayFile = yesterdayFile;
module.exports.configFile = configFile;
module.exports.templatesFile = templatesFile;
