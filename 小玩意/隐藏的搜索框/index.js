let searchBox = document.querySelector('.searchBox')
let input = searchBox.querySelector('input');
let btn = searchBox.querySelector('button');

btn.addEventListener('click', function () {
    input.classList.toggle('input-active');
    searchBox.classList.toggle('searchBox-active');
})