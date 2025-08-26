$(document).ready(function () {
  // открытие
  $(".hamburger").on("click", function () {
    $(".header .nav-has-dropdown .nav-dropdown").addClass("active");
  });

  // закрытие
  $(".close").on("click", function () {
    $(".header .nav-has-dropdown .nav-dropdown").removeClass("active");
  });
});

