$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append(`<h5 data-id='${data[i]._id}' style="font-family: 'Jua', sans-serif;">${data[i].title}<br></h5><p data-id='${data[i]._id}' style="font-family: 'Raleway', sans-serif;">${data[i].link}</p>`);
    }
});

$("#scrape").on("click", function() {
    window.location.replace("/scrape");
    alert("Scrape Complete!");
    setTimeout(function() {
        window.location.replace("/");
    },1000);
});

$("#home").on("click", function() {
    window.location.replace("/");
});

$(document).on("click", "h5", function() {

    $("#notes").empty();
    var thisId = $(this).attr("data-id");
  
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data) {
        console.log(data);

        $("#notes").append(`<h5 style="font-family: 'Jua', sans-serif;">${data.title}</h5>`);
        $("#notes").append(`<input id='titleinput' name='title' placeholder='Your title here' class='form-control' style="font-family: 'Raleway', sans-serif;"><br>`);
        $("#notes").append(`<textarea id='bodyinput' name='body' placeholder='Your comment here' class='form-control' style="font-family: 'Raleway', sans-serif;"></textarea><br>`);
        $("#notes").append(`<button data-id='${data._id}' id='savenote' class='btn btn-dark' style="font-family: 'Jua', sans-serif;">Save Comment</button>`);
  
        if (data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        }
    });
});
  
$(document).on("click", "#savenote", function() {

    var thisId = $(this).attr("data-id");
  
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
    .then(function(data) {

        console.log(data);
        $("#notes").empty();
    });
  
    $("#titleinput").val("");
    $("#bodyinput").val("");
});