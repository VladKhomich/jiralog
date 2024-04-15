const { execSync } = require('child_process');
const fs = require("fs");
const path = require('path');

const ticketRegex = /#\d+/g;

function getGlobalGitUserEmail(){
    return execSync('git config --global user.email').toString().trim();
}

function getAllRepos(repoDir){
    const absolutePath = path.resolve(repoDir);
    const normalizedPath = path.normalize(absolutePath);
    const items = fs.readdirSync(normalizedPath, { withFileTypes: true });
    const repos = items.filter(dirent => {
        const repoPath = path.join(repoDir, dirent.name);
        return (dirent.isDirectory() && fs.existsSync(path.join(repoPath, '.git')));
    });
    
    return repos.map(repo => {
        return {
            name: repo.name,
            path: path.join(repoDir, repo.name),
        }            
    })
}

function getAllContributions(date, repoDir, userEmail){
    const repos = getAllRepos(repoDir);
    const contributions = [];
    repos.forEach(repo => {
        try {
            const log = execSync(`git -C "${repo.path}" log --since="${date} 00:00" --before="${date} 23:59" --author="${userEmail}" --pretty=format:"%s|||%b///" --all`);
            const commits = log.toString().split('///');
            commits.forEach(commit => {
                if(commit){
                    const commitTitle = commit.split('|||')[0].replace('\n','');
                    const tickets = commit.match(ticketRegex);
                    contributions.push(
                        {
                            repo: repo.name,
                            tickets: tickets ? tickets.map(ticket => ticket.replace('#','')): undefined,
                            details: commitTitle,
                        });
                }
            });
        } catch (error) {
            console.error(`Error accessing commits in ${repo.name}: ${error.message}`);
        }
    });
    return contributions;
}

module.exports = {
    getAllRepos,
    getGlobalGitUserEmail,
    getAllContributions
}