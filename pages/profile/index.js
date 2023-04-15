/* Desenvolva sua lógica aqui...*/
const baseUrl = "https://api.github.com/users"

async function renderInforUser(user) {
    const response = await fetch(`${baseUrl}/${user}`)
    .then(async resp => {

        if (!resp.ok) {
            console.log(resp.status)
        }

        let data = await resp.json()
        let {avatar_url, bio, name} = data
        
        let containerHeader = document.querySelector(".container-header")

        containerHeader.insertAdjacentHTML("afterbegin", `
            <div class="container-infor-user">
                <img src="${avatar_url}" alt="foto de perfil">
                <div class="infor-user">
                    <h1 class="title-2">${name}</h1>
                    <span class="text-2">${bio}</span>
                </div>
            </div>
        `)
    })
    .catch(err => console.log(err))

    renderRepositoriesUser(user)
}


async function renderRepositoriesUser(user) {
    const response = await fetch(`${baseUrl}/${user}/repos`)
    .then(async resp => {
        
        let data = await resp.json()
        data.map(respo => {
            const {name, description, html_url} = respo
            
            let listRepositories = document.querySelector(".list-repositories")

            let repository = document.createElement("li")
            repository.classList.add("repository")

            repository.innerHTML = `
                <h2 class="title-3">${name}</h2>
                <p class="text-4">${description}</p>
                <div class="buttons-repositories">
                    <a class="button-second-rosa" href="${html_url}" target="_blank">Repositório</a>
                    <button class="button-second-rosa">Demo</button>
                </div>
            `

            listRepositories.appendChild(repository)
        })

        
    }).catch(err => console.log(err))
}


function changeUser() {
    location.replace("./index.html");
}


function takeUserProfile() {
    return JSON.parse(localStorage.getItem("@currentUser"))
}


renderInforUser(takeUserProfile())