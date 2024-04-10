# jiralog
The present package is a CLI tool that can be used to post work logs to jira server.
## Use case
In many outsource companies there is a regular practice of posting work logs in a single jira ticket on daily-basis in order to keep track of employee's work and generate required reports.

This tool can be used to avoid routine when developer have to remember every single activity in the evening and compose the work log having opened jira website in browser. 
## Installation
```
npm i jiralog -g
jira config
```
## Example of usage
```
jira j daily
jira j planning
jira log 0.5 "Had a call with PM and LD in order to allign solution for bug #3201-1"
jira log 4 "Worked on resolution of #3201-1"
jira log 1.5 "Assisted Bob with refactiong of Notification package"
jira log 0.5 "Conducted peer-review for Kate #3198-4"
jira post
```

## Commands

### log
Creates a simple record:

`jira log 0.5 "Had a call with Alex regarding new endpoints in Sales microservice."`

Duration should be provided in hours with `.` separator.

### today [t]
Shows today's records

`jira today`

`jira t`

### yesterday [y]
Shows yesterday's records

`jira yesterday`

`jira y`

### j
This is a "J Command". It is planned as a multifunctional command but currently it's used for work log creation based on existing template:

`jira j daily` - this will launch work log wizard based on "daily" template)

`jira j` - this will allow selection of template to be used for work log creation
### config
Launches configuration wizard:

`jira config`
Can be used to create configuration initially or edit the existing one.
Let's assume that manually you create you work logs here:
`https://jira.super.company.com/browse/TASK11`
In this case:
- base url is `https://jira.super.company.com`
- task id is `TASK11`

## drop
Drops today's log

`jira drop`

## remove
Removes selected work log record

`jira remove`

## edit [e]
Launches wizard record modification

`jira edit`

## template
Allows to manipulate templates

### [no flag]

Launches template creation process

`jira template`
### -l

Lists all available templates

`jira template -l`
### -d

Resets existing template to default ones. All previously created templates will be removed

`jira template -d`
### -r

Removes selected template

`jira template -r`

### -e
Updates selected template

`jira template -e`

## post
Posts all records for today to provided jira server.

`jira post`
