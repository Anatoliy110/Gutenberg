jQuery(document).ready(function($) {
  $('.subscription-form-ajax').on('submit', function(e) {
    e.preventDefault();
    var $form = $(this);
    var $input = $form.find('input[type="email"]');
    var $error = $form.find('.error-message');
    var email = $input.val().trim();

    if (email === '') {
      $error.text('Please enter your email.');
      $input.addClass('error');
      $error.show();
      return;
    }

    if (!validateEmail(email)) {
      $error.text('Please enter a valid email address.');
      $input.addClass('error');
      $error.show();
      return;
    }

    $input.removeClass('error');
    $error.hide();
    $form.html('<p class="success-message" style="color: #00E6CA; font-size: 20px; margin-top: 20px;">Thank you for subscribing!</p>');
  });

  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});
