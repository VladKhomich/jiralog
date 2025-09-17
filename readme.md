# jiralog
The present package is a CLI tool that can be used to post work logs to jira server.

![NPM Downloads](https://img.shields.io/npm/d18m/jiralog?style=for-the-badge&logo=npm&color=970000)
![NPM Version](https://img.shields.io/npm/v/jiralog?style=for-the-badge&logo=npm&color=970000)

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
jira git
jira log 0.5 "Assisted Bob with refactiong of Notification package"
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

> Using git activity
> 
> In the selection of options there is a special one that which will launch [git command](#git). With this user is able to create a work log not based on template but based on recent git activity in repositories.

### config
Launches configuration wizard:

`jira config`
Can be used to create configuration initially or edit the existing one.
Let's assume that manually you create you work logs here:
`https://jira.super.company.com/browse/TASK11`
In this case:
- base url is `https://jira.super.company.com`
- task id is `TASK11`

User needs to provide information for authentication. In more detail this is described in [Usage of credentials](#usage-of-credentials)

### drop
Drops today's log

`jira drop`

### remove
Removes selected work log record

`jira remove`

### edit [e]
Launches wizard record modification

`jira edit`

### git
Allows to create a work log record based on git activity.

> Requires additional configuration
> 
> In case if application was used before this feature was introduced, user needs to go through `jira config` again to provide requred information 

The main idea of this command is to check commits in provided repositories directory for the specified date and create a work log record based on this activity. To achieve the most precised user experience, it's required to follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

The commits searching process is based on several options provided by the user:
- git user email (commits are filtered by provided email during the `jira config` execution)
- available repositories list (user can provide repositories directory during `jira config` execution. To check if all desired repositories are included in the searching process use `jira git --repos`)
- date (several date format are possible, more details are available in [providing date as a parameter section](#input-date-as-a-parameter))


#### [no flag]
`jira git` (Will start wizard of work log creation based on git activity for today)

#### -d < date > / --date < date >
`jira git -d 2024-04-25` (Will check git activity for the 25th of April 2024 and create a work log record based on user selection)

`jira git -d 04-25` (Will check git activity for the 25th of April current year and create a work log record based on user selection)

`jira git -d 25` (Will check git activity for the 25th day of the current month and create a work log record based on user selection)

If date is not provided explicitly the current day will be used

> Possible pitfalls
> 
> In case if activity is expected to be displayed but was not, it's a good idea to check if `git user email` and `git repositories directory` are specified properly. To do this use `jira config` and `jira git --repos`. 
>
> Additionally you may need to check if date is provided in the [valid format](#input-date-as-a-parameter) 
>
> In case if task number is not fetched from the commit message it may be due to commit message format. Make sure that you follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) approach. 

#### -r / --repos

`jira git --repos` (Will list all repositories that are visited during git activity searching process. Allow to check if directory was configured properly during `jira config` execution)


### template
Allows to manipulate templates

#### [no flag]

Launches template creation process

`jira template`
#### -l

Lists all available templates

`jira template -l`
#### -d

Resets existing template to default ones. All previously created templates will be removed

`jira template -d`
#### -r

Removes selected template

`jira template -r`

#### -e
Updates selected template

`jira template -e`

### post
Posts all records for today to provided jira server.

`jira post`

> 🔑 Authentication
>
> User needs to provide information for authentication. In more detail this is described in [Usage of credentials](#usage-of-credentials)

#### -y
Posts work log for yesterday
`jira post -y`

#### -d < date > / --date < date >
Posts work log for the concrete date. 

More details are available in [providing date as a parameter section](#input-date-as-a-parameter)

`jira post -d 10` (With post work log to the 10th day of the current month and year)

`jira post -d 5-2` (With post work log to the second of May of the current year)

`jira post -d 2020-5-2` (With post work log to the second of May 2020)

#### -o < int > / --offset < int >
Posts work log to the server with a specified offset in days

`jira post --offset 2` (Will post the current work log for the day before yesterday)

### format
Allows user to define which formats are used to create work log records.

#### [no flag]
Lists available formats

#### -c / --check
Provides information about defined formats.

`jira format -c`

#### -d / --default
Resets created formats to default ones

`jira format -d`

#### -e / --edit
Allows user edit created formats.

`jira format -d`

> How formats must be defined
> 
> `jira format -d` will start wizard of formats editing. User should provide values for formats in the way, described in command hints.
> 
> For example, if format for work log record is being entered, you need to provide a text with some placeholders that later will be replaced with real values. In this case you need provide WORKLOG_DURATION where you want to get duration of activity and WORKLOG_DESCRIPTION where description is required to be inserted.

In order to check entered scenarios use `jira format --check`. In case it's required to reset formats to default use `jira format --default`.

## Tags

Tags allow you to organize your worklogs into different categories or projects. When using tags, worklog files are saved with the format `<date>.<tag>.jira` instead of just `<date>.jira`.

### Usage

Most commands support the `--tag` or `-t` option to specify a tag:

```bash
# Log work with a specific tag
jira log 2 "Fixed authentication bug" --tag backend
jira j daily --tag frontend

# View worklogs by tag
jira today --tag backend
jira yesterday --tag frontend
jira report --days 7 --tag backend

# Edit/remove entries from tagged worklogs
jira edit --tag backend
jira remove --tag frontend

# Post tagged worklogs to JIRA
jira post --tag backend
jira post -y --tag frontend  # yesterday's frontend work
```

### Behavior

- **Without tags**: Commands work with the default worklog file (backward compatible)
- **With tags**: Commands work with tag-specific worklog files
- **Viewing all tags**: When no tag is specified for `today`, `yesterday`, or `report` commands, all available tags for that date are displayed
- **File organization**: Tagged files are stored as `2024_01_15.backend.jira`, `2024_01_15.frontend.jira`, etc.

### Examples

```bash
# Log different types of work
jira log 3 "API development" --tag backend
jira log 2 "UI improvements" --tag frontend
jira log 1 "Code review" --tag review

# View all work for today (shows all tags)
jira today

# View only backend work for today
jira today --tag backend

# Generate report for backend work over last 5 days
jira report --days 5 --tag backend
```

## Input date as a parameter

> Different input types are possible
> - only day of the month
> - month + day
> - year + month + day

Date is expected in one of following formats:

- `day`
- `month-day`
- `year-month-day`

## Usage of credentials
jiralog uses basic authentication to authenticate your request in the provided jira server. Basic authentication requires your username and password. There are two main approaches to handle credentials in jiralog:
- enter password on every `jira post` command
- save user token locally and use it

> ⚠️ It's not recommended to save credentials in any application
> 
> The best option is to enter password on every `jira post` command execution

User token can be saved locally in an encrypted way. Secret key is not a static value so you may need to re-enter your credentials from time to time.
To save your credentials locally you need to run `jira config` command and explicitly confirm credentials saving.

In case if saving of token is not acceptable, user needs to decline password saving in the scope of `jira config` command execution. In this case user will be asked for password on every execution of `jira post` command.

## MIT License

Copyright 2024 Uladzislau Khomich vladislav.builder@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.