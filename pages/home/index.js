/* Desenvolva sua lógica aqui...*/

function interationForm() {
    let inputUserName = document.getElementById("input-login")
    let buttonSearchUser = document.getElementById("button-search")

    inputUserName.addEventListener("keydown", () => {
        buttonSearchUser.disabled = false
    })

    buttonSearchUser.addEventListener("click", (event) => {
        event.preventDefault()
        let buttonSearch = event.target
        let valueInput = inputUserName
        /* takeUserAPI(valueInput, buttonSearch) */
        searchUserGitHub(valueInput, buttonSearch)
    })
}

function searchUserGitHub(userInput, button){
    button.disabled = true
    button.innerHTML = `
        <img class="icon-search" src="/assets/img/spinner.png" alt="icone de procura">
    `
    
    const response = fetch(`https://api.github.com/users/${userInput.value}`)
    .then(async resp => {
        
        if (!resp.ok) {
            let inputUserName = document.getElementById("input-login")

            inputUserName.insertAdjacentHTML("afterend", `<h3 class="user-underfind">usuario não encontrado</h3>`)
            inputUserName.classList.toggle("input-fail")

            setTimeout(() => {
                let userUnderFind = document.querySelector(".user-underfind")
                userUnderFind.remove()
                inputUserName.classList.toggle("input-fail")
            }, 1055)

            
        } else {
            let data = await resp.json()
        
            let userData = {
                img: data.avatar_url,
                user: `${userInput.value}`,
                userName: data.name
            }

            addListRecentUser(userData)
            SetUserProfileCurrent(userData.user)
            location.replace("/pages/profile/index.html");
        }
    })
    .catch(err => console.log(err))
    

    setTimeout(() => {
        button.innerHTML = "Ver perfil do github"
        userInput.value = ''
    }, 1055)
}

interationForm()



/* recent list */

function takeListRecentLocalStorage() {
    return JSON.parse(localStorage.getItem("@ListRecentUser")) || []
}

const listRecent = Array.from(takeListRecentLocalStorage())

function addListRecentUser(user) {
    let list = listRecent

    if (list.length <= 2) {
        
        if (list.length === 0) {
            localStorage.setItem("@ListRecentUser", JSON.stringify([user]))
        } else {
            list.forEach(element => {
                const findUser = list.find((userCurrent) => {
                    return userCurrent.userName === user.userName
                })

                if (findUser === undefined) {
                    localStorage.setItem("@ListRecentUser", JSON.stringify([...list, user]))
                }
            })
        }
    } else {
        list.forEach(element => {
            const findUser = list.find((userCurrent) => {
                return userCurrent.userName === user.userName
            })

            if (findUser === undefined) {
                localStorage.setItem("@ListRecentUser", JSON.stringify([...list, user]))
                list.splice(0, 1)
            }
        })
    }   
}


function renderRecentUser(list) {
    let listRecent = document.querySelector(".list-recent")
    if (list.length > 0) {
        
        let span = document.createElement("span")
        span.classList.add("text-2")
        span.innerText = "Achados Recentemente:"

        listRecent.append(span)
        
        list.forEach(user => {
            let profileRecent = document.createElement("li")
            profileRecent.classList.add("profile-recent")
            profileRecent.id = user.userName

            profileRecent.innerHTML = `
            <a href="#" onclick="showProfileRecent(event)">
                <img class="img-recent" src="${user.img}" alt="${user.user}">
            </a>
            <span class="text-5">Acessar este perfil</span>
            `

            listRecent.appendChild(profileRecent)
        })
    }
}

renderRecentUser(listRecent)


function showProfileRecent(event) {
    let username = event.target.alt

    SetUserProfileCurrent(username)
    
    setTimeout(() => {
        location.replace("/pages/profile/index.html");
    }, 1055)
}


function SetUserProfileCurrent(user) {
    return localStorage.setItem("@currentUser", JSON.stringify(user))
}