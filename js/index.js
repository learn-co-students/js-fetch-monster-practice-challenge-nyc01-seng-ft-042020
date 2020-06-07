document.addEventListener('DOMContentLoaded', e => {
  renderForm();
  getNextPage(0);
});
const renderForm = () => {
  const container = document.querySelector('#create-monster');
  const form = document.createElement('form');

  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('name', 'name');
  nameInput.setAttribute('placeholder', 'Name');

  const ageInput = document.createElement('input');
  ageInput.setAttribute('type', 'text');
  ageInput.setAttribute('name', 'age');
  ageInput.setAttribute('placeholder', 'Age');

  const descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('type', 'text');
  descriptionInput.setAttribute('name', 'description');
  descriptionInput.setAttribute('placeholder', 'Description');

  const submit = document.createElement('input');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('value', 'submit');
  form.append(nameInput);
  form.append(ageInput);
  form.append(descriptionInput);
  form.append(submit);
  container.append(form);
};
const getNextPage = initial => {
  fetch('http://localhost:3000/monsters')
    .then(resp => resp.json())
    .then(data => {
      const oldPage = document.querySelector('#page');
      if (data[initial]) {
        if (oldPage) {
          oldPage.remove();
        }
        const container = document.querySelector('#monster-container');
        const page = document.createElement('div');
        page.id = 'page';
        container.append(page);
        for (let i = 0; i < 50; i += 1) {
          const position = initial + i;

          const div = document.createElement('div');
          const h2 = document.createElement('h2');
          const h4 = document.createElement('h4');
          const p = document.createElement('p');

          div.id = 'monster';
          div.setAttribute('data-id', data[position].id);
          h2.textContent = data[position].name;
          h4.textContent = data[position].age;
          p.textContent = data[position].description;
          div.append(h2);
          div.append(h4);
          div.append(p);
          page.append(div);
        }
      }
    });
};

const createMonster = (name, age, description) => {
  const data = { name, age, description };
  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
};
document.addEventListener('click', e => {
  if (e.target.id === 'forward') {
    const page = document.querySelector('#page');
    const pageChildren = page.children;
    const initial = parseInt(
      pageChildren[pageChildren.length - 1].getAttribute('data-id')
    );
    getNextPage(initial);
  } else if (e.target.id === 'back') {
    const page = document.querySelector('#page');
    const pageChildren = page.children;
    const initial = parseInt(pageChildren[0].getAttribute('data-id')) - 51;
    getNextPage(initial);
  } else if (e.target.type === 'submit') {
    e.preventDefault();
    const form = e.target.parentNode;
    const { name } = form;
    const { age } = form;
    const { description } = form;
    createMonster(name.value, age.value, description.value);
  }
});
