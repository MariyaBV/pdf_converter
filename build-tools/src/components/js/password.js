$(document).ready(function () {
  $('#password-form').on('submit', function (e) {
    const pass1 = $('#new_password').val().trim();
    const pass2 = $('#repeat_password').val().trim();
    const $errorText = $('.error_text');

    if (pass1.length < 8) {
      e.preventDefault();
      $errorText.text('Password must be at least 8 characters.');
      $errorText.show();
      return false;
    }

    if (pass1 !== pass2) {
      e.preventDefault();
      $errorText.text('Passwords do not match.');
      $errorText.show();
      return false;
    }

    $errorText.hide();
    // если всё ок → форма отправляется обычным POST на сервер
  });

  // обработка кнопки "Cancel"
  $('#password-cancel-btn').on('click', function () {
    $('#new_password, #repeat_password').val('');
    $('.error_text').hide();
  });
});
