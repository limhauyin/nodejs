// promise-based approch
getUser(1)
.then(user => getRepositories(user.gitHubUsername))
.then(repo => displayRepo(repo[0]))
.catch(err => console.log(err))

//async await approch
async function displayRepository() {
    try {
        const user = await getUser(1)
        const repos = await getRepositories(user.gitHubUsername)
        const commits = await displayRepo(repos[0])
        console.log(commits)
    }
    catch (err) {
        console.log(err)
    }

}
displayRepository()

// call back 
function getUser(id) { 
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            resolve({id : id, gitHubUsername: 'Test'})
        },2000)
    })
    // setTimeout(() => {
    //     console.log('reading a user from db')
    //     callback({id : id, gitHubUsername: 'Test'})
    // },2000)
}

function getRepositories(username){
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            resolve(['repo1','repo2','repo3'])
        },2000)
    })
    // setTimeout(() => {
    //     console.log('reading a user repo from db')
    //     callback(['repo1','repo2','repo3'])
    // },2000)

}

// fix call back hell issue 
function displayRepo(repos){
    console.log(repos)
}
function getRepo(user){
    getRepositories(user.gitHubUsername, displayRepo) 
}