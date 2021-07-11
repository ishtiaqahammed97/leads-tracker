// Lead Tracker
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        //had to add permission for chrome extension in the manifest.json file
    })
})
// One. Wrap the code below in a renderLeads() function
function render(leads) {
    // 1. create a variable, listItems, to hold all the HTML for the list items
    // Assign it to an empty array string to begin with
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // 2. Add the item to the listItems variable instead of the ulEl.innerHTML


        // wrap the lead in an anchor tag <a> inside the <li>
        // make the link open in a new tab
        listItems += `
        <li>
              <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
              </a>
        </li>
        `
        //  create element
        //  set text content
        //  append to ul
        //    const list = document.createElement("li")
        //    list.textContent = myLeads[i]
        //    ulEl.append(list)
    }
    // 3. Render the listItems inside the unordered list using ulEl.innerHTML
    ulEl.innerHTML = listItems
}

// when clicked, clear localStorage, myLeads and DOM
deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    // Two. Call the renderLeads() function

    // now clear out the input field
    inputEl.value = ""

    // save the myLeads array to localStorage
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})