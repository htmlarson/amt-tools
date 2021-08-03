// This is a "service" that can be run in the background. It will add location information to items in the list of locations, including whether or not the location is outside of your current reservation area. 

function cityStateService() {
    
    if (document.querySelector("#EntityDropDown")) {
        var locList = document.querySelector("#EntityDropDown").options;
        var i = 0;
        while (i < locList.length) {
            if (locList[i].classList.contains("red")) {
                locList.remove(i);
                continue;
            }
            if (!locList[i].classList.contains("cityState")) {
                if (parseInt(localStorage.getItem(locList[i].value + "MCO")) !== parseInt(document.querySelector("#mcoTitle").innerText.substr(4, 3))) {
                    locList[i].classList.add("outMCO");
                    locList[i].innerText = "^" + locList[i].innerText;
                }
                locList[i].innerText += typeof localStorage.getItem(locList[i].value) !== 'undefined' && localStorage.getItem(locList[i].value) !== null ? ": " + localStorage.getItem(locList[i].value) : "?";
                locList[i].classList.add("cityState");
            }
            i++;
        }
    }
}
window.setInterval(()=>{
    cityStateService();
}
, 500);
