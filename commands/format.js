const { readOrCreate, resetFormats, formatWorkLogRecord, formatGitActivityDescription, updateFormats} = require("../utils/format");
const {askForConfirmation} = require("../utils/askFor");

async function format(options) {
    const formats = readOrCreate();
    
    if(Object.keys(options).length === 0){
        console.log(`defined formats are listed below. Use 
            'jira format --check' to check them, 
            'jira format --default' to reset formats,
            'jira format --edit' to edit existing formats`);
        console.log(` - format for regular work log : ${formats.workLogRecord}`)
        console.log(` - format for git activity when no reference found in commit message : ${formats.gitActivityDesctiptionNoReference}`)
        console.log(` - format for git activity when there is a reference in commit message : ${formats.gitActivityDesctiptionWhenReferenceFound}`)
    }
    
    if(options.default){
        await resetToDefault();
    } 

    if(options.check){
        check();
    }
    
    if(options.edit){
        await updateFormats();
    }

}

function check() {
    console.log('current formats will be applied like this:\n');
    const item = {
        hours: 0.5,
        activity: 'I took part in daily meeting'
    };
    console.log(`if you have a logged activity with description ${item.activity} with ${item.hours} hours duration it will be added in daily log in the following format:`)
    console.log(formatWorkLogRecord(item))


    const gitActivityWithReference = {
        tickets: ['12A-1'],
        repo: 'App.Messaging.Service',
    }
    console.log(`if you create a worklog record based on commit in the following format:
        feat: support of service bus
        
        added support of azure service bus via mass transit to send messages
        
        refs: #${gitActivityWithReference.tickets[0]}
        in the ${gitActivityWithReference.repo} repository you will get the following text as a default text:`)

    console.log(formatGitActivityDescription(gitActivityWithReference));

    const gitActivityWithNoReference = {
        repo: 'App.Logging.Service',
    }
    console.log(`if you create a worklog record based on commit in the following format:
        fix: logs handling
        
        in the ${gitActivityWithNoReference.repo} repository you will get the following text as a default text:`)

    console.log(formatGitActivityDescription(gitActivityWithNoReference));
}

async function resetToDefault() {
    const confirmation = await askForConfirmation('are you sure you want to reset formats to default state?');
    if (confirmation) {
        resetFormats();
    }
    return;
}

module.exports = {
    format,
}