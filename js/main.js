/* global data */
/* exported data */

var $img = document.querySelector('img');
var $inputs = document.querySelector('#photo-url');

$inputs.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

var $form = document.querySelector('.form');
$form.addEventListener('submit', function (event) {

  event.preventDefault();

  var newEntry = {
    title: $form.elements.title.value,
    url: $form.elements.url.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;

  data.entries.unshift(newEntry);

  $img.setAttribute('src', '../code-journal/images/placeholder-image-square.jpg');

  $form.reset();

  /* prepending in feature two */
  var $entry = renderEntries(newEntry);
  $unorderedList.prepend($entry);

  /* Place our function viewEntries in this function so that when we save and submit,
  it takes us back to the entries page */
  viewEntries();

});

/* Refer to the image that is given in instructions create this dom tree;
Create a list element to hold our items, include our row, put two half-columns;
In our first div with column-half, put the img; in the other half put the title
and the notes; For the title, use a heading element; for the notes, use a
paragraph element */

function renderEntries(entry) {

  var entryList = document.createElement('li');

  var divOne = document.createElement('div');
  divOne.setAttribute('class', 'row');
  entryList.appendChild(divOne);

  var divTwo = document.createElement('div');
  divTwo.setAttribute('class', 'column-half');
  divOne.appendChild(divTwo);

  var imageElement = document.createElement('img');
  imageElement.setAttribute('src', entry.url);
  divTwo.appendChild(imageElement);

  var divThree = document.createElement('div');
  divThree.setAttribute('class', 'column-half');
  divOne.appendChild(divThree);

  var titleHeader = document.createElement('h2');
  titleHeader.textContent = entry.title;
  divThree.appendChild(titleHeader);

  var notesParagraph = document.createElement('p');
  notesParagraph.textContent = entry.notes;
  divThree.appendChild(notesParagraph);

  return entryList;
  /* When you are logging the tree, use renderEntries(data.entries[index number]) to
  ensure that the dom tree has printed correctly in the log */
}

var $unorderedList = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var journalEntries = renderEntries(data.entries[i]);
    $unorderedList.appendChild(journalEntries);
  }
  noEntries();
});

/* Codes that handle viewswapping */
var $formView = document.querySelector('.hidden');
var $createEntries = document.querySelector('.new-entry');
var $navEntries = document.querySelector('.nav-entries');
var $entries = document.querySelector('.view');
var $saveButton = document.querySelector('.save');

/* this function will be called when we create a condition for the refresh condition */
$createEntries.addEventListener('click', createNewEntries);
function createNewEntries(event) {
  $formView.className = 'view';
  $entries.className = 'hidden';
  data.view = 'entry-form';
}

/* this function will also be called in our condition for the refresh condition */
$navEntries.addEventListener('click', showEntries);
function showEntries(event) {
  $formView.className = 'hidden';
  $entries.className = 'view';
  data.view = 'entries';
  noEntries();
}

$saveButton.addEventListener('submit', viewEntries);
function viewEntries(event) {
  $formView.className = 'hidden';
  $entries.className = 'view';
  data.view = 'entries';
  noEntries();
}

/* function for no entries */
/* Make sure you put these in any functions that will display an empty
entries page */
var $p = document.querySelector('p');
function noEntries() {
  if (data.entries.length === 0) {
    $p.className = 'text-center no-entries';
  } else {
    $p.className = 'text-center no-entries hidden';
  }
}

/* condition for refresh */
/* call createNewEntries and showEntries here */
if (data.view === 'entry-form') {
  createNewEntries();
} else if (data.view === 'entries') {
  showEntries();
}
