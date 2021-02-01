function edit (event) {
    console.log(event);
    $(event.currentTarget).attr('contenteditable','true');
}
function save (event) {
    var target = $(event.currentTarget);
    target.attr('contenteditable','false');
    var storageID = target.parent().data("storageID");
    localStorage.setItem(storageID, target.prev().text());   
}
$(document).ready (function (){
    var day = moment(); 
    var presentHour = day.hour();
    var hourClass = "past"; 
    $("#currentDay").text( day.format('MMMM Do YYYY') );
    for (var hour=9; hour <= 17; hour++){
        var time = moment(day).hour(hour);
        var storageID = time.format("YYYYMMDD/HH");
        if (hour === presentHour) {
            hourClass = "present";
        }
        if (hour > presentHour) {
            hourClass = "future";
        }
        var row=$("<div>").addClass("row").data("storageID", storageID);
        var description = localStorage.getItem(storageID);
        row.append($("<div>").addClass("col").addClass("hour").text( time.format ("ha") ));
        row.append($("<div>").addClass("col-10").addClass(hourClass).text(description).click(edit));
        row.append($("<div>").addClass("col").addClass("saveBtn").html( "<i class='fas fa-save'></i> Save" ).click(save));
        $("#timeBlocks").append( row );
    }
});