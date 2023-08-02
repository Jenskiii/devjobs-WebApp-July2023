// filter button for mobile
const filterButton = document.querySelector(".button-filter");
const overlay = document.querySelector(".overlay");
const mobileNav = document.querySelector(".mobile__wrapper");
filterButton.addEventListener("click", handleFilterButton);
overlay.addEventListener("click", removeMobileNav);

function handleFilterButton(){
    mobileNav.classList.toggle("active")
    overlay.classList.toggle("active")
}

function removeMobileNav(){
    mobileNav.classList.remove("active")
    overlay.classList.remove("active")
}