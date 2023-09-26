// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
    $(document).ready(function () {
      // Function to update timeblocks' classes based on current time
      function updateHourlyBlocks() {
        var currentHour = dayjs().hour();
    
        $(".time-block").each(function () {
          var blockHour = parseInt($(this).attr("id").split("-")[1]);
    
          if (blockHour < currentHour) {
            $(this).removeClass("present future").addClass("past");
          } else if (blockHour === currentHour) {
            $(this).removeClass("past future").addClass("present");
          } else {
            $(this).removeClass("past present").addClass("future");
          }
        });
      }
    
      // Display current day and time
      function displayCurrentDay() {
        var currentDay = dayjs().format("dddd, MMMM D, YYYY");
        $("#currentDay").text(currentDay);
      }
    
      // Load saved tasks from local storage
      function loadTasks() {
        $(".time-block").each(function () {
          var blockHour = $(this).attr("id");
          var savedTask = localStorage.getItem(blockHour);
    
          if (savedTask) {
            $(this).find("textarea").val(savedTask);
          }
        });
      }
    
      // Save tasks to local storage
      $(".saveBtn").on("click", function () {
        var blockHour = $(this).parent().attr("id");
        var taskText = $(this).siblings(".description").val();
    
        localStorage.setItem(blockHour, taskText);
      });
    
      // Periodically update the timeblocks
      setInterval(updateHourlyBlocks, 60000); // Update every minute
    
      // Initialize the application
      displayCurrentDay();
      updateHourlyBlocks();
      loadTasks();
    });
    
  
  
    
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  });

