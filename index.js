#! /usr/bin/env node

const { program } = require("commander");
const today = require("./commands/today");
const log = require("./commands/log");
const config = require("./commands/config");
const { drop } = require("./commands/drop");
const { remove } = require("./commands/remove");
const { edit } = require("./commands/edit");
const { post } = require("./commands/post");
const { yesterday } = require("./commands/yesterday");
const { jCommand } = require("./commands/jCommand");
const { template } = require("./commands/template");

program.command("config").description("Configures tool").action(config);
program
  .command("today")
  .alias("t")
  .description("Lists all today's logs")
  .action(today);
program
  .command("yesterday")
  .alias("y")
  .description("Lists all yesterday's logs")
  .action(yesterday);
program
  .command("log <hours> <activity>")
  .description("Logs activity")
  .alias("l")
  .action(log);

program.command("drop").description("Drops todays log").action(drop);
program.command("remove").description("Removes log item").action(remove);
program.command("edit").alias("e").description("Edits log item").action(edit);
program.command("post")
    .description("Posts log to jira server")
    .option('-y', 'yesterday')
    .option('-o, --offset <int>', 'offset in past (in days)')
    .action(post);

program
    .command("template")
    .description('Manages templates')
    .option('-l', 'lists available templates')
    .option('-r', 'removes selected template')
    .option('-e', 'edits selected template')
    .option('-d', 'resets to default templates')
    .action(template);

program
  .command("j")
  .argument("[alias]")
  .option("-d")
  .description("J command")
  .action(jCommand);

program.parse();
