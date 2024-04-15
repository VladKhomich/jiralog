const { getAllContributions, getAllRepos } = require("../utils/git");
const cliSelect = require("cli-select");
const { askForParameterWithDefault, askForParameter } = require("../utils/askFor");
const log = require("./log");
const { exists, read, configFile } = require("../utils/file");
const { writeConfigIsMissing } = require("../utils/loggers");
const { getTargetDate } = require("../utils/post");

function git(options = {}) {
    const config = getConfig();
    if(!config){
        return;
    }
        
    if(options.repos){
        listRepos(config.gitReposDir);
        return;
    }
    
    let date = new Date().toISOString().split('T')[0];
    if(options.date){
        date = getTargetDate(options.date).toISOString().split('T')[0];
    }

    const repoDir = config.gitReposDir;
    const userEmail = config.gitUserEmail;

    const contributions = getAllContributions(date, repoDir, userEmail);
    
    if(contributions.length === 0){
        console.log(`no contributions were found for ${date}. Check if expected repositories are listed with 'jira git --repos' and if git user email is correct in 'jira config'`);
        return;
    }

    cliSelect(
        {
            values: [...contributions.map((c) => getLabelForContribution(c)), 'cancel'],
        },
        async (selection) => {
            if(selection.value === 'cancel'){
                return;
            }
            const contribution = contributions.find(c => getLabelForContribution(c) === selection.value);
            const workLog = getRecord(contribution);
            const description = await askForParameterWithDefault('enter description of the work log', workLog);
            const duration = await askForParameterWithDefault('duration?', 1);

            log(duration, description);
        }
    );
 
}

function getLabelForContribution(contribution){
    if(contribution.tickets){
        return `${contribution.repo}  #${contribution.tickets.join(', #')}  ${contribution.details}`;
    }
    return `${contribution.repo}  ${contribution.details}`;
}

function getRecord(contribution){
    if(contribution.tickets){
        return `Worked on task #${contribution.tickets[0]} in ${contribution.repo} repository.`;
    }
    return `worked with ${contribution.repo} repository.`;
}

function listRepos(reposDirectory){ 
    const repos = getAllRepos(reposDirectory);
    console.log(`tracked repositories (edit directory in 'jira config' in case of mistake)`);
    repos.forEach(r => console.log(` - ${r.name}`));
}

function getConfig(){
    const configExists = exists(configFile());
    if(!configExists){
        writeConfigIsMissing();
        return;
    }
    
    const config = read(configFile());
    
    if(!config.gitUserEmail || !config.gitReposDir){
        console.log('git user email and repos directory are missing');
        writeConfigIsMissing();
        return;
    }
    
    return config;    
}

module.exports.git = git;
