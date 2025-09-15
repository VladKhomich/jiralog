function dateDaysAgo(days) {
    const offset = 24 * 3600 * 1000 * days;
    return new Date(Date.now() - offset).toISOString().slice(0, 10);
}


module.exports.dateDaysAgo = dateDaysAgo;
