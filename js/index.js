document.addEventListener('DOMContentLoaded', () => {
  
  function postTheShit(nameValue, ageValue, descriptionValue) {
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: nameValue,
        age: ageValue,
        description: descriptionValue
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("I'm happy");
      });
  }

  createMonsterForm();

  function createMonsterForm() {
    const createMonster = document.getElementById('create-monster');
    const form = document.createElement('form');
    const input1 = document.createElement('input')
    const input2 = document.createElement('input');
    const input3 = document.createElement('input');
    const button = document.createElement('button');

    input1.id = 'name';
    input1.placeholder = 'name...';
    input2.id = 'age';
    input2.placeholder ='age...';
    input3.id = 'description';
    input3.placeholder = 'description...';
    button.id = 'create';
    button.textContent = 'Create';

    form.append(input1, input2, input3, button);
    createMonster.append(form);

    const createButton = document.getElementById('create');
    console.log(createButton);
    createButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(e);
      let nameValue = e.target.parentNode[0].value;
      let ageValue = e.target.parentNode[1].value;
      let descriptionValue = e.target.parentNode[2].value;
      console.log('name:', nameValue);
      console.log('age:', ageValue);
      console.log('description:', descriptionValue);
      postTheShit(nameValue, ageValue, descriptionValue);
      form.reset();
    })
  }
  
  let pageNumber = 1;

  function buttonPress() {
    const backButton = document.getElementById('back');
    const forwardButton = document.getElementById('forward');
    forwardButton.addEventListener('click', () => {
      pageNumber += 1;
      refreshPage(50, pageNumber);
      console.log(pageNumber);
    })
    backButton.addEventListener('click', () => {
      pageNumber -= 1;
      refreshPage(50, pageNumber);
      console.log(pageNumber);
    })
  }

  refreshPage(50, pageNumber);

  function refreshPage(limit, pgNumber) {
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${pgNumber}`)
    .then(response => response.json())
    .then(data => {

      buttonPress();

      const monsterContainer = document.getElementById('monster-container');
      let monsterDiv = document.createElement('div');

      data.forEach(monster => {
        const div = document.createElement('div');
        let h2 = document.createElement('h2');
        let h4 = document.createElement('h4');
        let p = document.createElement('p');
        h2.textContent = monster.name;
        h4.textContent = monster.age;
        p.textContent = monster.description;
        div.append(h2, h4, p);
        monsterDiv.append(div);
      });
      // monsterDiv.id = 'monster-container';
      monsterContainer.replaceWith(monsterDiv);
      monsterDiv.id = 'monster-container';
    }) 
  }

})

// get the button elements
// click on the buttons to move through the API array

// when the button is clicked, the input fields should be added to the list and saved to the API


// Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.
// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.