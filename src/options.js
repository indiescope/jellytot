function saveRows() {
  const rows = document.getElementsByTagName('tr');
  const items = [];

  for (const row of rows) {
    const colour = row.getElementsByClassName('colour')[0].value;
    const regex = row.getElementsByClassName('regex')[0].value;

    items.push({
      colour: colour,
      regex: regex
    });
  }

  chrome.storage.sync.set({
    items: items
  }, () => {
    console.log('saved');
  });
}

function loadRows() {
  chrome.storage.sync.get('items', ({items}) => {
    for (const item of items) {
      loadRow(item.colour, item.regex);
    }
  });
}

function loadRow(colour, regex) {
  appendRow(createRow(colour, regex));
}

function createRow(colour, regex) {
  const row = document.createElement('tr');
  
  const col = document.createElement('td');
  const col2 = document.createElement('td'); 
  const col3 = document.createElement('td'); 

  const inputColour = document.createElement('input');
  inputColour.classList.add('colour');
  inputColour.placeholder = 'Colour';
  inputColour.required = true;

  if (colour !== undefined) {
    inputColour.value = colour;
  }

  col.appendChild(inputColour);

  const inputRegex = document.createElement('input');
  inputRegex.classList.add('regex');
  inputRegex.placeholder = 'Regex';
  inputRegex.required = true;

  if (regex !== undefined) {
    inputRegex.value = regex;
  }

  col2.appendChild(inputRegex);

  const buttonRemove = document.createElement('button');
  buttonRemove.innerText = 'Remove';
  buttonRemove.addEventListener('click', ({target}) => { 
    target.parentElement.parentElement.remove(); 
  });
  
  col3.appendChild(buttonRemove);

  row.appendChild(col);
  row.appendChild(col2);
  row.appendChild(col3);

  return row;
}

function addRow() {
  appendRow(createRow());
}

function appendRow(row) {
  document.getElementById('js-container').appendChild(row);
}

document.addEventListener('DOMContentLoaded', e => {
  document.getElementById('js-add').addEventListener('click', addRow);
  document.getElementById('js-save').addEventListener('click', saveRows);

  loadRows();
});