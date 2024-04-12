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

### drop
Drops today's log

`jira drop`

### remove
Removes selected work log record

`jira remove`

### edit [e]
Launches wizard record modification

`jira edit`

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

#### -y
Posts work log for yesterday
`jira post -y`

#### -d < date > / --date < date >
Posts work log for the concrete date. 
> Different input types are possible
> - only day of the month
> - day + month
> - day + month + year

`jira post -d 10` (With post work log to the 10th day of the current month and year)

`jira post -d 5-2` (With post work log to the second of May of the current year)

`jira post -d 2020-5-2` (With post work log to the second of May 2020)

#### -o < int > / --offset < int >
Posts work log to the server with a specified offset in days

`jira post --offset 2` (Will post the current work log for the day before yesterday)

## MIT License

Copyright 2024 Uladzislau Khomich vladislav.builder@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
