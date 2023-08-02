// darkmode storage + switch selectors
const darkMode = localStorage.getItem('darkMode');
const darkmodeSwitch = document.getElementById("darkmode-switch");

darkmodeSwitch.addEventListener("click",handleDarkmode);
// icons next to darkmode button
const moon = document.querySelector(".moon");
const sun = document.querySelector(".sun");

// if darkmode is enabled it will rememember it on page refresh
// also checks switch button so it fits the enable side
if(darkMode === "enabled"){
    enableDarkMode()
    darkmodeSwitch.checked = true
}
// enables darkmode or disables it
function handleDarkmode(){
    // updates localstorage on click
    let darkMode = localStorage.getItem('darkMode');
    if(darkMode !== "enabled"){
        enableDarkMode()  
    }else{
        disableDarkMode()
    }
}

// disables darkmode and gives color to sun
function disableDarkMode() {
    sun.style.fill = "#FDB813"
    moon.style.fill = "#fff"
    document.body.classList.remove("toggle-darkmode");
    localStorage.setItem("darkMode", "disabled")
    console.log(darkMode)
}
// enables darkmode and gives color to moon
function enableDarkMode () {
    moon.style.fill = "#FDB813"
    sun.style.fill = "#fff"
    document.body.classList.add("toggle-darkmode");
    localStorage.setItem("darkMode", "enabled");
    console.log(darkMode)
}
