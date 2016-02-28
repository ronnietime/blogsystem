// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

(function() {
  var initAddThis = function() {
    // Remove all global properties set by addthis, otherwise it won't reinitialize
    for (var i in window) {
        if (/^addthis/.test(i) || /^_at/.test(i)) {
            delete window[i];
        }
    }
    window.addthis_share = {
      title: "It is awsome! →_→ " + $('title').text()
    };

    // Finally, load addthis
    $.getScript("//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-50b5b67007d0b4d4");
  };

  var initQrCode = function() {
    var qrCodeHolder = document.getElementById("qr-code");
    if (qrCodeHolder) {
      new QRCode(qrCodeHolder, location.href);
    }
  };

  var initGoogleAuthenticatorQrCode = function() {
    var qrCodeHolder = document.getElementById('google-authenticator-qr-code');
    if (qrCodeHolder) {
      $('#submit').on('click', function() {
        new QRCode(qrCodeHolder, 'otpauth://totp/zhuwu@zhuwu.me?secret=' + $('#secret').val().toUpperCase());
      });
    }
  }

  // Trigger the function on both jquery's ready event and turbolinks page:change event
  $(document).on('ready', function() {
    initAddThis();
    initQrCode();
    initGoogleAuthenticatorQrCode();
  });
}) ();
