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

  var inputValues = {};
  inputValues.title = $form.elements.name.value;
  inputValues.url = $form.elements.name.value;
  inputValues.notes = $form.elements.name.value;

});
