/* global data */
/* exported data */
var $img = document.querySelector('img');
var $inputs = document.querySelector('#photo-url');

$inputs.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});
