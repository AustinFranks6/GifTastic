// var APIkey = "vZCoxklZZnnGY5yeRQ7aBfSlsgJRuL2b";
// Array topic, list
// var cars = ["lexus", "honda", "toyota", "chevy", "kia", "bmw", "ford", "mazda", "tesla"]

$(document).ready(function() {

    var cars = ["lexus", "tesla", "toyota"];

function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }
}
//Click event to top buttons
$(document).on("click", ".carBtn", function() {
    $("#cars").empty();
    $(".carBtn").removeClass("active");
    $(this).addClass("active");

    var cars = $(this).attr("data-cars");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    cars + "&api_key=SsNNu9EeedxsOMd8SarkCOfvD2upXbNV&limit=5";

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            console.log(queryURL);
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var carDiv = $("<div class=\"car-item\">");

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_hieght_still.url;

                var carImage = $("<img>");

                carImage.attr("src", still);
                carImage.attr("data-still", still);
                carImage.attr("data-animate", animated);
                carImage.attr("data-state", "still");
                carImage.addClass("carImage");

                carDiv.append(p);
                carDiv.append(carImage);

                $("#gifs-appear-hear").append(carDiv);
            }

        });
    });

        $(document).on("click", ".carImage", function() {

            var state = $(this).attr("data-state");
        
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        
        $("#addCar").on("click", function(event) {
            event.preventDefault();
            let newCar = $("input").eq(0).val();
        
            if (newCar.length > 2) {
                cars.push(newCar);
            }
        
            populateButtons(cars, "carBtn", "#carBtn");
        
        });
        populateButtons(cars, "carBtn", "#carBtn");
});


