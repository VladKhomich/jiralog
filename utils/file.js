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

function todayFile(tag) {
  const today = new Date().toISOString().slice(0, 10);
  const fileName = tag
    ? `${today.replace(/-/g, "_")}.${tag}.jira`
    : `${today.replace(/-/g, "_")}.jira`;
  return path.join(getDirectory(), fileName);
}

function yesterdayFile(tag) {
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
      offset = dayOffset;
  }

  const yday = new Date(Date.now() - offset).toISOString().slice(0, 10);
  const fileName = tag
    ? `${yday.replace(/-/g, "_")}.${tag}.jira`
    : `${yday.replace(/-/g, "_")}.jira`;
  return path.join(getDirectory(), fileName);
}

function fileDaysAgo(days, tag) {
  const offset = 24 * 3600 * 1000 * days;
  const yday = new Date(Date.now() - offset).toISOString().slice(0, 10);
  const fileName = tag
    ? `${yday.replace(/-/g, "_")}.${tag}.jira`
    : `${yday.replace(/-/g, "_")}.jira`;
  return path.join(getDirectory(), fileName);
}

function configFile() {
  return path.join(getDirectory(), "config.jira");
}

function formatsFile() {
  return path.join(getDirectory(), "formats.jira");
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

function getAllFilesForDate(dateStr) {
  const directory = getDirectory();
  const datePrefix = dateStr.replace(/-/g, "_");

  try {
    const files = fs.readdirSync(directory);
    return files
      .filter(file => file.startsWith(datePrefix) && file.endsWith('.jira'))
      .map(file => {
        const fullPath = path.join(directory, file);
        const parts = file.split('.');
        if (parts.length === 2) {
          // No tag: date.jira
          return { path: fullPath, tag: null, file };
        } else if (parts.length === 3) {
          // With tag: date.tag.jira
          return { path: fullPath, tag: parts[1], file };
        }
        return null;
      })
      .filter(Boolean);
  } catch (error) {
    return [];
  }
}

module.exports.exists = exists;
module.exports.read = read;
module.exports.write = write;
module.exports.remove = remove;
module.exports.todayFile = todayFile;
module.exports.yesterdayFile = yesterdayFile;
module.exports.configFile = configFile;
module.exports.configFile = configFile;
module.exports.formatsFile = formatsFile;
module.exports.templatesFile = templatesFile;
module.exports.fileDaysAgo = fileDaysAgo;
module.exports.getAllFilesForDate = getAllFilesForDate;
