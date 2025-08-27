$(document).ready(function () {
  $("#overlay").on("click", function () {
    $(".sidebar").removeClass("active");
    $("#overlay").removeClass("active");
    $("#button_back_sidebar").removeClass("active");
  });

  $("#button_back_sidebar").on("click", function () {
    $(".sidebar").toggleClass("active");
    $("#overlay").toggleClass("active");
    $("#button_back_sidebar").toggleClass("active");
  });
});