// WHAT DOES THIS DO? 
// For covering reservation, this snippet aims to quickly find the closest available location with the selected equipment. 

/* FAQ:

Q: How do I have the city/state of the locations automatically show up?
A: As you use this tool, it will locally save the city/state of the locations found. If you'd like to save the locations for, say, an entire MCO, see the other snippet: quick_learn_locations.js

Q: I see a text field with a number in it appear. What does this do? 
A: The first time you run this snippet for a contract, it will add this text field. This is a "place keeper" of sorts; it relates to the location number that you're requesting. For example, if Web AMT shows a location has a trailer available but it won't be until later in the day, you might want to move on. You can do this by running the tool again, which will automatically increment the counter and do the same thing for the next location.

Q: Do I have to do this every time I want to search for a location? 
A: Yes. 

*/

sessionStorage.mode = 1;
if (document.querySelector("#recentMode")) {
    sessionStorage.mode = parseInt(document.querySelector("#recentMode").value) + 1;
}

function searchList() {
    var locList = document.querySelector("#EntityDropDown").options;
    var i = 0;
    while (i < locList.length) {
        if (locList[i].className !== "green") {
            locList.remove(i);
        } else {
            console.log(locList.value);
            locList[i].innerText += typeof localStorage.getItem(locList[i].value) !== 'undefined' && localStorage.getItem(locList[i].value) !== null ? " " + localStorage.getItem(locList[i].value) : "";
            i++;
        }
    }
    if (locList.length < sessionStorage.mode) {
        refineSearchArea();
    } else {
        handleList(locList);
    }
}

function handleList(locList) {
    sessionStorage.counter = 0;
    try {
        sessionStorage.beforeAlink = document.querySelector("#RSScheduleLog").getAttribute('onclick');
    }
    catch (e) {
        window.alert("Error getting scheduling link");
        return false;
    }
    locList.selectedIndex = sessionStorage.mode - 1;
    UpdateMapAllEntityLocation('fromSelectList');
    var repeatable = setInterval(()=>{
        try {
            var newALink = document.querySelector("#RSScheduleLog").getAttribute('onclick');
        } catch (e) {
            console.log("Not ready");
            return false;
        }
        if (sessionStorage.beforeAlink !== newALink) {
            setTimeout(()=>{
                document.querySelector("#RSScheduleLog").click();
                var addressDetail = document.querySelector("#mapLocationDetails > div.row > div:nth-child(2) > dl > dd.nowrap").innerHTML.split("<br>");
                localStorage.setItem(document.querySelector("#EntityDropDown").value, addressDetail[addressDetail.length - 1].trim());
                }, 100);
            clearInterval(repeatable);
        } else {
            sessionStorage.counter++;
            if (sessionStorage.counter > 9) {
                document.querySelector("#RSScheduleLog").click();
                clearInterval(repeatable);
            }
        }
    }
    , 1000);

}

function refineSearchArea() {
    if (parseInt(document.querySelector("#userInputRadius").value) === 300) {
        window.alert("None found.");
        document.querySelector("#userInputRadius").options.selectedIndex = 8;
        UpdateMapAllEntityLocation('fromSelectList');
        return false;
    }

    var intv = setInterval(()=>{
        sessionStorage.counter = 0;
        if (document.querySelectorAll("#loadingDiv")[0].style.display == "none") {
            document.querySelector("#userInputRadius").options.selectedIndex = document.querySelector("#userInputRadius").options.selectedIndex > 8 ? 3 : document.querySelector("#userInputRadius").options.selectedIndex + 1;
            document.querySelector("#userInputRadius_chosen > a > span").innerText = document.querySelector("#userInputRadius").value;
            MultipleMapRadiusChanged();
            
            var beforeNext = setInterval(()=>{
                sessionStorage.counter++;
                if (document.querySelectorAll("#loadingDiv")[0].style.display == "none") {
                    searchList();
                    clearInterval(beforeNext);
                }
            }
            , 1000);
            clearInterval(intv);
        }

    }
    , 500);
}

function setRecentMode() {
    if (document.querySelector("#recentMode") == null) {
        var ele = document.createElement("input");
        ele.id = "recentMode";
        ele.hidden = false;
        document.querySelector("#searchBoxContainer").append(ele);
    }

    document.querySelector("#recentMode").value = sessionStorage.mode;
}
function frostSelector() {
    document.querySelector("#EntityDropDown").disabled = "disabled";
}
// frostSelector();
searchList();
setRecentMode();
sessionStorage.resNumber = 0;