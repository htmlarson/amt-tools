// This is a "service" that can be run in the background. This is useful for running pending agreements. It will open the scheduling log so that you can have more context when scheduling reservations. 

function autoOpenESL(intv) {
    if (sessionStorage.stop == true) {
        console.log("Could not start; sessionStorage brake switch flipped");
        clearInterval(intv);
        return false;
    } else {
        if (document.querySelectorAll("#ReservationSummaryTab > div:nth-child(2) > div:nth-child(1) > dl > dd:nth-child(2)").length < 1 || parseInt(document.querySelector("#ReservationSummaryTab > div:nth-child(2) > div:nth-child(1) > dl > dd:nth-child(2)").innerText) == parseInt(sessionStorage.resNumber)) {
            return false;
        }
        if (document.querySelectorAll("#EntityDropDown").length < 1 && document.querySelectorAll(".seseme").length < 1) {
            try {
                document.querySelector("#RSScheduleLog").click();
                document.querySelector("#RSScheduleLog").classList.add('seseme');
                document.querySelector("#ReservationSummaryTab > div:nth-child(2) > div:nth-child(1) > dl > dd:nth-child(8)").innerText = "91" + document.querySelector("#ReservationSummaryTab > div:nth-child(2) > div:nth-child(1) > dl > dd:nth-child(8)").innerText;
                sessionStorage.resNumber = parseInt(document.querySelector("#ReservationSummaryTab > div:nth-child(2) > div:nth-child(1) > dl > dd:nth-child(2)").innerText);
            } catch (e) {
                console.log("Not able to click the button");
            }
        }
    }
}

/* function interpretITOW() {
    if (document.querySelectorAll("#notesTextBox").length > 0) {

        try {
            if (document.querySelector("#notesTextBox").value.substr(0,2) == "IT" && 
                document.querySelector("#reservationEquipmentList").children[0].children[5].children[0].click();
        }
        catch (e) {

        }
    }
} */
sessionStorage.resNumber = 0;
var intv = setInterval((intv)=>{autoOpenESL()}, 100);