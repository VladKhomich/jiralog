const countTotalHours = (worklog) => {
    return worklog.map((w) => w.hours).reduce((a, b) => +a + +b, 0);
};

module.exports.countTotalHours = countTotalHours; 