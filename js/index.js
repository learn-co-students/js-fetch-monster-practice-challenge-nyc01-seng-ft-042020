document.addEventListener("DOMContentLoaded", function(e){
    
    const baseUrl = "http://localhost:3000/monsters"
    const monsterContainer = document.querySelector('#monster-container')
    const createMonster = document.querySelector('#create-monster')
    const forwardButton = document.querySelector('#forward')
    const backButton = document.querySelector('#back')
    
    
    // X * fetch request to get the monsters
    // X fifty monsters at a time
    
    fetch(baseUrl + "/?_limit=50&_page=2")
    .then(response => response.json())
    .then(monsters => {
        monsters.forEach(monster => renderMonster(monster))
    });
    
    // X * render the monster information 
    // X * monster name, age, and description
    
    function renderMonster(monster){
        const monsterDiv = document.createElement('div')
        monsterDiv.className = "card"
        monsterDiv.dataset.id = monster.id
        monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
        `
        monsterContainer.appendChild(monsterDiv)
    }
    
    
    // * form for creating a new monster
    const monsterForm = document.createElement('form')
    monsterForm.id = "monster-form"
    monsterForm.innerHTML = `
        <label>Name: </label>
        <input type="text" name="name">
        <label>Age: </label>
        <input type="number" name="age">
        <label>Description: </label>
        <input type="text" name="description">
        <input type="submit" value="Add Monster">
        `
    createMonster.appendChild(monsterForm)
        
    // * new monster should persist to database

    document.addEventListener('submit', function(e){
        const newMonsterForm = document.querySelector("#monster-form")
        e.preventDefault()
        const name = newMonsterForm.name.value
        const age = newMonsterForm.age.value
        const description = newMonsterForm.description.value
        
        const monsterObj = {
            name: name,
            age: age,
            description: description
        }
        renderMonster(monsterObj)
        console.log(renderMonster)
        // newMonsterForm.name.value = ""
        // newMonsterForm.age.value = ""
        // newMonsterForm.description.value = ""
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: name,
                age: age,
                description: description
            })
        })
        .then(resp => resp.json())
        .then(console.log)

    });
    
    // * button should show next 50 monsters, etc 

    forwardButton.addEventListener('click', function(e){

    })


    backButton.addEventListener('click', function(e){
        
    })

});