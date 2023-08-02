// fills main section with content from storage
const jobPage = document.querySelector(".job-page");
jobPage.innerHTML = localStorage.getItem("pageContent") || "";

// fills footer section with content from storage
const jobFooter = document.querySelector(".company__footer");
jobFooter.innerHTML = localStorage.getItem("pageFooter") || "";