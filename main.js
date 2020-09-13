// const hamburger = document.querySelector('.hamburger');
// hamburger.addEventListener('click', function (e) {
//   document.getElementById("menu").className = "menu_fullscreen";
// })

// const croce = document.querySelector ("#menu__croce")
// croce.addEventListener('click', function (e) {
//   document.getElementById("menu").menu.classList.toggle('menu_fullscreen');
// })

const overlay = document.getElementById('menu');
const closeMenu = document.getElementById('menu__croce');
const hamburger = document.querySelector('.hamburger');


document.getElementById('hamburger') .addEventListener('click', function() {
  overlay.classList.add('menu_fullscreen');
});

document.getElementById('menu__croce').addEventListener('click', function(){
  overlay.classList.remove('menu_fullscreen')
})