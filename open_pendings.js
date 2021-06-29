// WHAT DOES THIS DO?
// For pending agreements, this snippet will monitor for a newly opened contract and open open the associated ESL. You can run it on a Windows computer by pressing CTRL + Enter.

// NOTE: You only have to initiate this *once*. It will continue to run.

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
sessionStorage.resNumber = 0;
var intv = setInterval((intv)=>{autoOpenESL()}, 1000);