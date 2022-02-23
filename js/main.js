/* global data */
/* exported data */

var $img = document.querySelector('img');
var $photoInputs = document.querySelector('#photo-url');

$photoInputs.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

var $form = document.querySelector('.form');
$form.addEventListener('submit', function (event) {

  event.preventDefault();
  /* null = absence of object value; therefore 'if' data.editing === null, we want
   it to have the original values that are inputted */
  if (data.editing === null) {
    var entryObject = {
      title: $form.elements.title.value,
      url: $form.elements.url.value,
      notes: $form.elements.notes.value,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(entryObject);
    var $entry = renderEntries(entryObject);
    $entryList.prepend($entry);
  /* if data.editing !== null, set the value of entryId to data.editing since we
   want the values to be updated with the correct entryId */
  } else {
    var editEntryValues = {
      title: $form.elements.title.value,
      url: $form.elements.url.value,
      notes: $form.elements.notes.value,
      entryId: data.editing
    };
    /* Create a loop that iterates over the properties of the data.entries object;
    if the property entry id's match, assign the value of editEntryValues to data.entry[j] */
    for (var j = 0; j < data.entries.length; j++) {
      if (editEntryValues.entryId === data.entries[j].entryId) {
        data.entries[j] = editEntryValues;
      }
    }
    /* Query the dom for all 'li' elements; Use parseInt to get the data-entry-id;
    if entryId is strictly equal to the parseInt of our dom variable, use replace method
    that is mentioned in the hint */
    var $domEntriesList = document.querySelectorAll('li');
    for (var k = 0; k < $domEntriesList.length; k++) {
      if (editEntryValues.entryId === parseInt($domEntriesList[k].getAttribute('data-entry-id'))) {
        $domEntriesList[k].replaceWith(renderEntries(editEntryValues));
      }
    }
  }
  data.editing = null;
  $img.setAttribute('src', '../code-journal/images/placeholder-image-square.jpg');
  $form.reset();
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
  titleHeader.setAttribute('class', 'entry-name');
  titleHeader.textContent = entry.title;
  divThree.appendChild(titleHeader);

  var editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fa-solid fa-pen fa-xs float-right padding-top');
  titleHeader.appendChild(editIcon);

  var notesParagraph = document.createElement('p');
  notesParagraph.textContent = entry.notes;
  divThree.appendChild(notesParagraph);

  /* Use setAttribute method on entryList to give each rendered entries an id */
  entryList.setAttribute('data-entry-id', entry.entryId);

  /* When you are logging the tree, use renderEntries(data.entries[index number]) to
  ensure that the dom tree has printed correctly in the log */
  return entryList;

}

/* This variable represents the <ul> in our html; it is also parent element on
all rendered entries */
var $entryList = document.querySelector('.entry-list');

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var journalEntries = renderEntries(data.entries[i]);
    $entryList.appendChild(journalEntries);
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
  $deleteButton.className = 'delete-entry-div hidden';
}

/* this function will also be called in our condition for the refresh condition */
$navEntries.addEventListener('click', showEntries);
function showEntries(event) {
  $formView.className = 'hidden';
  $entries.className = 'view';
  data.view = 'entries';
  noEntries();
}

/* this function occurs after the submit is hit; it takes us back to the entries
page */
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

/* addEventListener for parent element (<ul> element) for all rendered entries */
/* Tried using element.target.matches but could not get it to work */
/* Note: element.tagName returns a capitalized tag name */
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
$entryList.addEventListener('click', editIconClickedFunction);
function editIconClickedFunction(event) {
  if (event.target.tagName === 'I') {
    /* use event.target.closest to target the list that you are clicking on - this will
    display the correct data entry id on your console */
    /* parseInt = Use this to convert our data-entry-id into an integer */
    var getEntryItem = event.target.closest('li');
    var getEntryObjectId = parseInt(getEntryItem.getAttribute('data-entry-id'));
    data.editing = getEntryObjectId;
    for (var i = 0; i < data.entries.length; i++) {
      if (getEntryObjectId === data.entries[i].entryId) {
        $title.value = data.entries[i].title;
        $photoInputs.value = data.entries[i].url;
        $img.setAttribute('src', $photoInputs.value);
        $notes.value = data.entries[i].notes;
        createNewEntries();
        $deleteButton.className = 'delete-entry-div';
      }
    }
  }
}

/* Feature 4: delete button */
/* Change the className of this variable and put it in designated functions */
var $deleteButton = document.querySelector('.delete-entry-div');
var $modal = document.querySelector('.modal');
var $cancel = document.querySelector('.cancel');
var $confirm = document.querySelector('.confirm');

$deleteButton.addEventListener('click', function (event) {
  $modal.style.display = 'flex';
});

$cancel.addEventListener('click', function (event) {
  $modal.style.display = 'none';
});

/* code for delete confirmation */

$confirm.addEventListener('click', confirmFunction);
function confirmFunction(event) {

  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing === data.entries[i].entryId) {
      data.entries.splice(i, 1);

    }
  }
  var $domEntriesList = document.querySelectorAll('li');
  for (var j = 0; j < $domEntriesList.length; j++) {
    if (data.editing === parseInt($domEntriesList[j].getAttribute('data-entry-id'))) {
      $domEntriesList[j].remove();
    }
  }
  showEntries();
  $modal.style.display = 'none';
}

/* condition for refresh */
/* call createNewEntries and showEntries here */
if (data.view === 'entry-form') {
  createNewEntries();
  $deleteButton.className = 'delete-entry-div hidden';
} else if (data.view === 'entries') {
  showEntries();
}
