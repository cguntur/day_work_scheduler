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
    var today = dayjs().format('ddd, MMM DD YYYY');
    var currentHour = dayjs().hour();
    console.log(currentHour);

    var currentDayEl = document.getElementById("currentDay");

    var currentTimeBlock = document.getElementById("hour-"+currentHour);

    var timeBlock = document.getElementById("hour-"+currentHour);

    var timeBlockEl = document.getElementsByClassName("time-block");

    var saveButton = document.querySelectorAll(".saveBtn");

    var calendarEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];

    Object.entries(timeBlockEl).forEach(([key, value]) => {
        var timeBlockId = value.id;
        var timeBlockHour = timeBlockId.substring(7,5);

        Object.entries(calendarEvents).forEach(([key, value]) => {
            if(value.hour == timeBlockHour){
                
                var calendarHour = document.getElementById("hour-"+timeBlockHour);
                document.querySelector("#hour-"+timeBlockHour +" > .description").value = value.value;
            }
        });

        if(timeBlockHour > currentHour){
            value.classList.remove("past");
            value.classList.add("future");
            value.classList.remove("present");
        }else if(timeBlockHour < currentHour){
            value.classList.add("past");
            value.classList.remove("future");
            value.classList.remove("present");
        }else{
            value.classList.remove("past");
            value.classList.remove("future");
            value.classList.add("present");
        }
    });
    
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    saveButton.forEach(function(button){
        button.addEventListener("click", function(){
            var parentId = this.parentNode.id;
            var parentEl = document.querySelector("#"+parentId);
            var parentHour = parentId.substring(7,5);
            var textAreaEl = parentEl.querySelector('.description');
            var task = textAreaEl.value;
            var calendarEvent = [];

            var obj = calendarEvents.find(function(entry) { 
                return entry.hour === parentHour; 
            });
            if (obj) {
                obj.value = task;
            } else {
                calendarEvents.push({hour: parentHour, value: task});
            }
        
            localStorage.setItem("calendarEvents", JSON.stringify(calendarEvents));

        });
    });

    // TODO: Add code to display the current date in the header of the page.
    currentDayEl.textContent = today;
  });
  