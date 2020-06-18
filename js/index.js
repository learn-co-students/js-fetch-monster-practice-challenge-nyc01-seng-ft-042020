console.log('hello')
document.addEventListener("DOMContentLoaded", function(e){
   const monstersURL = "http://localhost:3000/monsters"
   const monsterUl = document.getElementById('monster-container')
   let count = 0

   function createMonster(monsterObj){
    const monsterDiv = document.createElement('div')
    monsterDiv.className = 'Monster'
    monsterDiv.dataset.id = monsterObj.id

    monsterDiv.innerHTML = `
        <h2>Name: ${monsterObj.name}</h2>
        <h4>Age: ${monsterObj.age}</h4>
        <p>Bio: ${monsterObj.description}</p>
    `
    monsterUl.append(monsterDiv)
   }

   fetch(monstersURL)
   .then(response => response.json())
   .then(data => data.forEach(monsterObj => {
       count += 1

       if(count<=50) {
        createMonster(monsterObj)
       }

   }))

   const form = document.getElementById('create-monster')
    form.innerHTML = `
        <label>Name: </label>
        <input style="text" name="name">
        <label>Age: </label>
        <input style="text" name="age">
        <label>Bio: </label>
        <input style="text" name="description">
        <input type="submit" value="Create">
    `

    document.addEventListener('submit', function(e){
        e.preventDefault()

        const form = e.target

        const name = form.name.value
        const age = form.age.value
        const bio = form.description.value

        const monsterObj = {
            name: name,
            age: age,
            description: bio
        }

        fetch(monstersURL, {
            method: "POST",
            headers: {
                "content-type" : "application/json",
                "accept" : "application/json"
            },

            body: JSON.stringify(monsterObj)
        })
            .then(response => response.json())
            .then(console.log(monsterObj))
            .then(json => createMonster(json))
    })
})