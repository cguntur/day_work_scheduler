/*
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours of 9am to 5pm
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist

*/


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?

    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    var currentHour = dayjs().hour();
    console.log("Current Hour: " + currentHour);

    var currentTimeBlock = document.getElementById("hour-"+currentHour);

    var timeBlock = document.getElementById("hour-"+currentHour);

    var timeBlockEl = document.getElementsByClassName("time-block");

    var saveButton = document.querySelectorAll(".saveBtn");

    var calendarEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];

    console.log(calendarEvents);

    //Object.entries(calendarEvents).forEach(([key, calendarEventsValue]) => {
    //    console.log("Key: " + key);
    //    Object.entries(calendarEventsValue).forEach(([key, value]) => {
    //        console.log("Key 2: " + key)
    //        console.log("Value: " + value);
    //    });
        
    //});

    Object.entries(calendarEvents).forEach(([key, value]) => {
        console.log(value);
        console.log("Hour: " + value.hour); 
        console.log(value.eventDesc);
    });



    //console.log(timeBlockEl);
    Object.entries(timeBlockEl).forEach(([key, value]) => {
        var timeBlockId = value.id;
        //console.log("Id: " + timeBlockId);
        var timeBlockHour = timeBlockId.substring(7,5);
        //console.log(timeBlockHour);

        if(timeBlockHour > currentHour){
            //console.log("Time Block Hour: " + timeBlockHour + " is greater than " + currentHour);
            value.classList.remove("past");
            value.classList.add("future");
            value.classList.remove("present");
        }else if(timeBlockHour < currentHour){
            //console.log("Time Block Hour: " + timeBlockHour + " is less than " + currentHour);
            value.classList.add("past");
            value.classList.remove("future");
            value.classList.remove("present");
        }else{
            //console.log("Time Block Hour: " + timeBlockHour + " is equal to " + currentHour);
            value.classList.remove("past");
            value.classList.remove("future");
            value.classList.add("present");
        }
    });

    saveButton.forEach(function(button){
        button.addEventListener("click", function(){
            console.log("Parent ID: " + this.parentNode.id);
            var parentId = this.parentNode.id;
            var parentEl = document.querySelector("#"+parentId);
            var parentHour = parentId.substring(7,5);
            console.log("Parent Hour: " + parentHour);
            console.log(parentEl);
            var textAreaEl = parentEl.querySelector('.description');
            var task = textAreaEl.value;
            console.log("Text area content: " + textAreaEl.value);
            var calendarEvent = [];

            var obj = calendarEvents.find(function(entry) { 
                return entry.hour === parentHour; 
            });
            if (obj) {
                obj.value = task;
            } else {
                calendarEvents.push({hour: parentHour, eventDesc: task});
            }
        
            console.log(JSON.stringify(calendarEvents))
            
            localStorage.setItem("calendarEvents", JSON.stringify(calendarEvents));

        });
    });

    
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  });
  