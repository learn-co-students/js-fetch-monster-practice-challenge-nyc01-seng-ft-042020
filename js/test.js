document.addEventListener("DOMContentLoaded", function(){

    const baseURL = "http://localhost:3000/monsters"
    const monsterContainer = document.querySelector('#monster-container')
    const createMonster = document.querySelector('#create-monster')
    const newMonsterForm = document.createElement('form')
    const monsterForm = document.querySelector('#monster-form')
    let page = 1

    loadMonsters()
    createMonsterForm()


    // Fetch Monsters
    function loadMonsters(){
        fetch(baseURL + "/?_limit=20&_page=3")
        .then (resp => resp.json())
        .then (json => renderMonsters(json))
    }

    function renderMonsters(obj){
        obj.forEach(function(monObj){
            renderMon(monObj)
        })
    }

    function renderMon(obj){
        const div = document.createElement('div')
        div.className = "info"
        div.innerHTML = `
        <h3>${obj.name}</h3>
        <h4>${obj.age}</h4>
        <p>${obj.description}</p>`

        monsterContainer.append(div)
    }



    // Monster Form
    function createMonsterForm(){
        newMonsterForm.id = 'monster-form'
        createMonster.append(newMonsterForm)
        newMonsterForm.innerHTML = 
        `
        <label>Name: </label>
        <input type="text" name="name">
        <br>
        <label>Age: </label>
        <input type="number" name="age">
        <br>
        <label>Description: </label>
        <input type="text" name="description">
        <br>
        <input type="submit" value="Add Monster">
        `
    }


    monsterForm.addEventListener('submit', function(e){
        const monForm = e.target
        const name = monForm.name.value
        const age = monForm.age.value
        const desc = monForm.description.value

        let formData = {
            name: name,
            age: age,
            description: desc
        }

        let configObj = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(formData)
        };
        fetch(baseURL, configObj)
    })

    // document.addEventListener('click', function(e){
    //     if(e.target.id === "forward")

    // })
})