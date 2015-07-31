$(function () {

  document.querySelector('.email').value = '';

  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(
        /^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +
        ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });


  $(document).on('click', '.cta', function (e) {
    e.preventDefault();
    checkEmail();
  });

});

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


function checkEmail() {
  var email = document.querySelector('.email').value;
  var name = document.querySelector('.name').value;

  if (!validateEmail(email)) {
    $('.email').addClass('error');
  } else {
    $('.email').removeClass('error');
  }

  if (name === '') {
    $('.name').addClass('error');
  } else {
    $('.name').removeClass('error');
  }


  if (validateEmail(email) && name !== '') {
    $('.processing').show();
    sendEmail(email, name);
  }
}

function sendEmail(email, name) {

  var post_data = {
    'user_email': email,
    'name': name
  };

  $.post('/process_email', post_data, function (response) {

    if (response.status !== 'failed') {

      $('.form-actual').find('form').remove();

      $('.form-actual').html(
        '<div class="message_result"><strong>' + response
        .status + '</strong></div>'
      );

    } else {
      alert('Couldn\'t process form. Please try again later.');
    }

  });
}