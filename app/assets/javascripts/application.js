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
//= require_tree .

(function() {
  var toggleMenu = function() {
    $('.menu-toggle').on('click', function(e) {
      e.preventDefault();
      var target = $(this),
          menu = $('.slide-menu'),
          body = $('body');
      if (target.hasClass('toggle-on')) {
        target.removeClass('toggle-on');
        menu.removeClass('expanded');
        body.removeClass('sidebar-open');
      } else {
        target.addClass('toggle-on');
        menu.addClass('expanded');
        body.addClass('sidebar-open');
      }
    });
  }

  var infiniteScroll = function() {
    if ($('#infinite-scrolling').length > 0) {
      $(window).on('scroll', function() {
        var nextPageUrl = $('.pagination .next_page').prop('href');
        if (nextPageUrl && $(window).scrollTop() > $(document).height() - $(window).height() - 60) {
          $.getScript(nextPageUrl);
        }
      });
    }
  }

  $(document).ready(function() {
    toggleMenu();
    Prism.highlightAll();
    infiniteScroll();
  });
}) ();
