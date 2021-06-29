// WHAT DOES THIS DO?

// Open up a list of locations in AMT under Tools > Location Search. This will quickly save that list into local storage, for use with the filter_by_availability.js tool.

function learnLocations() {
    var locList = document.querySelector("#locationResults").children[1].children;
    var i = 0;
    while (i < locList.length) {
        var locNumber = locList[i].children[1].innerText;
        var locCityState = locList[i].children[6].innerText;
        console.log("Storing: " + locNumber + ", " + locCityState);
        localStorage.setItem(locNumber, locCityState);
        i++;
    }
}

learnLocations();