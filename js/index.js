document.addEventListener("DOMContentLoaded", ()=> {
const url = "http://localhost:3000/monsters";
let page = 1

fetch(url + `/?_limit=${10}` + `&_page=${1}`)
.then(response => response.json())
.then(json => renderMonster(json));

function renderMonster(monsterObj){
monsterObj.forEach(monster => {
    let mDiv = document.createElement('div');
    mDiv.innerHTML = `
    <h1>${monster.name}</h1>
    <p>Age: ${monster.age}</p>
    <h3>Description:</h3>
    <p>${monster.description}</p>
    `
let monstDiv = document.querySelector('#monster-container')
    monstDiv.append(mDiv);
});


}

function forwardsBackwards(){
document.addEventListener('click',(e)=>{
let setTarget = e.target.id
if (setTarget === "forward"){
    fetch(url + `/?_limit=${10}` + `&_page=${page++}`)
.then(response => response.json())
.then(json => renderMonster(json));
}
});
}

forwardsBackwards()

function monstForm(){
let monstForm = document.querySelector('#create-monster')
let mForm = document.createElement('form') 
mForm.innerHTML = `
<label>
Name: <input type="text" id="name" value=""/></label>
            <label>Age: <input type="text" id="age" value=""/></label>
            <label>Description: <input type="text" id="description" value=""/></label>
            <input type="submit" class="submit" id="submit-monster" value="Create New Monster"/>
`
monstForm.append(mForm)

}

monstForm();



function monstPost(){
let submit = document.querySelector('.submit');
let form = document.querySelector('form')
submit.addEventListener('click', (e)=>{
e.preventDefault()
let postObj =  {method: "POST",
headers: {
    "Content-Type":"application/json", 
    "Accept": "application/json"
},
body: JSON.stringify({ name: form.name.value, age: form.age.value, description: form.description.value})
};

fetch(url, postObj)
.then(response => response.json())
.then(json => console.log(json.name))
//RENDER TO DOM
.catch(function(error){
    alert("Error!");
});
});
}

monstPost()

});