const {formatsFile, exists, write, read} = require("./file");
const { askForParameterWithDefault } = require("./askFor");

const placeholders = {
    workLogDuration: 'WORKLOG_DURATION',
    workLogDescription: 'WORKLOG_DESCRIPTION',
    taskNumber: 'TASK_NUMBER',
    repositoryName: 'REPOSITORY_NAME',
}

const defaultFormats = {
    workLogRecord: `- (${placeholders.workLogDuration}h) ${placeholders.workLogDescription}`,
    gitActivityDesctiptionWhenReferenceFound: `Worked on task #${placeholders.taskNumber} in ${placeholders.repositoryName} repository`,
    gitActivityDesctiptionNoReference: `Worked with ${placeholders.repositoryName} repository`,
}

const file = formatsFile();

const formatWorkLogRecord = (item) => {
    const formats = readOrCreate();
    const recordFormat = formats.workLogRecord;
    return `${recordFormat.replace(placeholders.workLogDuration, item.hours).replace(placeholders.workLogDescription, item.activity)}`;
}

const formatGitActivityDescription = (contribution) => {
    const formats = readOrCreate();

    if(contribution.tickets){
        const format = formats.gitActivityDesctiptionWhenReferenceFound;
        return format.replace(placeholders.taskNumber, contribution.tickets.join(', ')).replace(placeholders.repositoryName, contribution.repo);
    }
    const format = formats.gitActivityDesctiptionNoReference;
    return format.replace(placeholders.repositoryName, contribution.repo);
    
}

const readOrCreate = () =>{
    const configExists = exists(file);

    if(!configExists){
        write(file, defaultFormats);
        return defaultFormats;
    }
    
    const formats = read(file);
    
    return {
        ...defaultFormats,
        ...formats,
    }
}

const resetFormats = () => {
    write(file, defaultFormats);
}

const updateFormats = async () => {
    const formats = read(file);

    const workLogRecord = await askForParameterWithDefault(`enter format for regular worklog. 
    Use ${placeholders.workLogDuration} for duration and ${placeholders.workLogDescription} for description`, formats.workLogRecord);
    
    const gitActivityDesctiptionNoReference = await askForParameterWithDefault(`enter format for git activity with no reference found. 
    Use ${placeholders.repositoryName} for repository name`, formats.gitActivityDesctiptionNoReference);


    const gitActivityDesctiptionWhenReferenceFound = await askForParameterWithDefault(`enter format for git activity when there is a reference found. 
    Use ${placeholders.repositoryName} for repository name and ${placeholders.taskNumber} for task number`, formats.gitActivityDesctiptionWhenReferenceFound);
    
    write(file, {
        workLogRecord,
        gitActivityDesctiptionWhenReferenceFound,
        gitActivityDesctiptionNoReference,
    })
}

module.exports = {
    defaultFormats,
    formatWorkLogRecord,
    formatGitActivityDescription,
    readOrCreate,
    resetFormats,
    updateFormats,
}