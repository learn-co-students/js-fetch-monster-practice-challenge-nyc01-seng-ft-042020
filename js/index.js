// get - show first 50 monsters

document.addEventListener('DOMContentLoaded', function(e){
    const monsters = document.getElementById('monster-container')
    const baseUrl = "http://localhost:3000/monsters"
    const baseUrlLimitandPage = "http://localhost:3000/monsters/?_limit=50&_page="
    let page = 1


    function renderMonsters(monstersArray){
        monstersArray.forEach(monster => renderMonster(monster))
    }

    function renderMonster(monster){
        let monsterDiv = document.createElement('div')
        monsterDiv.id = monster.id
        monsterDiv.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>`
        monsters.append(monsterDiv)
    }

    function fetchMonsters(url){
        fetch(url)
        .then(resp => resp.json())
        .then(monsters => renderMonsters(monsters))
    }    

    // new form to create a monster on top - name, age, description, create monster button
    function addForm() {
        const createForm = document.getElementById('create-monster')
        createForm.innerHTML = `
            <form>
            <input type="text" id="monster-name" placeholder = "Name...">
            <input type="text" id="monster-age" placeholder = "Age...">
            <input type="text" id="monster-description" placeholder = "Description...">
            <input type="submit" id="monster-submit" value="Create Monster">
            </form>`
        const formElement = createForm.childNodes[1]
        formElement.addEventListener('submit', function(e){
            e.preventDefault()

            const newName = document.getElementById('monster-name').value
            const newAge = document.getElementById('monster-age').value
            const newDesc = document.getElementById('monster-description').value

            const data = {
                name: newName,
                age: newAge,
                description: newDesc
            }

            const configObj = {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            }

            fetch(baseUrl, configObj)
            .then(resp => resp.json())
            .then(monster => renderMonster(monster))

            document.getElementById('monster-name').value = ''
            document.getElementById('monster-age').value = ''
            document.getElementById('monster-description').value = ''
        })
    }

    addForm()
    fetchMonsters(`${baseUrlLimitandPage}${page}`)

    document.addEventListener('click', function(e){
        if (e.target.id === "forward"){
            page = page + 1;
            fetchMonsters(`${baseUrlLimitandPage}${page}`)
        } else if (e.target.id === 'back'){
            page = page - 1;
            const removeArray = Array.from(monsters.childNodes).slice(Math.max(monsters.childNodes.length - 50, 0))
            removeArray.forEach(monsterNode => monsterNode.remove())
            console.log("done")
        }
    })
})

