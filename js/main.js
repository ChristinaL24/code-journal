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

  var newEntry = {};
  newEntry.title = $form.elements.title.value;
  newEntry.url = $form.elements.url.value;
  newEntry.notes = $form.elements.notes.value;

  newEntry.entryId = data.nextEntryId;

  data.nextEntryId++;

  data.entries.unshift(newEntry);

  $img.setAttribute('src', '../code-journal/images/placeholder-image-square.jpg');

  $form.reset();

});

var previousEntries = localStorage.getItem('javascript-local-storage');

if (previousEntries !== null) {
  data.entries = JSON.parse(previousEntries);
}

window.addEventListener('beforeunload', function (event) {
  var newEntryJSON = JSON.stringify(data.entries);
  localStorage.setItem('javascript-local-storage', newEntryJSON);
});
