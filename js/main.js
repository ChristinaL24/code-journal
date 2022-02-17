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

  /* prepending in feature two */
  var $entry = renderEntries(newEntry);
  $unorderedList.prepend($entry);
  /*                  */

  $form.reset();

});

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
  var titleHeaderText = titleHeader.createTextNode(entry.title);
  titleHeader.appendChild(titleHeaderText);
  divThree.appendChild(titleHeader);

  var notesParagraph = document.createElement('p');
  var notesParagraphText = document.createTextNode(entry.notes);
  notesParagraph.appendChild(notesParagraphText);
  divThree.appendChild(notesParagraph);

  return entryList;

}

var $unorderedList = document.querySelector('ul');
