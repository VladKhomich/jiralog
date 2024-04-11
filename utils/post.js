const axios = require("axios");

function postWorklog(url, token, comment, timeSpentHours, started) {
  const config = {
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
    },
    params: {
      adjustEstimate: "leave",
      // , notifyUsers: false
    },
  };

  //jira api requires timeSpent to be passed first. TimeSpenSecond from the documentation leads to 500
  //according to docs we need to use ADF as a format for comment. But for some reason it causes a pasing error and returns 400

  const data = {
    timeSpent: formatDurationForJiraApi(timeSpentHours),
    comment,
    started: formatDateForJiraApi(started),
  };

  // Make the POST request
  axios
    .post(url, data, config)
    .then((response) => {
      console.log("Post request successful");
    })
    .catch((error) => {
      if (error.code === "NOTFOUND") {
        logError("Check the base URL in config");
        return;
      }
      if (error.response.status === 401) {
        logError("Check your credentials");
        return;
      }
      if (error.response.status === 404) {
        logError("Check the base URL in config ot your task id");
        return;
      }
      logError("Unexpected error, please contact to dev team");
    });
}

function logError(advice) {
  console.log(`failed to post daily log. ${advice}`);
}

function formatDateForJiraApi(date) {
  const isoString = date.toISOString();

  const datePart = isoString.slice(0, 10);
  const timePart = isoString.slice(11, 23);

  const formattedDate = `${datePart}T${timePart}+0000`;

  return formattedDate;
}

function formatDurationForJiraApi(hours) {
  return `${hours}h`;
}

function getTodayAt(hours) {
  const today = new Date();
  today.setHours(hours, 0, 0, 0);

  return today;
}

function getDayAt(hours, daysOffset) {
  const offset = daysOffset * 24 * 3600 * 1000;
  const day = new Date(Date.now() - offset)
  day.setHours(hours, 0, 0, 0);

  return day;
}

module.exports.postWorklog = postWorklog;
module.exports.getTodayAt = getTodayAt;
module.exports.getDayAt = getDayAt;
