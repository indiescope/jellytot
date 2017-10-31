function saveRows() {
  var rows = document.getElementsByTagName('tr');
  var items = [];

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    var colour = row.getElementsByClassName('colour')[0].value;
    var regex = row.getElementsByClassName('regex')[0].value;

    items.push({
      colour: colour,
      regex: regex
    });
  }

  chrome.storage.sync.set({
    items: items
  }, function() {
    console.log('saved');
  });
}

function loadRows() {
  chrome.storage.sync.get('items', function(data) {
    for (var i = 0; i < data.items.length; i++) {
      var item = data.items[i];
      loadRow(item.colour, item.regex);
    }
  });
}

function loadRow(colour, regex) {
  appendRow(createRow(colour, regex));
}

function createRow(colour, regex) {
  var row = document.createElement('tr');
  
  var col = document.createElement('td');
  var col2 = document.createElement('td'); 
  var col3 = document.createElement('td'); 

  var inputColour = document.createElement('input');
  inputColour.classList.add('colour');
  inputColour.placeholder = 'Colour';
  inputColour.required = true;

  if (colour !== undefined) {
    inputColour.value = colour;
  }

  col.appendChild(inputColour);

  var inputRegex = document.createElement('input');
  inputRegex.classList.add('regex');
  inputRegex.placeholder = 'Regex';
  inputRegex.required = true;

  if (regex !== undefined) {
    inputRegex.value = regex;
  }

  col2.appendChild(inputRegex);

  var buttonRemove = document.createElement('button');
  buttonRemove.innerText = 'Remove';
  buttonRemove.addEventListener('click', function(e) { 
    e.target.parentElement.parentElement.remove(); 
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

document.addEventListener('DOMContentLoaded', function(e) {
  document.getElementById('js-add').addEventListener('click', addRow);
  document.getElementById('js-save').addEventListener('click', saveRows);

  loadRows();
});