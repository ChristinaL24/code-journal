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
  /*                           */

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
  /* When you are logging the tree, use renderEntries([index number here])] to
  ensure that the dom tree has printed correctly in the log */
}

var $unorderedList = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var journalEntries = renderEntries(data.entries[i]);
    $unorderedList.appendChild(journalEntries);
  }
});

var $formView = document.querySelector('.hidden');
var $entriesView = document.querySelector('.new-entry');
var $navEntries = document.querySelector('.nav-entries');
var $entries = document.querySelector('.view');

$entriesView.addEventListener('click', function (event) {

  $formView.className = 'view';
  $entries.className = 'hidden';

});

$navEntries.addEventListener('click', function (event) {
  $formView.className = 'hidden';
  $entries.className = 'view';
});
