document.addEventListener("DOMContentLoaded", () => {

    // Add form 
    const createMonster = document.querySelector("#create-monster")
    const form = document.createElement("form")
    form.innerHTML = `
        <label> Create Monster </label>
        <input type="text" name="name" placeholder="name...">
        <input type="text" name="age" placeholder="age...">
        <input type="text" name="description" placeholder="description...">
        <input type="submit">

    `
    createMonster.appendChild(form)

    // Render monsters
    const monsterContainer = document.querySelector("#monster-container")
    let page = 1

    function renderMonsters(obj) {
        obj.forEach(monster => renderMonster(monster))
    }

    function renderMonster(monster) {
        const div = document.createElement("div")
        div.className = "monster"
        div.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
        `
        monsterContainer.appendChild(div)
    }
    
    function fetchMonsters(page){ 
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(json => renderMonsters(json))
        .catch(error => {
            window.alert(error.message)})
    }

    fetchMonsters()

    // Click "next page" and "previous page"
    function removeMonsters(){

        child = document.querySelector(".monster")

        while (child) {
            monsterContainer.removeChild(child)
            child = document.querySelector(".monster")
        }
    }

    document.addEventListener("click", e => {
        if (e.target.id === "forward") {
            page++
            removeMonsters()
            fetchMonsters(page)
        }

        else if (e.target.id === "back") {
            if (page === 1) {
                window.alert("Ain't no monsters here")
            }

            else {
                page--
                removeMonsters()
                fetchMonsters(page)
            }
        }
    })

    //Create a monster
    function fetchCreateMonster(monster) {
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(monster)
        }

        fetch("http://localhost:3000/monsters", configObj)
        .catch(error => window.alert(error.message))
    }

    form.addEventListener("submit", e => {
        const monster = {
            name: `${e.target.name.value}`,
            age: `${e.target.age.value}`,
            description:`${e.target.description.value}`
        }

        fetchCreateMonster(monster)
    })

})