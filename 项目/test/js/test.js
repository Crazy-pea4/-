// let subNav = document.querySelector('.subNav');
// let lis_hovered = document.querySelector('.floor2').querySelectorAll('li')
// subNav.addEventListener('mouseenter', () => {
//     for (let i = 0; i < lis_hovered.length; i++) {
//         lis_hovered[i].style.display = 'block'
//     }
// });
// subNav.addEventListener('mouseleave', () => {
//     for (let i = 0; i < lis_hovered.length; i++) {
//         lis_hovered[i].style.display = 'none'
//     }
// })

let floor2 = document.querySelector('.floor2');
let subNav = floor2.parentNode;
console.log(subNav);
let lis_hovered = document.querySelector('.floor2').querySelectorAll('li')
subNav.addEventListener('mouseenter', () => {
    for (let i = 0; i < lis_hovered.length; i++) {
        lis_hovered[i].style.display = 'block'
    }
});
subNav.addEventListener('mouseleave', () => {
    for (let i = 0; i < lis_hovered.length; i++) {
        lis_hovered[i].style.display = 'none'
    }
})