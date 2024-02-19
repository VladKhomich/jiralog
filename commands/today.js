const { exists, read, todayFile } = require("../utils/file");

const file = todayFile();

function today() {
  if (exists(file)) {
    const data = read(file);
    let total = 0;
    data.forEach((element) => {
      console.log(`(${element.hours}h) ${element.activity}`);
      total += +element.hours;
    });
    console.log(`${total}h TOTAL`);
  } else {
    console.log("No logged work today");
  }
}

module.exports = today;
