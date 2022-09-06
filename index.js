//im not sure, but in these days no one looks eager to use ; so i did not change the code but ill learn asap and letyall know
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
//in here im parsing my string (which i got from localstorage like local database from my leads array)
//thanks to that i can assing value to my leadsFrom..... array otherwise that would just be a string and
//that is not something i dont want it to be
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

// i learned that new term truly falsly
//if leadsFromLocalStorage is not null or not defined or not empty than inside of that if is equal to true
if (leadsFromLocalStorage) {
    //if we already got something in array and assigned that to leadsFromLocalStorage 
    //than we can assign that to our key value "myleads" and inside of render function we can store that data into myLeads
    //so that  no data loss will hapen
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    //to use chrome api we need to add this query at the below
    //active prop has tobe true and also currentWindow does
    //getting current tab to url also dont forget to add permissions to the tab in manifest.json

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        //with json.string we can format myArray to string cuz to use local storage which has to be used with
        //string we need to stringfy -make string  to our array first
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        //there i have used template string format at below the reason i use this to get rid off all that " - ' and etc.
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    //with double click event delete the local storage and also all other arrays 
    //and send that empty array to render func so that func can output the empty-array
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})