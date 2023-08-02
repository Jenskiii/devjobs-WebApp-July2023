if (document.getElementById('p1') !== null){
// card container + cardtemplate selectors
const cardContainer = document.querySelector(".card__wrapper");
const userCardTemplate = document.querySelector("[data-user-template]");
// stores all cards as object
let users = [];

// filters cards on full time
const searchButton = document.querySelector(".filter-button")
const searchCheckbox = document.querySelector(".checkbox");

// selects location input
const inputLocation = document.querySelector("[data-search-location]");
// selects main input
const mainInput = document.querySelector("[data-search]");

searchButton.addEventListener("click",() =>{
    // search location value + 
    const searchLocation = inputLocation.value.toLowerCase();
    // Full time search value + search
    let fullTimeValue = "";
    // main input value + search
    const mainValue = mainInput.value.toLowerCase()

        users.forEach(user =>{
            
            // if true it will filter full time else it wont
            if(searchCheckbox.checked){
            fullTimeValue = "Full Time".toLowerCase();
            }else{
            fullTimeValue = "";
            }
            // search results for all 3 search options
            const FullTimeJobs = user.contract.toLowerCase().includes(fullTimeValue);
            const jobLocations = user.location.toLowerCase().includes(searchLocation);
            const companyAndPosition = user.position.toLowerCase().includes(mainValue) || user.company.toLowerCase().includes(mainValue);
            // turns alls search values into one
            let allValues = FullTimeJobs && jobLocations && companyAndPosition;
            user.element.classList.toggle("hide", !allValues)
        })     

})
///////
//CARD
/////
//  makes a card for every item and fills data
fetch("./data.json")
.then(res => res.json())
.then(data => {
   users = data.map(user => {
        // selecting html elements
        const card = userCardTemplate.content.cloneNode(true).children[0];
        const logoVar = card.querySelector("[data-logo]");
        const logoBgVar = card.querySelector("[data-logo-wrapper]");
        const postedAtVar = card.querySelector("[data-postedAt]");
        const contractVar = card.querySelector("[data-contract]");
        const positionVar = card.querySelector("[data-position]");
        const companyVar= card.querySelector("[data-company]");
        const locationVar = card.querySelector("[data-location]");

        // assigning values to html
        logoVar.src = user.logo
        logoBgVar.style.backgroundColor = user.logoBackground
        postedAtVar.textContent = user.postedAt
        contractVar.textContent = user.contract
        positionVar.textContent = user.position
        companyVar.textContent = user.company
        locationVar.textContent = user.location

        // this will decrement id by 1 so it will match the index numbers
        let userID = JSON.parse(user.id) - 1;
        //adds a click function to the links and gives them a data id
        positionVar.setAttribute('data-id' , userID);
        // puts event handler on button of each card 
        // see function handleJobClick()
        positionVar.addEventListener("click", handleJobClick)
        // gives each card an id
        card.id = "card"+user.id
        cardContainer.appendChild(card)
        // maps this data into users so it can be accessed later
        return {
                postedAt: user.postedAt,
                contract: user.contract,
                position: user.position,
                company: user.company,
                location: user.location,
                id: user.id,

                element:card}   
                       
    })
})
// value holder for showMoreJobs
let even = 14;
let uneven = 13;
const loadButton = document.querySelector(".load-button");
loadButton.addEventListener("click", showMoreJobs);
// increases even and uneven which are related to id
// then shows the id with the specific number
function showMoreJobs(){
    // increases value by 2 if clicked
    if(even <= 18){
        even += 2;
    }
    if(uneven <= 17){
        uneven += 2;
    }

    // makes 2 cards visible on click 
    // there are 20 id's so this will stop at 20
    document.getElementById(`card${even}`).style.display = "grid";
    document.getElementById(`card${uneven}`).style.display = "grid";
}
// will fill the job page with all the values related to the clicked card
function handleJobClick(e){
    let cardId = e.target.getAttribute("data-id");
    console.log(cardId)
    fetch("./data.json")
    .then(res => res.json())
    .then(data => {
        let pageContent = `
        <section class="company__header border-radius bg-white">
        <div class="company__wrapper flex">
            <div class="company__logo border-radius grid" style="background-color:${data[cardId].logoBackground} ;">
                <img src="../.${data[cardId].logo}" alt="company logo">
            </div>
                
            <div class="company__information--wrapper container flex">
                <div class="company__information flex">
                    <h2 class="fs-600 text-dark-blue">${data[cardId].company}</h2>
                    <p class="fs-400 text-dark-grey">${data[cardId].website}</p>
                </div>
                <a href="${data[cardId].website}" class="button-transparent fs-400 text-violet bg-opacity-violet border-radius bold grid">Company Site</a>
            </div>
                
        </div>
    </section>

    <section class="company__main bg-white border-radius">
        <div class="container flow-medium">
            <div class="company__main--job flex">
                <div class="flow">
                    <p class="fs-400 text-dark-grey"><span data-postedAt class="card__postedAt">${data[cardId].postedAt}</span> . <span data-contract class="card__contract" >${data[cardId].contract}</span></p>
                    <h2 class="fs-500 text-dark-blue bold">${data[cardId].position}</h2>
                    <p class="fs-300 text-violet bold">${data[cardId].location}</p>
                </div>
                <a href="${data[cardId].apply}" class="button fs-400 text-white bg-violet border-radius bold grid">Apply Now</a>
            </div>

            <p class="text-dark-grey fs-400">${data[cardId].description}</p>

            <div class="un-ordered-list flow-medium">
                <h2 class="text-dark-blue fs-500 bold">Requirements</h2>
                <p class="text-dark-grey fs-400">${data[cardId].requirements.content}</p>

                <ul>
                    <li class="text-dark-grey fs-400">${data[cardId].requirements.items[0]}</li>
                    <li class="text-dark-grey fs-400">${data[cardId].requirements.items[1]}</li>
                    <li class="text-dark-grey fs-400">${data[cardId].requirements.items[2]}</li>
                    <li class="text-dark-grey fs-400">${data[cardId].requirements.items[3]}</li>
                </ul>
            </div>

            <div class="ordered-list flow-medium">
                <h2 class="text-dark-blue fs-500 bold">What Will You Do</h2>
                <p class="text-dark-grey fs-400">${data[cardId].role.content}</p>

                <ol>
                    <li value="1" class="text-dark-grey fs-400">${data[cardId].role.items[0]}</li>
                    <li value="2" class="text-dark-grey fs-400">${data[cardId].role.items[1]}</li>
                    <li value="3" class="text-dark-grey fs-400">${data[cardId].role.items[2]}</li>
                    <li value="4" class="text-dark-grey fs-400">${data[cardId].role.items[3]}</li>
                </ol>
            </div>
        </div>

    </section>`
        // fills footer with data from clicked card
        let pageFooter = `
        <div class="company__footer--wrapper flex">
            <div class="hide">
                <h2 class="text-dark-blue fs-500 bold">${data[cardId].position}</h2>
                <p class="text-dark-grey fs-400">So Digital Inc.</p>
            </div>
            <a href="${data[cardId].apply}" class="button fs-400 text-white bg-violet border-radius bold grid">Apply Now</a>
        </div>
        `
        localStorage.setItem("pageContent",pageContent);
        localStorage.setItem("pageFooter",pageFooter);
    })
}
}